"""test_iniciar.py — pruebas focales de `iniciar.py` (servidor y navegador).

Ninguna prueba levanta el puerto 8000 real ni abre un navegador: el servidor y
el hilo del navegador se sustituyen por dobles que solo anotan lo que reciben.
"""

import io
import os
import sys
import unittest
from contextlib import redirect_stdout
from functools import partial
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import mock

RAIZ_WEB = Path(__file__).resolve().parents[1]
if str(RAIZ_WEB) not in sys.path:
    sys.path.insert(0, str(RAIZ_WEB))

import iniciar  # noqa: E402


class ServidorDoble:
    """Doble de ThreadingHTTPServer: no escucha ningún puerto real."""

    def __init__(self, error=None, interrumpir=False):
        self.error = error
        self.interrumpir = interrumpir
        self.direccion = None
        self.manejador = None
        self.servido = False
        self.cerrado = False

    def __call__(self, direccion, manejador):
        if self.error is not None:
            raise self.error
        self.direccion = direccion
        self.manejador = manejador
        return self

    def serve_forever(self):
        self.servido = True
        if self.interrumpir:
            raise KeyboardInterrupt

    def server_close(self):
        self.cerrado = True


class HiloDoble:
    """Doble de Thread: ejecuta el objetivo en el acto y anota si es daemon."""

    instancias: list = []

    def __init__(self, target=None, args=(), daemon=False):
        self.target = target
        self.args = args
        self.daemon = daemon
        self.ejecutado = False
        HiloDoble.instancias.append(self)

    def start(self):
        self.ejecutado = True
        self.target(*self.args)


class TestIniciar(unittest.TestCase):
    def setUp(self):
        HiloDoble.instancias = []

    def _correr(self, servidor, navegador, accion):
        """Ejecuta `accion` con servidor, hilo y navegador sustituidos por dobles."""
        with mock.patch.object(iniciar, "ThreadingHTTPServer", servidor), \
                mock.patch.object(iniciar, "Thread", HiloDoble), \
                mock.patch.object(iniciar.webbrowser, "open", navegador):
            with redirect_stdout(io.StringIO()) as salida:
                codigo = accion()
        return codigo, salida.getvalue()

    def test_raiz_no_depende_del_cwd(self):
        raiz = iniciar.raiz_repo()
        self.assertEqual(raiz, Path(iniciar.__file__).resolve().parents[3])
        self.assertTrue((raiz / "Especializacioes" / "AppSec" / "web" / "iniciar.py").is_file())

        anterior = os.getcwd()
        with TemporaryDirectory() as otro:
            try:
                os.chdir(otro)
                self.assertEqual(iniciar.raiz_repo(), raiz)
            finally:
                os.chdir(anterior)

    def test_sirve_en_127_0_0_1_8000_con_la_raiz_del_repo(self):
        servidor = ServidorDoble()
        codigo, texto = self._correr(servidor, mock.Mock(return_value=True), iniciar.main)

        self.assertEqual(codigo, 0)
        self.assertEqual(servidor.direccion, ("127.0.0.1", 8000))
        self.assertIsInstance(servidor.manejador, partial)
        self.assertIs(servidor.manejador.func, iniciar.SimpleHTTPRequestHandler)
        self.assertEqual(servidor.manejador.keywords["directory"], iniciar.raiz_repo())
        self.assertIn(iniciar.URL_WEB, texto)

    def test_abre_el_navegador_despues_del_bind_en_hilo_daemon(self):
        servidor = ServidorDoble()
        navegador = mock.Mock(return_value=True)

        def al_abrir(url):
            self.assertIsNotNone(servidor.direccion)  # el bind ya ocurrió
            navegador(url)

        self._correr(servidor, al_abrir, iniciar.main)

        self.assertEqual(
            navegador.call_args.args,
            ("http://127.0.0.1:8000/Especializacioes/AppSec/web/",),
        )
        self.assertEqual(len(HiloDoble.instancias), 1)
        self.assertTrue(HiloDoble.instancias[0].daemon)
        self.assertTrue(HiloDoble.instancias[0].ejecutado)

    def test_ctrl_c_cierra_el_servidor(self):
        servidor = ServidorDoble(interrumpir=True)
        codigo, texto = self._correr(servidor, mock.Mock(return_value=True), iniciar.main)

        self.assertEqual(codigo, 0)
        self.assertTrue(servidor.servido)
        self.assertTrue(servidor.cerrado)
        self.assertIn("Servidor detenido", texto)

    def test_puerto_ocupado_avisa_y_no_abre_navegador(self):
        servidor = ServidorDoble(error=OSError(98, "Address already in use"))
        navegador = mock.Mock(return_value=True)
        codigo, texto = self._correr(servidor, navegador, iniciar.main)

        self.assertNotEqual(codigo, 0)
        self.assertIn(
            "Detén el servidor anterior con Ctrl+C y vuelve a ejecutar python3 iniciar.py",
            texto,
        )
        navegador.assert_not_called()
        self.assertFalse(servidor.servido)

    def test_navegador_que_no_abre_no_derriba_el_servidor(self):
        servidor = ServidorDoble(interrumpir=True)
        codigo, texto = self._correr(servidor, mock.Mock(return_value=False), iniciar.main)

        self.assertEqual(codigo, 0)
        self.assertIn(f"Abre manualmente: {iniciar.URL_WEB}", texto)
        self.assertTrue(servidor.cerrado)

    def test_excepcion_del_navegador_no_derriba_el_servidor(self):
        servidor = ServidorDoble(interrumpir=True)
        navegador = mock.Mock(side_effect=RuntimeError("sin navegador"))
        codigo, texto = self._correr(servidor, navegador, iniciar.main)

        self.assertEqual(codigo, 0)
        self.assertIn("No se pudo abrir el navegador", texto)
        self.assertIn(f"Abre manualmente: {iniciar.URL_WEB}", texto)
        self.assertTrue(servidor.cerrado)


if __name__ == "__main__":
    unittest.main()

"""iniciar.py — servidor local de la web AppSec y apertura del navegador.

Uso (desde `Especializacioes/AppSec/web`):

    python3 iniciar.py

Sirve la raíz del repositorio en `127.0.0.1:8000` para que la web pueda leer
los `.md` del repo y abre el navegador en la página de la ruta. No instala
nada, no llama a servicios externos y no mata ningún proceso: si el puerto
está ocupado, avisa y espera a que detengas el servidor anterior.
"""

import webbrowser
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

HOST = "127.0.0.1"
PUERTO = 8000
URL_WEB = f"http://{HOST}:{PUERTO}/Especializacioes/AppSec/web/"


def raiz_repo() -> Path:
    """Raíz del repositorio, calculada desde este archivo y no desde el cwd."""
    return Path(__file__).resolve().parents[3]


def manejador(raiz: Path):
    """SimpleHTTPRequestHandler que sirve la raíz del repositorio."""
    return partial(SimpleHTTPRequestHandler, directory=raiz)


def abrir_navegador(url: str = URL_WEB) -> None:
    """Abre el navegador en un hilo daemon: si falla, la URL manual sigue valiendo."""

    def abrir() -> None:
        try:
            abierto = webbrowser.open(url)
        except Exception as exc:  # el navegador es opcional: no debe tumbar el servidor
            print(f"No se pudo abrir el navegador: {exc}")
            abierto = False
        if not abierto:
            print(f"Abre manualmente: {url}")

    Thread(target=abrir, daemon=True).start()


def main() -> int:
    raiz = raiz_repo()
    try:
        servidor = ThreadingHTTPServer((HOST, PUERTO), manejador(raiz))
    except OSError as exc:
        print(f"No se pudo usar el puerto {PUERTO}: {exc}")
        print("Detén el servidor anterior con Ctrl+C y vuelve a ejecutar python3 iniciar.py")
        return 1

    print(f"Web AppSec: {URL_WEB}")
    print("Ctrl+C para detener el servidor.")
    abrir_navegador(URL_WEB)
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido. Ya puedes cerrar esta terminal.")
    finally:
        servidor.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

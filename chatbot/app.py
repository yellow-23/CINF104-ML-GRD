import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from knowledge.system_prompt import SYSTEM_PROMPT

load_dotenv()

OLLAMA_URL  = os.getenv("OLLAMA_URL",        "http://localhost:11434/api/chat")
MODEL       = os.getenv("OLLAMA_MODEL",      "llama3.2:3b")
TEMPERATURE = float(os.getenv("MODEL_TEMPERATURE", "0.3"))
MAX_TOKENS  = int(os.getenv("MODEL_MAX_TOKENS",    "1024"))
PORT        = int(os.getenv("FLASK_PORT",          "8000"))
DEBUG       = os.getenv("FLASK_DEBUG", "true").lower() == "true"

app = Flask(__name__)
CORS(app)


def call_ollama(messages: list[dict]) -> str:
    """Envía el historial al modelo local vía Ollama y retorna la respuesta."""
    payload = {
        "model": MODEL,
        "messages": [{"role": "system", "content": SYSTEM_PROMPT}] + messages,
        "stream": False,
        "options": {"temperature": TEMPERATURE, "num_predict": MAX_TOKENS},
    }
    try:
        r = requests.post(OLLAMA_URL, json=payload, timeout=120)
        r.raise_for_status()
        return r.json()["message"]["content"]
    except requests.exceptions.ConnectionError:
        return "Error: Ollama no está corriendo. Abre la app Ollama."
    except requests.exceptions.Timeout:
        return "El modelo tardó demasiado. Intenta con una pregunta más corta."
    except Exception as e:
        return f"Error inesperado: {e}"


@app.route("/api/chat", methods=["POST"])
def chat():
    """Recibe el historial de mensajes y retorna la respuesta del modelo."""
    data = request.get_json()
    if not data or not data.get("messages"):
        return jsonify({"error": "Se esperaba {'messages': [...]}"}), 400
    return jsonify({"response": call_ollama(data["messages"])})


@app.route("/api/health")
@app.route("/health")
def health():
    """Verifica si Ollama está corriendo y el modelo disponible."""
    try:
        base = OLLAMA_URL.replace("/api/chat", "")
        models = [m["name"] for m in requests.get(f"{base}/api/tags", timeout=5).json().get("models", [])]
        return jsonify({
            "status": "ok",
            "model": MODEL,
            "model_available": any(MODEL.split(":")[0] in m for m in models),
        })
    except Exception:
        return jsonify({"status": "error", "ollama": "desconectado"}), 503


if __name__ == "__main__":
    print(f"\n  AgroBot · {MODEL} · http://localhost:{PORT}\n")
    app.run(debug=DEBUG, port=PORT, host="0.0.0.0")

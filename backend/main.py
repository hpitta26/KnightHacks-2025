# main.py
import os
from typing import List, Literal, Optional, Any

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

API_KEY = os.environ.get("GOOGLE_API_KEY", "")
if API_KEY:
    genai.configure(api_key=API_KEY)

MODEL_NAME = os.environ.get("GEMINI_MODEL", "gemini-1.5-flash")
_model = None


class ChatMessage(BaseModel):
    role: Literal["user", "model", "system"] = "user"
    content: str


class SendChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = None


class SendChatResponse(BaseModel):
    reply: str
    model: str
    usage_tokens: Optional[int] = None

@app.post("/send_chat", response_model=SendChatResponse)
def send_chat(payload: SendChatRequest):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="GOOGLE_API_KEY is not set")

    global _model
    if _model is None:
        _model = genai.GenerativeModel(MODEL_NAME)

    try:
        if payload.history:
            chat = _model.start_chat(
                history=[{"role": m.role, "parts": [m.content]} for m in payload.history]
            )
            resp = chat.send_message(payload.message)
        else:
            resp = _model.generate_content(payload.message)

        text = getattr(resp, "text", None)
        if text is None:
            text = "\n".join(
                part.text
                for cand in resp.candidates
                for part in getattr(cand.content, "parts", [])
                if hasattr(part, "text")
            ) or ""

        usage = None

        try:
            usage = getattr(resp, "usage_metadata", {}).total_token_count
        except Exception:
            pass

        return SendChatResponse(reply=text, model=MODEL_NAME, usage_tokens=usage)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini error: {e}")

# main.py
import os
import json
from typing import List, Literal, Optional, Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:5173",  # React dev servers
        "https://finterras.com",
        "https://www.finterras.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


@app.get("/get_budget")
def get_budget():
    """Get budget data from budget.json file"""
    try:
        with open("data/budget.json", "r") as file:
            budget_data = json.load(file)
        return budget_data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Budget data not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON in budget data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading budget data: {e}")


@app.get("/get_savings")
def get_savings():
    """Get savings data from savings.json file"""
    try:
        with open("data/savings.json", "r") as file:
            savings_data = json.load(file)
        return savings_data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Savings data not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON in savings data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading savings data: {e}")


@app.get("/get_networth")
def get_networth():
    """Get networth data from networth.json file"""
    try:
        with open("data/networth.json", "r") as file:
            networth_data = json.load(file)
        return networth_data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Networth data not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON in networth data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading networth data: {e}")


@app.get("/get_activities")
def get_activities():
    """Get activities data from activity.json file"""
    try:
        with open("data/activity.json", "r") as file:
            activities_data = json.load(file)
        return activities_data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Activities data not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON in activities data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading activities data: {e}")

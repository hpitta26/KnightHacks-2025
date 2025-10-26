# main.py
import os
import json
import uuid
from typing import List, Literal, Optional, Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai.types import Content, Part
from agents.agents import investment_analyzer

load_dotenv()

APP_NAME = "agents"

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

# Initialize ADK session service
session_service = InMemorySessionService()


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


class AnalyzeInvestmentsResponse(BaseModel):
    reply: str
    model: str

class AnalyzeBudgetResponse(BaseModel):
    reply: str
    model: str


# Hardcoded investment data
INVESTMENT_DATA = {
    "holdings": [
        {
            "account": "401k.com",
            "type": "Vengeance Enterprises",
            "balance": 5036.12,
            "holdings": [
                {"symbol": "VTI", "name": "Vanguard Total Stock Market", "shares": 25.5, "price": 185.32, "value": 4725.66},
                {"symbol": "VXUS", "name": "Vanguard Total International", "shares": 15.2, "price": 65.45, "value": 994.84},
                {"symbol": "BND", "name": "Vanguard Total Bond Market", "shares": 8.3, "price": 75.21, "value": 624.24}
            ]
        },
        {
            "account": "Ameritrade",
            "type": "Securities",
            "balance": 11047.92,
            "holdings": [
                {"symbol": "AAPL", "name": "Apple Inc.", "shares": 50, "price": 185.64, "value": 9282.00},
                {"symbol": "MSFT", "name": "Microsoft Corporation", "shares": 10, "price": 176.59, "value": 1765.90}
            ]
        },
        {
            "account": "Fidelity",
            "type": "Inigo Montoya IRA",
            "balance": 144694.30,
            "holdings": [
                {"symbol": "SPY", "name": "SPDR S&P 500 ETF", "shares": 150, "price": 485.32, "value": 72798.00},
                {"symbol": "QQQ", "name": "Invesco QQQ Trust", "shares": 100, "price": 415.68, "value": 41568.00},
                {"symbol": "TLT", "name": "iShares 20+ Year Treasury Bond", "shares": 75, "price": 90.45, "value": 6783.75},
                {"symbol": "GLD", "name": "SPDR Gold Trust", "shares": 25, "price": 198.50, "value": 4962.50},
                {"symbol": "VNQ", "name": "Vanguard Real Estate ETF", "shares": 80, "price": 89.12, "value": 7129.60}
            ]
        },
        {
            "account": "Scholarshare",
            "type": "Inigo Montoya Jr",
            "balance": 19140.34,
            "holdings": [
                {"symbol": "VT", "name": "Vanguard Total World Stock", "shares": 180, "price": 105.78, "value": 19040.40},
                {"symbol": "Cash", "name": "Money Market", "shares": 99.94, "price": 1.00, "value": 99.94}
            ]
        }
    ]
}


@app.get("/test")
def test():
    print("TEST ENDPOINT HIT!")
    return {"status": "ok", "message": "Test endpoint works"}

@app.get("/analyze_investments", response_model=AnalyzeInvestmentsResponse)
async def analyze_investments():
    """Analyze user's investment portfolio and provide insights using the investment analyzer agent"""
    # print("=" * 50)
    # print("DEBUG: Endpoint hit!")
    # print("=" * 50)
    
    if not API_KEY:
        # print("ERROR: GOOGLE_API_KEY is not set")
        raise HTTPException(status_code=500, detail="GOOGLE_API_KEY is not set")

    try:
        # print("DEBUG: Preparing investment data...")
        # Prepare the investment data context
        investment_context = json.dumps(INVESTMENT_DATA, indent=2)
        
        # Create the prompt with the data
        prompt = f"""Investment Portfolio Data:
{investment_context}

Please analyze this investment portfolio and provide a comprehensive analysis including:
1. Total portfolio value
2. Account breakdown
3. Asset allocation
4. Diversification assessment
5. Risk analysis
6. Specific recommendations for optimization

Provide specific insights and actionable recommendations based on the holdings shown."""

        # Generate unique session ID for this analysis
        session_id = f"investment_{uuid.uuid4().hex[:8]}"
        user_id = "api_user"
        
        # print(f"DEBUG: Session ID: {session_id}")
        # print(f"DEBUG: App Name: {APP_NAME}")
        
        # Create session with initial state
        # print("DEBUG: Creating session...")
        await session_service.create_session(
            app_name=APP_NAME,
            user_id=user_id,
            session_id=session_id,
            state={"prompt": prompt}
        )
        # print("DEBUG: Session created successfully")
        
        # Create runner with the investment analyzer agent
        # print("DEBUG: Creating runner...")
        runner = Runner(
            agent=investment_analyzer,
            app_name=APP_NAME,
            session_service=session_service
        )
        # print("DEBUG: Runner created successfully")
        
        # Create a user message to trigger the agent
        # print("DEBUG: Creating user message...")
        user_message = Content(parts=[Part(text=prompt)])
        
        # Run the agent
        # print("DEBUG: Starting agent execution...")
        final_response = ""
        event_count = 0
        async for event in runner.run_async(
            user_id=user_id,
            session_id=session_id,
            new_message=user_message
        ):
            event_count += 1
            # print(f"DEBUG: Received event {event_count}")
            if event.is_final_response() and event.content and event.content.parts:
                final_response = event.content.parts[0].text
                # print(f"DEBUG: Got final response, length: {len(final_response)}")
                break
        
        # print("DEBUG: Returning response...")
        # print(f"DEBUG: Final response length: {len(final_response)}")
        # print(f"DEBUG: Final response preview: {final_response[:200] if final_response else 'EMPTY'}...")
        
        response_obj = AnalyzeInvestmentsResponse(reply=final_response, model="investment_analyzer")
        # print(f"DEBUG: Response object created: {response_obj}")
        
        return response_obj

    except Exception as e:
        print(f"ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Investment analysis error: {e}")


@app.get("/analyze_budget", response_model=AnalyzeBudgetResponse)
def analyze_budget():
    """Analyze user's budget and provide insights"""
    return AnalyzeBudgetResponse(
        reply="Budgeting has not been implemented yet...",
        model="budget_analyzer"
    )

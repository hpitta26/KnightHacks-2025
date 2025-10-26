# main.py
import os
import json
import uuid
import re
from datetime import datetime
from typing import List, Literal, Optional, Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai.types import Content, Part
from agents.agents import investment_analyzer, budget_analyzer, consultant

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


@app.get("/api/get_budget")
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


@app.get("/api/get_savings")
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


@app.get("/api/get_networth")
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


@app.get("/api/get_activities")
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

class ConsultationRequest(BaseModel):
    tip_description: str

class ConsultationResponse(BaseModel):
    reply: str
    model: str


# Hardcoded consultation data (financial data relevant to each tip)
CONSULTATION_DATA = {
    "budget_spending": {
        "category": "budget",
        "last_month_budget": 5000,
        "last_month_spending": 5450,
        "overspent_by": 450,
        "top_categories": [
            {"name": "Dining Out", "spent": 1200, "budgeted": 800},
            {"name": "Entertainment", "spent": 650, "budgeted": 500},
            {"name": "Shopping", "spent": 1800, "budgeted": 1500}
        ]
    },
    "portfolio_international": {
        "category": "investments",
        "total_portfolio_value": 180000,
        "us_stocks_value": 150000,
        "international_stocks_value": 8500,
        "international_percentage": 4.7,
        "recommended_international_percentage": 30
    },
    "emergency_fund": {
        "category": "savings",
        "current_amount": 12000,
        "target_amount": 15000,
        "months_remaining": 2,
        "monthly_contribution": 1500,
        "is_on_track": True
    },
    "401k_contribution": {
        "category": "tax",
        "current_contribution": 15000,
        "max_contribution_limit": 23000,
        "remaining_until_max": 8000,
        "months_until_year_end": 3,
        "current_salary": 120000
    },
    "credit_utilization": {
        "category": "credit",
        "total_credit_limit": 15000,
        "current_balance": 5250,
        "utilization_percentage": 35,
        "recommended_percentage": 30,
        "excess_utilization": 750
    },
    "dividend_opportunity": {
        "category": "investments",
        "current_dividend_income": 0,
        "total_portfolio_value": 180000,
        "suggested_dividend_stocks": ["VYM", "SCHD", "DVY"],
        "estimated_dividend_yield": "3-4%"
    },
    "tech_sector_growth": {
        "category": "market",
        "current_tech_allocation": 85000,
        "tech_allocation_percentage": 47,
        "sector_performance": "Strong growth potential",
        "tech_holdings": ["QQQ", "AAPL", "MSFT"]
    },
    "debt_reduction": {
        "category": "debt",
        "total_debt_start_year": 35000,
        "current_total_debt": 29750,
        "debt_paid_off": 5250,
        "percentage_reduced": 15,
        "debt_breakdown": [
            {"type": "Credit Card", "balance": 5250},
            {"type": "Auto Loan", "balance": 12500},
            {"type": "Student Loan", "balance": 12000}
        ]
    }
}

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

@app.post("/api/analyze_budget")
async def analyze_budget():
    """Analyze budget data and provide AI-powered insights using the budget analyzer agent"""
    # print("=" * 50)
    # print("DEBUG: analyze_budget endpoint called")
    # print("=" * 50)
    
    if not API_KEY:
        # print("ERROR: GOOGLE_API_KEY is not set")
        raise HTTPException(status_code=500, detail="GOOGLE_API_KEY is not set")

    try:
        # print("DEBUG: Loading data files...")
        with open("data/budget.json", "r") as file:
            budget_data = json.load(file)
        # print(f"DEBUG: Loaded budget data: {len(budget_data)} categories")
            
        with open("data/savings.json", "r") as file:
            savings_data = json.load(file)
        # print(f"DEBUG: Loaded savings data: {savings_data}")
            
        with open("data/income.json", "r") as file:
            past_year_income = json.load(file)
        # print(f"DEBUG: Loaded income data: {len(past_year_income)} transactions")
        
        if not past_year_income:
            # print("ERROR: No income data found")
            raise HTTPException(status_code=400, detail="No income data found")
        
        # print("DEBUG: Calculating income metrics...")
        total_income = sum(transaction["amount"] for transaction in past_year_income)
        months_in_data = len(set(
            datetime.fromisoformat(transaction["timestamp"].replace('Z', '+00:00')).strftime('%Y-%m')
            for transaction in past_year_income
        ))
        average_monthly_income = total_income / max(months_in_data, 1)
        # print(f"DEBUG: Total income: ${total_income}, Months: {months_in_data}, Avg monthly: ${average_monthly_income}")
        
        # print("DEBUG: Preparing budget context...")
        budget_context = {
            "monthly_income": round(average_monthly_income, 2),
            "months_analyzed": months_in_data,
            "current_budget": budget_data,
            "savings_goal": savings_data,
            "income_data_points": len(past_year_income)
        }
        # print(f"DEBUG: Budget context prepared: {budget_context}")
        
        prompt = f"""Budget Analysis Data:
{json.dumps(budget_context, indent=2)}

Please analyze this budget data and provide insights based on the 50/30/20 rule:
- 50% of income should go to needs (housing, utilities, groceries, transportation, insurance)
- 30% of income should go to wants (entertainment, dining out, hobbies, shopping)  
- 20% of income should go to savings and debt repayment

Analyze their current budget allocation and spending patterns, and provide specific recommendations for optimization."""

        # print("DEBUG: Creating session...")
        session_id = f"budget_{uuid.uuid4().hex[:8]}"
        user_id = "api_user"
        # print(f"DEBUG: Session ID: {session_id}")
        
        await session_service.create_session(
            app_name=APP_NAME,
            user_id=user_id,
            session_id=session_id,
            state={"prompt": prompt}
        )
        # print("DEBUG: Session created successfully")
        
        # print("DEBUG: Creating runner...")
        runner = Runner(
            agent=budget_analyzer,
            app_name=APP_NAME,
            session_service=session_service
        )
        # print("DEBUG: Runner created successfully")
        
        # print("DEBUG: Running analysis...")
        # Create a user message to trigger the agent
        user_message = Content(parts=[Part(text=prompt)])
        
        final_response = ""
        event_count = 0
        async for event in runner.run_async(
            user_id=user_id,
            session_id=session_id,
            new_message=user_message
        ):
            event_count += 1
            # print(f"DEBUG: Event {event_count}: {type(event).__name__}")
            if event.is_final_response() and event.content and event.content.parts:
                final_response = event.content.parts[0].text
                # print(f"DEBUG: Got final response, length: {len(final_response)}")
                break
        
        # print(f"DEBUG: Analysis completed after {event_count} events")
        
        # print("DEBUG: Extracting analysis result...")
        analysis_text = final_response if final_response else "Analysis completed"
        # print(f"DEBUG: Analysis text length: {len(analysis_text)}")
        # print(f"DEBUG: Analysis text preview: {analysis_text[:200]}...")
        
        # Try to extract JSON from AI response
        try:
            # Look for JSON array in the response
            json_match = re.search(r'\[.*?\]', analysis_text, re.DOTALL)
            if json_match:
                ai_budget_adjustments = json.loads(json_match.group())
                # Create a map of AI recommendations
                ai_recommendations = {item['category']: item['amount'] for item in ai_budget_adjustments}
                
                # Build budget adjustments with AI recommendations where available
                budget_adjustments = []
                for category in budget_data:
                    budget_adjustments.append({
                        "category": category["category"],
                        "amount": category["amount"],  # Original amount (previous value)
                        "newAmount": ai_recommendations.get(category["category"], category["amount"]),  # AI's recommended amount or original
                        "spent": category["spent"],
                        "lastMonthSpent": category["lastMonthSpent"]
                    })
            else:
                # No JSON found, use original data
                budget_adjustments = []
                for category in budget_data:
                    budget_adjustments.append({
                        "category": category["category"],
                        "amount": category["amount"],
                        "spent": category["spent"],
                        "lastMonthSpent": category["lastMonthSpent"],
                        "newAmount": category["amount"]  # Default to same amount
                    })
        except (json.JSONDecodeError, ValueError) as e:
            # Fallback if JSON parsing fails
            budget_adjustments = []
            for category in budget_data:
                budget_adjustments.append({
                    "category": category["category"],
                    "amount": category["amount"],
                    "spent": category["spent"],
                    "lastMonthSpent": category["lastMonthSpent"],
                    "newAmount": category["amount"]  # Default to same amount
                })
        
        # print("DEBUG: Building final analysis response...")
        # print(f"DEBUG: Summary: {summary}")
        # print(f"DEBUG: Insights count: {len(insights)}")
        # print(f"DEBUG: Recommendations count: {len(recommendations)}")
        
        analysis = {
            "summary": f"AI-powered budget analysis based on your ${average_monthly_income:.2f} monthly income:",
            "insights": [
                f"Analyzed {months_in_data} months of income data",
                f"Total income past year: ${total_income:.2f}",
                "Recommendations based on 50/30/20 rule"
            ],
            "recommendations": [
                "Review category allocations monthly",
                "Track spending against budgeted amounts",
                "Adjust allocations based on income changes"
            ],
            "budget_adjustments": budget_adjustments,
            "ai_analysis": analysis_text
        }
        
        # print("DEBUG: Analysis response built successfully")
        # print("=" * 50)
        # print("DEBUG: analyze_budget endpoint completed successfully")
        # print("=" * 50)
        
        return analysis
    except FileNotFoundError as e:
        # print(f"ERROR: Data file not found: {e}")
        raise HTTPException(status_code=404, detail=f"Data file not found: {e}")
    except json.JSONDecodeError as e:
        # print(f"ERROR: Invalid JSON in data file: {e}")
        raise HTTPException(status_code=500, detail=f"Invalid JSON in data file: {e}")
    except Exception as e:
        # print(f"ERROR: Unexpected error in analyze_budget: {e}")
        # import traceback
        # traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error analyzing budget: {e}")


@app.post("/consultation", response_model=ConsultationResponse)
async def consultation(request: ConsultationRequest):
    """Handle consultation requests from financial tips"""
    if not API_KEY:
        raise HTTPException(status_code=500, detail="GOOGLE_API_KEY is not set")

    try:
        # Map tip descriptions to consultation data keys
        tip_description = request.tip_description.lower()
        
        # Determine which consultation data to use based on the tip
        consultation_key = None
        if "spending" in tip_description or "budget" in tip_description:
            consultation_key = "budget_spending"
        elif "international" in tip_description or "portfolio" in tip_description:
            consultation_key = "portfolio_international"
        elif "emergency" in tip_description or "savings" in tip_description or "fund" in tip_description:
            consultation_key = "emergency_fund"
        elif "401k" in tip_description or "contribution" in tip_description or "tax" in tip_description:
            consultation_key = "401k_contribution"
        elif "credit" in tip_description or "utilization" in tip_description:
            consultation_key = "credit_utilization"
        elif "dividend" in tip_description:
            consultation_key = "dividend_opportunity"
        elif "tech" in tip_description or "sector" in tip_description or "market" in tip_description:
            consultation_key = "tech_sector_growth"
        elif "debt" in tip_description:
            consultation_key = "debt_reduction"
        else:
            consultation_key = "budget_spending"  # default
        
        # Get the relevant consultation data
        consultation_data = CONSULTATION_DATA.get(consultation_key, {})
        
        # Prepare the prompt
        consultation_context = json.dumps(consultation_data, indent=2)
        
        # Clean up the tip description (remove "Consult me on:" if present)
        clean_tip = request.tip_description.replace("Consult me on:", "").replace("Consult me on", "").strip()
        
        prompt = f"""You flagged this financial tip for the user: "{clean_tip}"

Relevant Financial Data:
{consultation_context}

The user is now asking you for advice on how to address this issue. Provide a concise, actionable response that acknowledges you created this tip and gives them specific steps to resolve it."""

        # Generate unique session ID for this consultation
        session_id = f"consultation_{uuid.uuid4().hex[:8]}"
        user_id = "api_user"
        
        # Create session
        await session_service.create_session(
            app_name=APP_NAME,
            user_id=user_id,
            session_id=session_id,
            state={"prompt": prompt}
        )
        
        # Create runner with the consultant agent
        runner = Runner(
            agent=consultant,
            app_name=APP_NAME,
            session_service=session_service
        )
        
        # Create a user message to trigger the agent
        user_message = Content(parts=[Part(text=prompt)])
        
        # Run the agent
        final_response = ""
        async for event in runner.run_async(
            user_id=user_id,
            session_id=session_id,
            new_message=user_message
        ):
            if event.is_final_response() and event.content and event.content.parts:
                final_response = event.content.parts[0].text
                break
        
        return ConsultationResponse(reply=final_response, model="consultant")

    except Exception as e:
        print(f"ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Consultation error: {e}")

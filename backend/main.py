from dotenv import load_dotenv
import os

load_dotenv()

from fastapi import FastAPI
from database.database import engine
from database.database import Base
from models.user import User
from models.result_model import Result
from routes.result import router as result_router
from routes.resume import router as resume_router
from routes.auth import router as auth_router
from routes.pdf import router as pdf_router
from routes.quiz import router as quiz_router
from routes.admin import router as admin_router
from routes.roadmap import router as roadmap_router
from routes.profile import router as profile_router
from routes.activity import router as activity_router
from routes.chart import router as chart_router
from routes.chat import router as chat_router


from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from routes import result

app = FastAPI()
Base.metadata.create_all(bind=engine)
app.include_router(auth_router)
app.include_router(pdf_router)
app.include_router(quiz_router)
app.include_router(result_router)
app.include_router(resume_router)
app.include_router(admin_router)
app.include_router(activity_router)
app.include_router(chart_router)
app.include_router(profile_router)
app.include_router(result.router)
app.include_router(chat_router)
app.include_router(
    roadmap_router
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenRouter client
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"))

# Request model
class ChatRequest(BaseModel):
    message: str


@app.get("/")
def home():
    return {
        "message": "AI Backend Running 🚀"
    }


@app.post("/chat")
async def chat(data: dict):

    user_message = data["message"]

    completion = client.chat.completions.create(
        model="openai/gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": user_message
            }
        ]
    )

    ai_reply = completion.choices[0].message.content

    return {
        "response": ai_reply
    }
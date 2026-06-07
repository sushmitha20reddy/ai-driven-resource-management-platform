from dotenv import load_dotenv
import os

load_dotenv()

import json
from fastapi import APIRouter
from schemas.quiz_schema import QuizRequest
from openai import OpenAI

router = APIRouter()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

@router.post("/generate-quiz")
async def generate_quiz(data: QuizRequest):

    prompt = f"""
    Generate 5 MCQ questions on {data.subject}.

    Return JSON format:

    [
      {{
        "question":"...",
        "options":["A","B","C","D"],
        "answer":"..."
      }}
    ]
    """

    response = client.chat.completions.create(
        model="openai/gpt-3.5-turbo",
        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ]
    )

    quiz_data = json.loads(
    response.choices[0].message.content
)

    return {
    "quiz": quiz_data
}
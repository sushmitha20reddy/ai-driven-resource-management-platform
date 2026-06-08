from fastapi import APIRouter
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

import os
import json

load_dotenv()

router = APIRouter()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

class RoadmapRequest(BaseModel):
    goal: str


@router.post("/generate-roadmap")
async def generate_roadmap(data: RoadmapRequest):

    prompt = f"""
Create a learning roadmap for:

{data.goal}

Return ONLY valid JSON.

Format:

[
  {{
    "title": "Topic Name",
    "duration": "2 Weeks",
    "description": "Short explanation of what to learn"
  }}
]

Rules:
- Generate 8 to 12 learning phases.
- Start from beginner level.
- End at job-ready level.
- Make roadmap specific to the user's goal.
- Return ONLY JSON.
"""

    try:

        response = client.chat.completions.create(
            model="openai/gpt-3.5-turbo",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        result = response.choices[0].message.content

        roadmap = json.loads(result)

        return {
            "roadmap": roadmap
        }

    except Exception as e:

        print("Roadmap Error:", str(e))

        return {
            "roadmap": [],
            "error": str(e)
        }
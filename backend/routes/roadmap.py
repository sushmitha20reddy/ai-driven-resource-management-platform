from fastapi import APIRouter
from pydantic import BaseModel

from openai import OpenAI
from dotenv import load_dotenv

import os

load_dotenv()

router = APIRouter()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

class RoadmapRequest(BaseModel):
    goal: str

@router.post("/generate-roadmap")
async def generate_roadmap(
    data: RoadmapRequest
):

    prompt = f"""
Create a detailed learning roadmap for:

{data.goal}

Include:

1. Beginner Phase
2. Intermediate Phase
3. Advanced Phase
4. Projects
5. Certifications

Format nicely.
"""

    response = client.chat.completions.create(
        model="openai/gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return {
        "roadmap":
        response.choices[0].message.content
    }
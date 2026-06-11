from fastapi import APIRouter, UploadFile, File, Form
from openai import OpenAI
import os

router = APIRouter()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)
@router.post("/chat")
async def chat(
    message: str = Form(...),
    file: UploadFile = File(None)
):

    print("Message:", message)

    if file:
        print("File Name:", file.filename)

    response = client.chat.completions.create(
        model="openai/gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": message
            }
        ]
    )

    return {
        "response":
        response.choices[0].message.content
    }
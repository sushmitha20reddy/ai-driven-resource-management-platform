from fastapi import APIRouter, UploadFile, File
from pypdf import PdfReader
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

@router.post("/analyze-resume")
async def analyze_resume(
    file: UploadFile = File(...)
):

    extracted_text = ""

    try:

        pdf_reader = PdfReader(file.file)

        for page in pdf_reader.pages:

            text = page.extract_text()

            if text:
                extracted_text += text

        prompt = f"""
Analyze this resume and return:

1. ATS Score out of 100
2. Skills Found
3. Strengths
4. Weaknesses
5. Suggestions for Improvement

Resume:

{extracted_text[:5000]}
"""

        response = client.chat.completions.create(
            model="openai/gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert ATS Resume Analyzer."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        result = response.choices[0].message.content

        return {
            "analysis": result
        }

    except Exception as e:

        return {
            "error": str(e)
        }
from fastapi import APIRouter, UploadFile, File
from pypdf import PdfReader
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
Analyze the following resume.

Return ONLY raw JSON.

Do NOT use markdown.
Do NOT use triple backticks.
Do NOT write json before the response.

Return ONLY a valid JSON object.

{{
  "score": 85,
  "skills_found": ["Python", "React", "SQL"],
  "missing_skills": ["Docker", "AWS"],
  "strengths": [
    "Strong technical skills"
  ],
  "weaknesses": [
    "Missing cloud experience"
  ],
  "suggestions": [
    "Add more projects"
  ]
}}

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

        try:

            cleaned = result.replace("```json", "")
            cleaned = cleaned.replace("```", "")
            cleaned = cleaned.strip()

            parsed = json.loads(cleaned)

            return parsed

        except Exception:

            return {
                "score": 0,
                "skills_found": [],
                "missing_skills": [],
                "strengths": [],
                "weaknesses": [],
                "suggestions": [],
                "analysis": result
            }

    except Exception as e:

        return {
            "error": str(e)
        }
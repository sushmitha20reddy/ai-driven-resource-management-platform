from dotenv import load_dotenv
import os

load_dotenv()

from fastapi import APIRouter, UploadFile, File

from pypdf import PdfReader

from docx import Document

from openai import OpenAI

router = APIRouter()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"))


@router.post("/summarize-pdf")
async def summarize_pdf(
    file: UploadFile = File(...)
):

    extracted_text = ""

    # PDF SUPPORT

    if file.filename.endswith(".pdf"):

        pdf_reader = PdfReader(file.file)

        for page in pdf_reader.pages:

          text = page.extract_text()

          if text:
             extracted_text += text
    # DOCX SUPPORT

    elif file.filename.endswith(".docx"):

        document = Document(file.file)

        for para in document.paragraphs:

            extracted_text += para.text + "\n"

    else:

        return {
            "error": "Unsupported file type"
        }
    if not extracted_text:

     return {
        "error": "No readable text found in document"
    }

    completion = client.chat.completions.create(

        model="openai/gpt-3.5-turbo",

        messages=[
            {
                "role": "system",
                "content": "Summarize this document clearly."
            },
            {
                "role": "user",
                "content": extracted_text[:4000]
            }
        ]
    )

    summary = completion.choices[0].message.content

    return {
        "summary": summary
    }
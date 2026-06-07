from pydantic import BaseModel

class QuizRequest(BaseModel):
    subject: str

class QuizAnswer(BaseModel):
    question: str
    selected_answer: str
    correct_answer: str

class QuizSubmission(BaseModel):
    answers: list[QuizAnswer]
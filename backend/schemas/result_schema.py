from pydantic import BaseModel

class ResultCreate(BaseModel):
    user_email: str
    subject: str
    score: int
    percentage: float
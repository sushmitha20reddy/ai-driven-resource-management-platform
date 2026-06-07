from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import SessionLocal
from models.result_model import Result

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/profile/{email}")
async def get_profile(
    email: str,
    db: Session = Depends(get_db)
):

    results = (
        db.query(Result)
        .filter(Result.user_email == email)
        .all()
    )

    total_attempts = len(results)

    if total_attempts == 0:
        return {
            "email": email,
            "total_attempts": 0,
            "average_score": 0,
            "best_score": 0,
            "subjects": []
        }

    average_score = (
        sum(r.percentage for r in results)
        / total_attempts
    )

    best_score = max(
        r.percentage for r in results
    )

    subjects = list(
        set(r.subject for r in results)
    )

    return {
        "email": email,
        "total_attempts": total_attempts,
        "average_score": average_score,
        "best_score": best_score,
        "subjects": subjects
    }
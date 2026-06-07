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

@router.get("/admin-stats")
async def admin_stats(
    db: Session = Depends(get_db)
):

    results = db.query(Result).all()

    total_quizzes = len(results)

    if total_quizzes == 0:
        return {
            "total_quizzes": 0,
            "average_score": 0,
            "best_score": 0,
            "recent_results": []
        }

    average_score = (
        sum(r.percentage for r in results)
        / total_quizzes
    )

    best_score = max(
        r.percentage for r in results
    )

    recent_results = results[-5:]

    return {
        "total_quizzes": total_quizzes,
        "average_score": average_score,
        "best_score": best_score,
        "recent_results": [
            {
                "email": r.user_email,
                "subject": r.subject,
                "percentage": r.percentage
            }
            for r in recent_results
        ]
    }
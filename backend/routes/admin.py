from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import SessionLocal
from models.result_model import Result
from models.user import User

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

    users = db.query(User).all()

    total_users = len(users)

    total_quizzes = len(results)

    if total_quizzes == 0:
        return {
            "total_users": total_users,
            "total_quizzes": 0,
            "average_score": 0,
            "best_score": 0,
            "subjects": 0,
            "recent_results": []
        }

    average_score = (
        sum(r.percentage for r in results)
        / total_quizzes
    )

    best_score = max(
        r.percentage for r in results
    )

    subjects = len(
        set(
            r.subject.strip().lower()
            for r in results
            if r.subject
        )
    )

    recent_results = (
        db.query(Result)
        .order_by(Result.created_at.desc())
        .limit(5)
        .all()
    )

    return {
        "total_users": total_users,
        "total_quizzes": total_quizzes,
        "average_score": average_score,
        "best_score": best_score,
        "subjects": subjects,
        "recent_results": [
            {
                "email": r.user_email,
                "subject": r.subject,
                "percentage": r.percentage
            }
            for r in recent_results
        ]
    }
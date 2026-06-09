from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import SessionLocal
from models.result_model import Result
from schemas.result_schema import ResultCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/save-result")
async def save_result(
    data: ResultCreate,
    db: Session = Depends(get_db)
):

    result = Result(
        user_email=data.user_email,
        subject=data.subject,
        score=data.score,
        percentage=data.percentage
    )

    db.add(result)
    db.commit()
    db.refresh(result)

    return {
        "message": "Result saved successfully"
    }


@router.get("/results")
async def get_all_results(
    db: Session = Depends(get_db)
):
    return db.query(Result).all()


@router.get("/results/{email}")
async def get_results_by_email(
    email: str,
    db: Session = Depends(get_db)
):

    results = (
        db.query(Result)
        .filter(Result.user_email == email)
        .all()
    )

    return results

@router.get("/analytics/{email}")
async def analytics_by_email(
    email: str,
    db: Session = Depends(get_db)
):

    results = (
        db.query(Result)
        .filter(
            Result.user_email == email
        )
        .all()
    )

    total_quizzes = len(results)

    if total_quizzes == 0:
        return {
            "total_quizzes": 0,
            "average_percentage": 0,
            "best_score": 0,
            "subjects": 0
        }

    average_percentage = (
        sum(r.percentage for r in results)
        / total_quizzes
    )

    best_score = max(
        r.percentage for r in results
    )

    subjects = len(
        set(
            r.subject
            for r in results
        )
    )

    return {
        "total_quizzes": total_quizzes,
        "average_percentage": average_percentage,
        "best_score": best_score,
        "subjects": subjects
    }

@router.get("/recent-activity/{email}")
async def recent_activity_by_email(
    email: str,
    db: Session = Depends(get_db)
):

    results = (
        db.query(Result)
        .filter(
            Result.user_email == email
        )
        .order_by(Result.id.desc())
        .limit(10)
        .all()
    )

    return results

@router.get("/chart-data/{email}")
async def chart_data(
    email: str,
    db: Session = Depends(get_db)
):

    results = (
        db.query(Result)
        .filter(
            Result.user_email == email
        )
        .order_by(Result.id.asc())
        .all()
    )

    return [
        {
            "quiz": f"Quiz {i+1}",
            "score": r.percentage
        }
        for i, r in enumerate(results)
    ]
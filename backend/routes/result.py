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
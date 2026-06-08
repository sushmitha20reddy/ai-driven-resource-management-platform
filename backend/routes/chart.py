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

@router.get("/last-7-days")
def last_7_days(
    db: Session = Depends(get_db)
):
    results = db.query(Result).all()

    return [
        {
            "date": f"Quiz {i + 1}",
            "average": result.percentage
        }
        for i, result in enumerate(results)
    ]
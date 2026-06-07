from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta

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
def last_7_days(db: Session = Depends(get_db)):

    seven_days_ago = datetime.now() - timedelta(days=7)

    results = (
        db.query(
            func.date(Result.created_at).label("date"),
            func.avg(Result.percentage).label("average")
        )
        .filter(Result.created_at >= seven_days_ago)
        .group_by(func.date(Result.created_at))
        .all()
    )

    return [
        {
            "date": r.date.strftime("%b %d"),
            "average": round(r.average, 2)
        }
        for r in results
    ]
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

@router.get("/recent-activity")
async def recent_activity(
    db: Session = Depends(get_db)
):

    results = (
        db.query(Result)
        .order_by(Result.created_at.desc())
        .limit(5)
        .all()
    )

    return [
        {
            "subject": r.subject,
            "percentage": r.percentage,
            "created_at": r.created_at
        }
        for r in results
    ]
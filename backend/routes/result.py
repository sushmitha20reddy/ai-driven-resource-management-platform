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

    return {
        "message": "Result saved successfully"
    }
@router.get("/results")
async def get_all_results(
    db: Session = Depends(get_db)
):
    return db.query(Result).all()


    

@router.get("/analytics")
async def analytics(
    db: Session = Depends(get_db)
):
    
    
    results = db.query(Result).all()

    total_quizzes = len(results)

    if total_quizzes == 0:
        return {
            "total_quizzes": 0,
            "average_percentage": 0,
            "best_score": 0
        }

    average_percentage = (
        sum(r.percentage for r in results)
        / total_quizzes
    )

    best_score = max(
        r.percentage for r in results
    )

    return {
        "total_quizzes": total_quizzes,
        "average_percentage": average_percentage,
        "best_score": best_score
    }

@router.get("/chart-data")
async def chart_data(
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
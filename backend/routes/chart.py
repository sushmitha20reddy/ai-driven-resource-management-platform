@router.get("/last-7-days")
def last_7_days(
    db: Session = Depends(get_db)
):
    results = db.query(Result).all()

    return [
        {
            "date": f"Quiz {i+1}",
            "average": result.percentage
        }
        for i, result in enumerate(results)
    ]
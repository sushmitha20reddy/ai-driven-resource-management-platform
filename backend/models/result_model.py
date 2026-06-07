from sqlalchemy import Column, Integer, String, Float, DateTime
from database.database import Base
from sqlalchemy.sql import func

class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String)
    subject = Column(String)
    score = Column(Integer)
    percentage = Column(Float)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
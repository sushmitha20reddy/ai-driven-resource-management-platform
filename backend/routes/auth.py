from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from models.user import User
from schemas.user_schema import (
    UserCreate,
    UserLogin
)
from utils.hash import hash_password
from utils.hash import verify_password
from utils.jwt import create_access_token

router = APIRouter()


@router.post("/signup")
def signup(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    hashed_password = hash_password(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User created successfully 🚀"
    }


@router.post("/login")
async def login(
    data: LoginSchema,
    db: Session = Depends(get_db)
):

    # ADMIN LOGIN

    if (
        data.email == "admin@gmail.com"
        and
        data.password == "admin123"
    ):
        return {
            "access_token": "admin_token",
            "role": "admin"
        }

    # NORMAL USER LOGIN

    user = (
        db.query(User)
        .filter(User.email == data.email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    return {
        "access_token": "user_token",
        "role": "user"
    }
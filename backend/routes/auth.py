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
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:

        return {
            "error": "Invalid email"
        }

    password_correct = verify_password(
        user.password,
        existing_user.password
    )

    if not password_correct:

        return {
            "error": "Invalid password"
        }

    token = create_access_token({
        "user_id": existing_user.id,
        "email": existing_user.email
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }
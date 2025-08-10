# backend/crud/user.py

from sqlalchemy.orm import Session
from passlib.context import CryptContext
from models.user import User, RoleEnum
from schemas.user import UserCreate

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hash password
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Verify password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Get user by email
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

# Get user by username
def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

# Get all users
def get_users(db: Session):
    return db.query(User).all()

# Create new user
def create_user(db: Session, user: UserCreate):
    # Hash the password
    hashed_password = hash_password(user.password)
    
    # Create user object
    db_user = User(
        email=user.email,
        username=user.username,
        hashed_password=hashed_password,
        role=RoleEnum.user
    )
    
    # Add to database
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Update user password
def update_password(db: Session, email: str, new_password: str):
    user = get_user_by_email(db, email)
    if user:
        user.hashed_password = hash_password(new_password)
        db.commit()
        db.refresh(user)
    return user

# Block user
def block_user(db: Session, email: str):
    user = get_user_by_email(db, email)
    if user:
        user.is_blocked = True
        db.commit()
        db.refresh(user)
    return user

# Unblock user
def unblock_user(db: Session, email: str):
    user = get_user_by_email(db, email)
    if user:
        user.is_blocked = False
        db.commit()
        db.refresh(user)
    return user

# Make user admin
def make_admin(db: Session, email: str):
    user = get_user_by_email(db, email)
    if user:
        user.role = RoleEnum.admin
        db.commit()
        db.refresh(user)
    return user

# Remove admin role
def remove_admin(db: Session, email: str):
    user = get_user_by_email(db, email)
    if user:
        user.role = RoleEnum.user
        db.commit()
        db.refresh(user)
    return user

# Verify user email
def verify_user_email(db: Session, email: str):
    user = get_user_by_email(db, email)
    if user:
        user.is_verified = True
        db.commit()
        db.refresh(user)
    return user
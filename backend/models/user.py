# backend/models/user.py

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.sql import func
from database.connection import Base
import enum

# Role enum for users
class RoleEnum(str, enum.Enum):
    user = "user"
    admin = "admin"

# User database model
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    
    # User status fields
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    is_blocked = Column(Boolean, default=False)
    
    # User role
    role = Column(Enum(RoleEnum), default=RoleEnum.user)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
# backend/schemas/user.py

from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from models.user import RoleEnum

# Base user schema
class UserBase(BaseModel):
    email: str
    username: str

# Schema for creating user
class UserCreate(UserBase):
    password: str

# Schema for user login
class UserLogin(BaseModel):
    email: str
    password: str

# Schema for user response
class UserResponse(UserBase):
    id: int
    is_active: bool
    is_verified: bool
    is_blocked: bool
    role: RoleEnum
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Schema for email verification
class EmailVerification(BaseModel):
    email: str
    code: str

# Schema for password reset
class PasswordReset(BaseModel):
    email: str
    code: str
    new_password: str

# Schema for change password
class ChangePassword(BaseModel):
    email: str
    old_password: str
    new_password: str
    access_token: str

# Schema for forgot password
class ForgotPassword(BaseModel):
    email: str

# Schema for user profile request
class UserProfileRequest(BaseModel):
    email: str
    access_token: str

# Schema for admin actions
class AdminAction(BaseModel):
    email: str
    access_token: str

# Schema for token refresh
class TokenRefresh(BaseModel):
    token: str

# Token response schema
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

# Token data schema
class TokenData(BaseModel):
    email: str
    role: str
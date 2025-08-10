# backend/routers/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database.connection import get_db
from schemas.user import (
    UserCreate, UserLogin, EmailVerification, 
    PasswordReset, ChangePassword, ForgotPassword, 
    TokenRefresh, Token
)
from crud.user import (
    get_user_by_email, create_user, verify_password, 
    update_password, verify_user_email
)
from auth.jwt_handler import create_access_token, create_refresh_token, decode_token
from utils.email_sender import send_verification_email
import random

# Create router
router = APIRouter(prefix="/auth", tags=["Authentication"])

# In-memory storage for verification codes
verification_codes = {}

@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user
    """
    # Check if user already exists
    if get_user_by_email(db, user.email):
        raise HTTPException(
            status_code=400, 
            detail="Email already registered"
        )
    
    # Create user
    created_user = create_user(db, user)
    
    # Generate verification code
    code = str(random.randint(100000, 999999))
    verification_codes[user.email] = code
    
    # Send verification email
    if send_verification_email(user.email, code):
        return {"message": "Verification code sent to your email"}
    else:
        return {"message": "User created but email sending failed"}

@router.post("/confirm")
def confirm_email(verification: EmailVerification, db: Session = Depends(get_db)):
    """
    Confirm user email with verification code
    """
    # Check if code exists and matches
    if verification.email not in verification_codes:
        raise HTTPException(status_code=400, detail="No verification code found")
    
    if verification_codes[verification.email] != verification.code:
        raise HTTPException(status_code=400, detail="Invalid verification code")
    
    # Verify user email
    user = verify_user_email(db, verification.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Remove used code
    del verification_codes[verification.email]
    
    return {"message": "Email verified successfully"}

@router.post("/login", response_model=Token)
def login_user(user_login: UserLogin, db: Session = Depends(get_db)):
    """
    Login user and return tokens
    """
    # Get user from database
    user = get_user_by_email(db, user_login.email)
    
    # Check if user exists and password is correct
    if not user or not verify_password(user_login.password, user.hashed_password):
        raise HTTPException(
            status_code=401, 
            detail="Invalid email or password"
        )
    
    # Check if user is verified
    if not user.is_verified:
        raise HTTPException(
            status_code=403, 
            detail="Email not verified"
        )
    
    # Check if user is blocked
    if user.is_blocked:
        raise HTTPException(
            status_code=403, 
            detail="User is blocked"
        )
    
    # Create tokens
    token_data = {"sub": user.email, "role": user.role.value}
    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post("/refresh", response_model=Token)
def refresh_tokens(token_refresh: TokenRefresh):
    """
    Refresh access and refresh tokens
    """
    # Decode refresh token
    token_data = decode_token(token_refresh.token)
    
    if not token_data:
        raise HTTPException(
            status_code=401, 
            detail="Invalid refresh token"
        )
    
    # Create new tokens
    new_token_data = {"sub": token_data.email, "role": token_data.role}
    access_token = create_access_token(new_token_data)
    refresh_token = create_refresh_token(new_token_data)
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post("/forget-password")
def forget_password(forgot_password: ForgotPassword, db: Session = Depends(get_db)):
    """
    Send password reset code to email
    """
    # Check if user exists
    user = get_user_by_email(db, forgot_password.email)
    if not user:
        # Don't reveal if email exists or not
        return {"message": "If email exists, reset code has been sent"}
    
    # Generate reset code
    code = str(random.randint(100000, 999999))
    verification_codes[forgot_password.email] = code
    
    # Send reset email
    send_verification_email(forgot_password.email, code, purpose="password reset")
    
    return {"message": "If email exists, reset code has been sent"}

@router.post("/reset-password")
def reset_password(password_reset: PasswordReset, db: Session = Depends(get_db)):
    """
    Reset password using verification code
    """
    # Check if code exists and matches
    if password_reset.email not in verification_codes:
        raise HTTPException(status_code=400, detail="No reset code found")
    
    if verification_codes[password_reset.email] != password_reset.code:
        raise HTTPException(status_code=400, detail="Invalid reset code")
    
    # Update password
    user = update_password(db, password_reset.email, password_reset.new_password)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Remove used code
    del verification_codes[password_reset.email]
    
    return {"message": "Password reset successfully"}

@router.post("/change-password")
def change_password(change_pass: ChangePassword, db: Session = Depends(get_db)):
    """
    Change password for authenticated user
    """
    # Verify access token
    token_data = decode_token(change_pass.access_token)
    if not token_data or token_data.email != change_pass.email:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Get user and verify old password
    user = get_user_by_email(db, change_pass.email)
    if not user or not verify_password(change_pass.old_password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid old password")
    
    # Update password
    update_password(db, change_pass.email, change_pass.new_password)
    
    return {"message": "Password changed successfully"}
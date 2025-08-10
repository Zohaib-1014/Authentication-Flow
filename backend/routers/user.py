# backend/routers/user.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.connection import get_db
from schemas.user import UserProfileRequest, UserResponse
from crud.user import get_user_by_email
from auth.jwt_handler import decode_token

# Create router
router = APIRouter(prefix="/user", tags=["User"])

@router.post("/profile", response_model=UserResponse)
def get_user_profile(profile_request: UserProfileRequest, db: Session = Depends(get_db)):
    """
    Get user profile information
    """
    # Verify access token
    token_data = decode_token(profile_request.access_token)
    
    if not token_data:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Check if token email matches request email
    if token_data.email != profile_request.email:
        raise HTTPException(status_code=403, detail="Token email mismatch")
    
    # Get user from database
    user = get_user_by_email(db, profile_request.email)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user
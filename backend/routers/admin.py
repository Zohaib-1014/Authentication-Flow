# backend/routers/admin.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database.connection import get_db
from schemas.user import AdminAction, UserResponse
from crud.user import (
    get_users, get_user_by_email, block_user, 
    unblock_user, make_admin, remove_admin
)
from auth.jwt_handler import decode_token
from models.user import RoleEnum

# Create router
router = APIRouter(prefix="/admin", tags=["Admin"])

def verify_admin_token(access_token: str):
    """
    Verify if the token belongs to an admin user
    """
    token_data = decode_token(access_token)
    if not token_data or token_data.role != RoleEnum.admin.value:
        raise HTTPException(status_code=403, detail="Admin access required")
    return token_data

@router.get("/users", response_model=List[UserResponse])
def get_all_users(access_token: str, db: Session = Depends(get_db)):
    """
    Get list of all users (Admin only)
    """
    # Verify admin token
    verify_admin_token(access_token)
    
    # Get all users
    users = get_users(db)
    return users

@router.post("/block-user")
def block_user_account(admin_action: AdminAction, db: Session = Depends(get_db)):
    """
    Block a user account (Admin only)
    """
    # Verify admin token
    verify_admin_token(admin_action.access_token)
    
    # Block the user
    user = block_user(db, admin_action.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": f"User {admin_action.email} has been blocked"}

@router.post("/unblock-user")
def unblock_user_account(admin_action: AdminAction, db: Session = Depends(get_db)):
    """
    Unblock a user account (Admin only)
    """
    # Verify admin token
    verify_admin_token(admin_action.access_token)
    
    # Unblock the user
    user = unblock_user(db, admin_action.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": f"User {admin_action.email} has been unblocked"}

@router.post("/make-admin")
def promote_to_admin(admin_action: AdminAction, db: Session = Depends(get_db)):
    """
    Promote user to admin (Admin only)
    """
    # Verify admin token
    verify_admin_token(admin_action.access_token)
    
    # Make user admin
    user = make_admin(db, admin_action.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": f"User {admin_action.email} has been promoted to admin"}

@router.post("/remove-admin")
def demote_from_admin(admin_action: AdminAction, db: Session = Depends(get_db)):
    """
    Remove admin role from user (Admin only)
    """
    # Verify admin token
    verify_admin_token(admin_action.access_token)
    
    # Remove admin role
    user = remove_admin(db, admin_action.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": f"Admin role removed from {admin_action.email}"}

@router.get("/fix-admin-role")
def fix_admin_role(db: Session = Depends(get_db)):
    """
    Utility to fix admin role for default admin
    """
    user = get_user_by_email(db, "admin@gmail.com")
    if user:
        user.role = RoleEnum.admin
        db.commit()
        return {"message": "Admin role fixed for admin@gmail.com"}
    else:
        raise HTTPException(status_code=404, detail="Default admin not found")
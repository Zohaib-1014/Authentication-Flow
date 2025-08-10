# backend/startup/admin_creator.py

from sqlalchemy.orm import Session
from crud.user import get_user_by_email, hash_password
from models.user import User, RoleEnum
from database.connection import SessionLocal

def create_default_admin():
    """
    Create default admin user if not exists
    """
    db: Session = SessionLocal()
    
    try:
        # Check if admin already exists
        admin_email = "admin@gmail.com"
        existing_admin = get_user_by_email(db, admin_email)
        
        if not existing_admin:
            # Create default admin
            admin_user = User(
                email=admin_email,
                username="admin",
                hashed_password=hash_password("admin123"),
                role=RoleEnum.admin,
                is_verified=True,  # Admin is pre-verified
                is_active=True
            )
            
            db.add(admin_user)
            db.commit()
            db.refresh(admin_user)
            
            print("Default admin created successfully!")
            print("Email: admin@gmail.com")
            print("Password: admin123")
        else:
            print("Default admin already exists!")
            
    except Exception as e:
        print(f"Error creating default admin: {e}")
        db.rollback()
    finally:
        db.close()
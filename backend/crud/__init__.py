# backend/crud/__init__.py

from .user import (
    hash_password, verify_password, get_user_by_email, 
    get_user_by_username, get_users, create_user, 
    update_password, block_user, unblock_user, 
    make_admin, remove_admin, verify_user_email
)
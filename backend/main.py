# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database.connection import engine, Base
from routers.auth import router as auth_router
from routers.user import router as user_router
from routers.admin import router as admin_router
from startup.admin_creator import create_default_admin

# Create FastAPI app
app = FastAPI(
    title="Authentication Flow API",
    description="Complete authentication system with user management",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(admin_router)

# Mount static files (for React build)
app.mount("/static", StaticFiles(directory="../frontend/build"), name="static")

@app.get("/")
def root():
    """
    Root endpoint
    """
    return {"message": "Authentication Flow API is running!"}

@app.get("/health")
def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy", "message": "API is working properly"}

# Startup event
@app.on_event("startup")
def startup_event():
    """
    Run on application startup
    """
    # Create database tables
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")
    
    # Create default admin
    create_default_admin()
    print("Startup completed!")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
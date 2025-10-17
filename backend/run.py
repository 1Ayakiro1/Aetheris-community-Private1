#!/usr/bin/env python3
import os
import sys

# Add backend directory to Python path
backend_path = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, backend_path)

# Change working directory to backend
os.chdir(backend_path)

# Import and run the application
import uvicorn

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
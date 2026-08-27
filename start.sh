#!/bin/bash
cd /Users/aditya/.gemini/antigravity/scratch/workflowai

echo "Starting FastAPI Backend..."
source venv-3.12/bin/activate
cd backend
python -m uvicorn api:app --host 127.0.0.1 --port 8000 &
BACKEND_PID=$!

echo "Starting Next.js Frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "Both servers running. Press Ctrl+C to stop."
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM
wait

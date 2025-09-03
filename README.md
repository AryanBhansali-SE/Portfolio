# Portfolio Monorepo (Python backend + Next.js frontend)

## Layout

- backend/ — FastAPI backend (port 8000)
- web/ — Next.js app (port 3000)

## Dev

# Terminal A

cd backend
source .venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000 --reload --reload-exclude ".venv/\*"

# Terminal B

cd web
npm run dev

The frontend reads NEXT_PUBLIC_API_BASE to call the backend.
fun project built.

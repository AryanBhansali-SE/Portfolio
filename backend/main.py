from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow local Next.js in dev. Add your prod origin later.
ALLOWED_ORIGINS = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/healthz")
def health():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"message": "Backend is running"}

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal
from models import Review
from schemas import ReviewCreate, ReviewResponse
from services.sentiment import analyze_sentiment
from services.keypoints import extract_keypoints
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Tambahkan CORS middleware supaya frontend dapat memanggil API dari dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/analyze-review", response_model=ReviewResponse)
def analyze_review(payload: ReviewCreate, db: Session = Depends(get_db)):
    text = payload.text

    sentiment = analyze_sentiment(text)
    keypoints = extract_keypoints(text)

    review = Review(text=text, sentiment=sentiment, keypoints=keypoints)
    db.add(review)
    db.commit()
    db.refresh(review)

    return review

@app.get("/api/reviews", response_model=list[ReviewResponse])
def get_reviews(db: Session = Depends(get_db)):
    return db.query(Review).all()

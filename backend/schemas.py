from pydantic import BaseModel

class ReviewCreate(BaseModel):
    text: str

class ReviewResponse(BaseModel):
    id: int
    text: str
    sentiment: str
    keypoints: str

    class Config:
        from_attributes = True

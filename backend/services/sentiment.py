from transformers import pipeline

model = pipeline("sentiment-analysis")

def analyze_sentiment(text: str):
    res = model(text)[0]
    label = res["label"].lower()
    return label

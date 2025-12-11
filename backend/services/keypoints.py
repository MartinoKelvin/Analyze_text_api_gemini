import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if api_key:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")
else:
    model = None

def extract_keypoints(text: str):
    if model is None:
        return "Gemini key missing, cannot generate keypoints."

    try:
        prompt = (
            "Summarize this review into 2–3 short key points:\n\n" + text
        )
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Gemini error: {str(e)}"

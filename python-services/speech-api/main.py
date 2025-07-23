from fastapi import FastAPI, Request
import httpx
import os

app = FastAPI()
AI_ENDPOINT = os.getenv("AI_SERVICE_URL", "http://ai-model:5000/generate")

@app.post("/speech")
async def handle_speech(request: Request):
    data = await request.json()
    prompt = data.get("text", "").strip()

    if not prompt:
        return {"error": "Пустой текст"}

    try:
        async with httpx.AsyncClient() as client:
            res = await client.post(AI_ENDPOINT, json={"inputs": prompt})
            res.raise_for_status()
            result = res.json()
    except Exception as e:
        return {"error": f"Ошибка AI: {str(e)}"}

    ai_reply = ""
    if isinstance(result, list):
        ai_reply = result[0].get("generated_text", "").strip()
    else:
        ai_reply = result.get("generated_text", "").strip()

    print(f"Ответ от AI: {ai_reply}")
    return {"reply": ai_reply}

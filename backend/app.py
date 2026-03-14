from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import rag

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    answer: str

@app.get("/")
def index():
    return {"message": "This is root endpoint!"}

@app.post("/chat")
async def chat(request: ChatRequest):
    def sync_generator():
        try:
            for chunk in rag.stream_rag_response_sync(request.message):
                yield chunk
        except Exception as e:
            yield f"\nError: {str(e)}"

    return StreamingResponse(sync_generator(), media_type="text/plain")
    

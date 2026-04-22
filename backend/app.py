from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from database import get_db

from pydantic import BaseModel
from sqlalchemy.orm import Session
import rag
import pyodbc

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SERVER_NAME = "server_name"
DATABASE_NAME = "db_name"

conn = pyodbc.connect("Driver={SQL Server Native Client 11.0};"
                      "Server=" + SERVER_NAME + ";"
                      "Database=" + DATABASE_NAME + ";"
                      "Trusted_Connection=yes;")

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    answer: str

class SearchRequest(BaseModel):
    surname: str
    firstname: str
    program_name: str
    program_type: str
    level: str

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


@app.post("/search")
async def search(request: SearchRequest, db: Session = Depends(get_db)):
    # cursor = conn.cursor()
    # cursor.execute("SELECT * FROM students WHERE surname=? AND firstname=? AND program_name=? AND program_type=? AND level=?", 
    #                (request.surname, request.firstname, request.program_name, request.program_type, request.level))
    # rows = cursor.fetchall()
    # results = []
    # for row in rows:
    #     results.append({
    #         "id": row[0],
    #         "surname": row[1],
    #         "firstname": row[2],
    #         "program_name": row[3],
    #         "program_type": row[4],
    #         "level": row[5]
    #     })

    db.execute("SELECT * FROM students WHERE surname=? AND firstname=? AND program_name=? AND program_type=? AND level=?",
               (request.surname, request.firstname, request.program_name, request.program_type, request.level))
    rows = db.fetchall()
    results = []
    for row in rows:
        results.append({
            "id": row[0],
            "surname": row[1],
            "firstname": row[2],
            "program_name": row[3],
            "program_type": row[4],
            "level": row[5]
        })

    return {"results": results}
    

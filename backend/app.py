from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from constants import DEPARTMENTS
from database import get_db

from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import text

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://student-assist.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    answer: str

class SearchRequest(BaseModel):
    matricnum: str
    department: str
    level: int

@app.get("/")
def index():
    return {"message": "This is root endpoint!"}

@app.post("/chat")
async def chat(request: ChatRequest):
    import rag
    def sync_generator():
        try:
            for chunk in rag.stream_rag_response_sync(request.message):
                yield chunk
        except Exception as e:
            yield f"\nError: {str(e)}"

    return StreamingResponse(sync_generator(), media_type="text/plain")


@app.post("/search")
async def search(request: SearchRequest, db: Session = Depends(get_db)):
    try:
        department_id = DEPARTMENTS.get(request.department.upper())

        query = "SELECT id, matricnum, fullname, email, department, level, enrollment_date, status, sex FROM records WHERE matricnum LIKE :matricnum AND DepartmentID = :department_id AND level = :level"
        result = db.execute(text(query), {"matricnum": request.matricnum.upper(), "department_id": department_id, "level": request.level})
        row = result.fetchone()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    if not row:
        raise HTTPException(status_code=404, detail="Student not found")
    
    return {
        "id": row[0],
        "matricnum": row[1],
        "fullname": row[2],
        "email": row[3],
        "department": row[4],
        "level": row[5],
        "enrollment_date": row[6],
        "status": row[7],
        "sex": row[8],
    }        
    

@app.get("/departments")
def get_department_details(db: Session = Depends(get_db)):
    try:
        name_result = db.execute(
            text("""
                SELECT id, department
                FROM FuoyeProject.dbo.department
                ORDER BY department
            """)
        )
        return [{
            "department_id": row[0],
            "department_name": row[1]
        } for row in name_result]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

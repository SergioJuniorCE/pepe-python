from fastapi import FastAPI
from fastapi.requests import Request
from fastapi.middleware.cors import CORSMiddleware

# Initialize the FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

todo_list = [
    {
        "id": 1,
        "title": "Buy groceries",
        "description": "Buy groceries",
        "completed": False
    }
]

@app.get("/")
async def root(request: Request):    
    return {"message": "Hello World"}

# GET = Read data
@app.get("/todos")
async def get_todos():
    return todo_list

# POST = Create data
@app.post("/todos")
async def create_todo(request: Request):
    new_todo = await request.json()
    new_todo["id"] = len(todo_list) + 1
    new_todo["completed"] = False
    todo_list.append(new_todo)
    return {"message": "Todo created successfully"}

@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int):
    for todo in todo_list:
        if todo["id"] == todo_id:
            todo_list.remove(todo)
            return {"message": "Todo deleted successfully"}
    return {"message": "Todo not found"}
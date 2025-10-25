from fastapi import FastAPI

# uvicorn main:app --reload
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}
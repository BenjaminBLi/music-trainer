from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from google.cloud import firestore
import os

app = FastAPI()
db = firestore.Client(project="music-trainer")

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    file_location = f"uploads/{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(await file.read())
    return {"filename": file.filename}


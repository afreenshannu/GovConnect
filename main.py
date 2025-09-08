from fastapi import FastAPI, Form, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import ObjectId
import base64
from pydantic import BaseModel
from ultralytics import YOLO
from PIL import Image
import io


model = YOLO(r"F:\IPD SC\yolov8n.pt")

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient("mongodb://localhost:27017")
db = client["smartcivic"]
collection = db["reports"]


@app.post("/submit-report")
async def submit_report(
    title: str = Form(...),
    description: str = Form(...),
    location: str = Form(...),
    image: UploadFile = File(None)
):
    image_base64 = None
    detected_issue = "Unknown"
    confidence = None

    if image:
        contents = await image.read()
        image_base64 = base64.b64encode(contents).decode("utf-8")

        # Run YOLO detection
        pil_image = Image.open(io.BytesIO(contents))
        results = model.predict(pil_image)

        if results and len(results[0].boxes) > 0:
            # Take the first detected object
            cls_id = int(results[0].boxes[0].cls[0])
            detected_issue = results[0].names[cls_id]
            confidence = float(results[0].boxes[0].conf[0])

    # Save report in DB
    report = {
        "title": title,
        "description": description,
        "location": location,
        "image": image_base64,
        "status": "Pending",
        "detected_issue": detected_issue,
        "confidence": confidence,
    }

    result = collection.insert_one(report)

    return {
        "message": "Report submitted successfully",
        "id": str(result.inserted_id),
        "title": title,
        "description": description,
        "location": location,
        "image": image_base64,
        "status": "Pending",
        "detected_issue": detected_issue,
        "confidence": confidence,
    }


@app.get("/get-reports")
async def get_reports():
    reports = []
    for report in collection.find().sort("_id", -1):
        reports.append({
            "_id": str(report["_id"]),
            "title": report["title"],
            "description": report["description"],
            "location": report["location"],
            "image": report.get("image"),
            "status": report.get("status", "Pending"),
            "detected_issue": report.get("detected_issue", "Unknown"),
            "confidence": report.get("confidence"),
        })
    return reports


class StatusUpdate(BaseModel):
    status: str


@app.put("/update-status/{report_id}")
async def update_status(report_id: str, update: StatusUpdate):
    result = collection.update_one(
        {"_id": ObjectId(report_id)},
        {"$set": {"status": update.status}}
    )
    if result.modified_count == 1:
        return {"message": f"Status updated to {update.status}"}
    else:
        return {"message": "No changes made"}

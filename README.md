**GovConnect-AI-Powered Civic Issue Reporting Platform**

**Project Overview::**

GovConnect is a web-based platform that enables citizens to report civic issues such as potholes, garbage dumps, and damaged streetlights. The system leverages AI (YOLOv8) to automatically detect issue types from uploaded images, reducing the effort required from users and ensuring faster reporting.

Admins can view all reports in a dashboard, track statuses, and manage civic problem resolutions effectively.

**Tech Stack::**
_**Frontend:**_
React (Vite)
Axios (API requests)
_**Backend:**_
FastAPI (Python)
YOLOv8 (Ultralytics) for image detection
Pydantic (validation)
_**Database:**_
MongoDB


**Features::**
Manual Reporting: Users can submit issue title, description, location, and image.
AI-Powered Reporting: Users upload an image, system auto-detects issue type (pothole, garbage, etc.), user only provides location.
Admin Dashboard: View reports, track statuses, and monitor issue resolution.
YOLOv8 Integration: Real-time object detection for civic problems.
MongoDB Storage: Saves all reports with image (Base64), issue type, and status.

API Endpoints::
POST /submit-report
Submit a manual report (title, description, location, image).

POST /submit-ai-report
Submit AI-powered report (location + image only, YOLO predicts issue type).

GET /get-reports
Fetch all reports (latest first).

PUT /update-status/{id}
Update report status (Pending → In Progress → Resolved).

<img width="437" height="636" alt="image" src="https://github.com/user-attachments/assets/ebf8dc1c-64b3-4c0a-90ec-f85491c5e4f5" />

**Datasets:**
Get the datasets from :https://drive.google.com/drive/u/0/folders/1ovZzXmk-tsTY4V2xSVy4rT1HLufOe5_u

Use merge.py file to combine all the images and labels from the datasets.
use yaml.py file to create data.yaml file.

for training use :: yolo detect train data=data.yaml model=yolov8n.yaml epochs=100 imgsz=640


**How to Run Locally::**
cd backend
uvicorn main:app --reload

cd smartcivic
npm install
npm run dev

Enhancements which are going to be don further on this are:
 Add user authentication (JWT login/signup).

 Add issue tracking system for citizens → check report status.

 Add analytics dashboard for admins (charts of issues by type, location, resolution time).

 Update ReportForm to:

Upload an image.

Send to FastAPI.

Display detected issue + location automatically.

 Add IssueCard component improvements:

Show issue type, confidence score, and location map preview.

 AdminDashboard:

Display reported issues in real-time.

Add filters → issue type, location, priority.

Add status update (Pending → In Progress → Resolved).

Expand from static uploads to continuous monitoring like:.

CCTV Feeds

Take live RTSP stream or video file as input.

Run YOLOv8 detection in real-time.

On detection, auto-create a report in DB (issue type + timestamp + camera location).








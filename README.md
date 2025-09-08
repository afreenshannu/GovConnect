GovConnect-AI-Powered Civic Issue Reporting Platform

Project Overview::

GovConnect is a web-based platform that enables citizens to report civic issues such as potholes, garbage dumps, and damaged streetlights. The system leverages AI (YOLOv8) to automatically detect issue types from uploaded images, reducing the effort required from users and ensuring faster reporting.

Admins can view all reports in a dashboard, track statuses, and manage civic problem resolutions effectively.

Tech Stack::

Frontend:
React (Vite)
Axios (API requests)

Backend:
FastAPI (Python)
YOLOv8 (Ultralytics) for image detection
Pydantic (validation)

Database:
MongoDB


Features::
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

How to Run Locally::
cd backend
uvicorn main:app --reload

cd smartcivic
npm install
npm run dev

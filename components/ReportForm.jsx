import { useState, useRef } from "react";
import "./ReportForm.css";

const ReportForm = ({ onReportSubmitted }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        image: null,
    });

    const [loading, setLoading] = useState(false);


    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("location", formData.location);
            if (formData.image) {
                formDataToSend.append("image", formData.image);
            }

            const response = await fetch("http://127.0.0.1:8000/submit-report", {
                method: "POST",
                body: formDataToSend,
            });

            const data = await response.json();
            alert(data.message);


            const newReport = {
                title: formData.title,
                description: formData.description,
                location: formData.location,
                image_url: data.image_url || null,
                id: data.id || Date.now(),
                status: "Pending",
            };


            setFormData({ title: "", description: "", location: "", image: null });


            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }


            if (onReportSubmitted) {
                onReportSubmitted(newReport);
            }
        } catch (error) {
            console.error("Error submitting report:", error);
            alert("Failed to submit report");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="report-form">
            <input
                type="text"
                name="title"
                placeholder="Issue Title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
            />
            <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
            />
            <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Report"}
            </button>
        </form>
    );
};

export default ReportForm;

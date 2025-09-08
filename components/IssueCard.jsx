import React from "react";

const IssueCard = ({ issue }) => {
    if (!issue) return null;

    // Handle image (base64, URL, or YOLO result)
    const imageSrc =
        issue.image
            ? `data:image/jpeg;base64,${issue.image}`
            : issue.image_url || issue.result_image || null;

    return (
        <div style={styles.card}>
            <h2 style={styles.title}>
                {issue.title || `Detected Issue: ${issue.issue || "Unknown"}`}
            </h2>


            <p style={styles.description}>
                {issue.description || "No description provided."}
            </p>


            {imageSrc && (
                <img
                    src={imageSrc}
                    alt="Issue"
                    style={styles.image}
                />
            )}


            <p style={styles.location}>
                <strong>Location:</strong> {issue.location || "Not provided"}
            </p>


            {issue.status && (
                <p
                    style={{
                        ...styles.status,
                        color: issue.status.toLowerCase() === "resolved" ? "green" : "orange",
                    }}
                >
                    <strong>Status:</strong> {issue.status}
                </p>
            )}


            {issue.confidence && (
                <p style={styles.confidence}>
                    <strong>Confidence:</strong> {(issue.confidence * 100).toFixed(1)}%
                </p>
            )}
        </div>
    );
};

const styles = {
    card: {
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        margin: "1rem 0",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
    title: {
        marginBottom: "0.5rem",
        fontSize: "1.25rem",
    },
    description: {
        marginBottom: "0.5rem",
    },
    image: {
        width: "100%",
        height: "auto",
        borderRadius: "4px",
        marginBottom: "0.5rem",
    },
    location: {
        marginBottom: "0.25rem",
    },
    status: {
        fontWeight: "bold",
    },
    confidence: {
        fontWeight: "bold",
        color: "#0057b7",
    },
};

export default IssueCard;

import { useState, useEffect } from "react";
import ReportForm from "../components/ReportForm";
import IssueCard from "../components/IssueCard";

const Home = () => {
    const [reports, setReports] = useState([]);

    const fetchReports = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/get-reports");
            const data = await res.json();
            console.log("Fetched Reports:", data);
            setReports(data);
        } catch (err) {
            console.error("Error fetching reports:", err);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleNewReport = (report) => {
        setReports((prev) => [report, ...prev]);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Report an Issue</h2>
            <div style={{ marginBottom: "20px" }}>
                <ReportForm onReportSubmitted={handleNewReport} />
            </div>

            <h2 style={{ ...styles.heading, marginTop: "40px" }}>Reported Issues</h2>

            {reports.length > 0 ? (
                <div style={styles.issueGrid}>
                    {reports.map((report) => (
                        <IssueCard key={report._id || report.id} issue={report} />
                    ))}
                </div>
            ) : (
                <p style={styles.noData}>No issues reported yet.</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: "30px",
        maxWidth: "1000px",
        margin: "0 auto",
        fontFamily: "Segoe UI, sans-serif",
    },
    heading: {
        fontSize: "26px",
        fontWeight: "bold",
        color: "#333",
        borderBottom: "2px solid #ddd",
        paddingBottom: "8px",
    },
    noData: {
        color: "#777",
        marginTop: "20px",
        fontStyle: "italic",
    },
    issueGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "20px",
        marginTop: "20px",
    },
};

export default Home;

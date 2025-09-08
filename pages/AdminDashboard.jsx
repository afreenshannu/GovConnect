import { useState, useEffect } from "react";

const AdminDashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [reports, setReports] = useState([]);

    const ADMIN_PASSWORD = "admin123";

    const fetchReports = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/get-reports");
            const data = await res.json();


            const sortedReports = [...data].reverse();

            setReports(sortedReports);
        } catch (err) {
            console.error("Error fetching reports:", err);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/update-status/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await res.json();
            alert(data.message);
            fetchReports();
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchReports();
        }
    }, [isLoggedIn]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsLoggedIn(true);
        } else {
            alert("Incorrect password!");
        }
    };

    if (!isLoggedIn) {
        return (
            <div style={styles.loginContainer}>
                <h2>🔐 Admin Login</h2>
                <form onSubmit={handleLogin} style={styles.loginForm}>
                    <input
                        type="password"
                        placeholder="Enter Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Login</button>
                </form>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}> Admin Dashboard</h2>
            {reports.length > 0 ? (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report._id}>
                                <td>{report.title}</td>
                                <td>{report.description}</td>
                                <td>{report.location}</td>
                                <td>
                                    {report.image ? (
                                        <img
                                            src={`data:image/jpeg;base64,${report.image}`}
                                            alt="Issue"
                                            style={{ width: "80px", borderRadius: "8px" }}
                                        />
                                    ) : (
                                        <span style={{ color: "gray" }}>No Image</span>
                                    )}
                                </td>
                                <td>
                                    <span
                                        style={{
                                            padding: "5px 10px",
                                            borderRadius: "6px",
                                            background:
                                                report.status === "Completed"
                                                    ? "#28a745"
                                                    : report.status === "In Progress"
                                                        ? "#ffc107"
                                                        : "#dc3545",
                                            color: "white",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {report.status}
                                    </span>
                                </td>
                                <td>
                                    <select
                                        value={report.status}
                                        onChange={(e) => updateStatus(report._id, e.target.value)}
                                        style={styles.dropdown}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No reports found.</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
    },
    dropdown: {
        padding: "5px",
        borderRadius: "5px",
    },
    loginContainer: {
        textAlign: "center",
        marginTop: "100px",
    },
    loginForm: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        marginTop: "20px",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        border: "1px solid gray",
        borderRadius: "5px",
    },
    button: {
        padding: "10px 20px",
        background: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
};

export default AdminDashboard;

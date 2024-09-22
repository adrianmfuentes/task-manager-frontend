import React, { useEffect, useState, useCallback } from "react";
import { backendUrl } from "../Globals";
import { useNavigate } from "react-router-dom";
import { Button, Card, List } from "antd";
import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons"; 
import { formatDate } from "../Utils";

const TasksComp = ({ createNotification }) => {
    const [tasks, setTasks] = useState([]); // State to hold tasks
    const [messageText, setMessageText] = useState(""); // State for error messages
    const navigate = useNavigate(); // Hook for navigation

    // Fetch tasks from backend
    const getItems = useCallback(async () => {
        try {
            const response = await fetch(`${backendUrl}/tasks?apiKey=${localStorage.getItem("apiKey")}`);
            if (response.status === 401) {
                navigate("/login");
                return;
            }

            if (response.ok) {
                const jsonData = await response.json();
                setTasks(jsonData); // Update tasks state
            } else {
                const jsonData = await response.json();
                setMessageText(jsonData.error);
            }
        } catch (error) {
            setMessageText("Failed to fetch tasks. Please try again.");
        }
    }, [navigate]);

    useEffect(() => {
        getItems(); // Fetch tasks on component mount
    }, [getItems]);

    // Navigate to edit task page
    const moveToEditTask = (id) => {
        navigate(`/task/edit/${id}`);
    };

    // Delete task
    const deleteTask = async (id) => {
        try {
            const res = await fetch(`${backendUrl}/tasks/${id}?apiKey=${localStorage.getItem("apiKey")}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
                createNotification("success", "Task deleted");
                setMessageText(""); 
            } else {
                const jsonData = await res.json();
                setMessageText(jsonData.error || "Failed to delete task. Please try again.");
            }
        } catch (error) {
            setMessageText("Failed to delete task. Please try again.");
        }
    };

    // Complete task
    const completeTask = async (id) => {
        try {
            const res = await fetch(`${backendUrl}/tasks/${id}?apiKey=${localStorage.getItem("apiKey")}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "completed" }),
            });

            if (res.ok) {
                createNotification("success", "Task marked as completed");
                getItems(); // Refresh tasks list
            } else {
                const jsonData = await res.json();
                setMessageText(jsonData.error);
            }
        } catch (error) {
            setMessageText("Failed to mark task as completed. Please try again.");
        }
    };

    return (
        <div role="main" style={{ padding: "10px" }}>
            {/* Accessible header */}
            <Card
                style={{
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    backgroundColor: "#f0f2f5",
                }}
                tabIndex={0} // Ensure keyboard navigation
                aria-label="Task List Header"
            >
                My Tasks
            </Card>

            {/* Accessible error message */}
            {messageText && <h3 aria-live="assertive" style={{ color: "red" }}>{messageText}</h3>}

            {/* Responsive task list */}
            <List
                grid={{
                    gutter: 16,
                    xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 4, 
                }}
                dataSource={tasks}
                renderItem={(task) => (
                    <List.Item>
                        <Card
                            hoverable
                            title={task.title}
                            aria-label={`Task: ${task.title}`}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                minHeight: "260px",
                                padding: "16px",
                                backgroundColor: "#ffffff",
                                borderRadius: "8px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            {/* Description */}
                            <p style={{ color: "#555", marginBottom: "10px" }}>
                                <strong>Description:</strong> {task.description}
                            </p>

                            {/* Due date */}
                            <p style={{ fontWeight: "bold", color: "#888" }}>
                                <strong>Due Date:</strong> {formatDate(task.dateFinish)}
                            </p>

                            {/* Action buttons */}
                            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
                                <Button
                                    onClick={() => completeTask(task.id)}
                                    type="primary"
                                    icon={<CheckOutlined />}
                                    aria-label={`Mark ${task.title} as completed`}
                                    style={{ flex: 1, marginRight: "8px" }}
                                >
                                    Complete
                                </Button>
                                <Button
                                    onClick={() => moveToEditTask(task.id)}
                                    icon={<EditOutlined />}
                                    aria-label={`Edit ${task.title}`}
                                    style={{ flex: 1, marginRight: "8px" }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => deleteTask(task.id)}
                                    icon={<DeleteOutlined />}
                                    danger
                                    aria-label={`Delete ${task.title}`}
                                    style={{ flex: 1 }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default React.memo(TasksComp); // Memoization to prevent unnecessary re-renders

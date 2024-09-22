import React, { useEffect, useState, useCallback } from "react";
import { backendUrl } from "../Globals";
import { formatDate } from "../Utils";
import { useNavigate } from "react-router-dom";
import { Button, Card, List, Checkbox, message } from "antd";
import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";

const ProjectsComp = ({ createNotification }) => {
    const [projects, setProjects] = useState([]); // State to hold the projects
    const [messageText, setMessageText] = useState(""); // State for error messages
    const navigate = useNavigate(); // Hook for navigation

    const getItems = useCallback(async () => {
        try {
            const response = await fetch(`${backendUrl}/projects?apiKey=${localStorage.getItem("apiKey")}`);
            if (response.status === 401) {
                navigate("/login");
                return;
            }
            if (response.ok) {
                const jsonData = await response.json();
                setProjects(jsonData); // Update the projects state
            } else {
                const jsonData = await response.json();
                setMessageText(jsonData.error);
            }
        } catch (error) {
            setMessageText("Failed to fetch projects. Please try again.");
        }
    }, [navigate]);

    const markSubtaskComplete = async (subtaskId, projectId, currentSubtask) => {
        const updatedSubtask = {
            ...currentSubtask,
            completed: !currentSubtask.completed // Toggle completion status
        };
    
        try {
            const response = await fetch(`${backendUrl}/subtasks/${projectId}/subtasks/${subtaskId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "apiKey": localStorage.getItem("apiKey")
                },
                body: JSON.stringify(updatedSubtask), // Send updated subtask
            });
    
            if (response.ok) {
                message.success(`Subtask marked as ${updatedSubtask.completed ? 'completed' : 'incomplete'}`);
                getItems(); // Refresh the list after update
            } else {
                const jsonData = await response.json();
                setMessageText(jsonData.error);
            }
        } catch (error) {
            setMessageText("Failed to update subtask. Please try again.");
        }
    };
    
    useEffect(() => {
        getItems(); // Fetch projects on component mount
    }, [getItems]);

    // Navigate to edit project page
    const editProject = (id) => {
        navigate(`/project/edit/${id}`);
    };

    // Delete project
    const deleteProject = async (id) => {
        try {
            const res = await fetch(`${backendUrl}/projects/${id}?apiKey=${localStorage.getItem("apiKey")}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
                createNotification("success", "Project deleted");
                setMessageText(""); 
            } else {
                const jsonData = await res.json();
                setMessageText(jsonData.error || "Failed to delete project. Please try again.");
            }
        } catch (error) {
            setMessageText("Failed to delete project. Please try again.");
        }
    };

    // Complete project
    const completeProject = async (id) => {
        try {
            const res = await fetch(`${backendUrl}/projects/${id}?apiKey=${localStorage.getItem("apiKey")}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "completed" }),
            });

            if (res.ok) {
                createNotification("success", "Project marked as completed");
                getItems(); // Refresh the projects list
            } else {
                const jsonData = await res.json();
                setMessageText(jsonData.error);
            }
        } catch (error) {
            setMessageText("Failed to mark project as completed. Please try again.");
        }
    };

    return (
        <div role="main" style={{ padding: "10px" }}>
            <Card
                style={{
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    backgroundColor: "#f0f2f5",
                }}
                tabIndex={0}
                aria-label="Project List Header"
            >
                My Projects
            </Card>

            {messageText && <h3 aria-live="assertive" style={{ color: "red" }}>{messageText}</h3>}

            <List
                grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
                dataSource={projects}
                renderItem={(project) => (
                    <List.Item>
                        <Card
                            hoverable
                            title={project.name}
                            aria-label={`Project: ${project.name}`}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                padding: "16px",
                                backgroundColor: "#ffffff",
                                borderRadius: "8px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <p style={{ color: "#555", marginBottom: "10px" }}>
                                <strong>Description:</strong> {project.description}
                            </p>
                            <p style={{ fontWeight: "bold", color: "#888" }}>
                                <strong>Due Date:</strong> {formatDate(project.dateFinish)}
                            </p>

                            <List
                                size="small"
                                bordered
                                dataSource={project.subtasks}
                                renderItem={(subtask) => (
                                    <List.Item>
                                        <Checkbox
                                            onChange={() => markSubtaskComplete(subtask.id, project.id, subtask)}
                                            checked={subtask.completed}
                                        >
                                            <span style={{ textDecoration: subtask.completed ? 'line-through' : 'none' }}>
                                                {subtask.task}
                                            </span>
                                        </Checkbox>
                                    </List.Item>
                                )}
                                style={{ marginTop: "10px" }}
                            />

                            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
                                {/* Complete project Button */}
                                <Button
                                    onClick={() => completeProject(project.id)}
                                    type="primary"
                                    icon={<CheckOutlined />}
                                    aria-label={`Mark ${project.name} as completed`}
                                    style={{ flex: 1, marginRight: "8px" }}
                                >
                                    Complete
                                </Button>

                                {/* Edit project Button */}
                                <Button
                                    onClick={() => editProject(project.id)}
                                    icon={<EditOutlined />}
                                    aria-label={`Edit ${project.name}`}
                                    style={{ flex: 1, marginRight: "8px" }}
                                >
                                    Edit
                                </Button>

                                {/* Delete project Button */}
                                <Button
                                    onClick={() => deleteProject(project.id)}
                                    icon={<DeleteOutlined />}
                                    danger
                                    aria-label={`Delete ${project.name}`}
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

export default React.memo(ProjectsComp);

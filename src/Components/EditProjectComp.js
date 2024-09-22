import React, { useState, useEffect, useCallback } from "react";
import { backendUrl } from "../Globals";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Col, Input, Row, List, DatePicker, Typography } from "antd";
import dayjs from "dayjs";
import { isEmpty } from "lodash";

const { Text } = Typography;

const EditProjectComp = ({ createNotification }) => {
    const { projectId } = useParams(); // Get project ID from URL
    const [project, setProject] = useState({ name: "", description: "", finishDate: null, subtasks: [] });
    const [message, setMessage] = useState("");
    const [error, setError] = useState({});
    const [touched, setTouched] = useState({});
    const navigate = useNavigate();

    // Fetch project details by ID
    const fetchProject = useCallback(async () => {
        try {
            const response = await fetch(`${backendUrl}/projects/${projectId}?apiKey=${localStorage.getItem("apiKey")}`);
            if (response.ok) {
                const data = await response.json();
                setProject({
                    name: data.title || "",
                    description: data.description || "",
                    finishDate: data.finishDate ? dayjs(data.finishDate) : null, 
                    subtasks: data.subtasks || []
                });
            } else {
                setMessage("Error fetching project details.");
            }
        } catch (error) {
            setMessage("Failed to fetch project data.");
        }
    }, [projectId]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    // Validate input fields
    const checkInputErrors = useCallback(() => {
        const updatedErrors = {};
        if (touched.name && (!project.name || project.name.length < 2)) {
            updatedErrors.name = "Project name is too short.";
        }
        if (touched.description && (!project.description || project.description.length < 5)) {
            updatedErrors.description = "Project description is too short.";
        }
        if (touched.finishDate) {
            if (project.finishDate && !dayjs.isDayjs(project.finishDate)) {
                updatedErrors.finishDate = "Invalid due date.";
            } else if (project.finishDate && project.finishDate.isBefore(dayjs())) {
                updatedErrors.finishDate = "Project due date must be in the future.";
            }
        }
        setError(updatedErrors);
    }, [project, touched]);

    useEffect(() => {
        checkInputErrors();
    }, [project, checkInputErrors]);

    // Change project property
    const changeProperty = (propertyName, value) => {
        setProject((prevProject) => ({
            ...prevProject,
            [propertyName]: value,
        }));
        setTouched((prevTouched) => ({
            ...prevTouched,
            [propertyName]: true,
        }));
    };

    // Change due date
    const changeDate = (date) => {
        setProject((prevProject) => ({
            ...prevProject,
            finishDate: date ? date.valueOf() : null,
        }));
        setTouched((prevTouched) => ({ ...prevTouched, finishDate: true }));
    };

    // Change subtask
    const changeSubtask = (index, value) => {
        const updatedSubtasks = [...project.subtasks];
        updatedSubtasks[index].task = value;
        setProject((prevProject) => ({
            ...prevProject,
            subtasks: updatedSubtasks,
        }));
    };

    // Add a new subtask
    const addSubtask = () => {
        setProject((prevProject) => ({
            ...prevProject,
            subtasks: [...prevProject.subtasks, { task: "", created_at: null }],
        }));
    };

    // Handle project edit
    const clickEdit = async () => {
        if (isEmpty(error)) {
            try {
                const projectToSend = {
                    ...project,
                    finishDate: project.finishDate ? dayjs(project.finishDate).format('YYYY-MM-DD HH:mm:ss') : null
                };

                const res = await fetch(`${backendUrl}/projects/${projectId}?apiKey=${localStorage.getItem("apiKey")}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(projectToSend),
                });

                if (res.ok) {
                    createNotification("success", "Project updated successfully!");
                    navigate("/myProjects");
                } else {
                    const jsonData = await res.json();
                    setMessage(jsonData.error || "Failed to update project");
                }
            } catch {
                setMessage("Error occurred while updating project. Please try again.");
            }
        } else {
            setMessage("Please correct the highlighted errors.");
        }
    };

    // Button disable condition
    const isButtonDisabled = !project.name || !project.finishDate || !isEmpty(error);

    return (
        <Row align="middle" justify="center" style={{ minHeight: "70vh", padding: "10px" }}>
            {message && <Alert type="error" message={message} style={{ marginBottom: "10px" }} />}

            <Col xs={24} sm={20} md={16} lg={12}>
                <Card title="Edit Project" bordered={false}>
                    
                    {/* Project Name Input */}
                    <Input
                        size="large"
                        placeholder="Project name"
                        value={project.name}
                        onChange={(e) => changeProperty("name", e.target.value)}
                        aria-label="Project Name"
                    />
                    {error.name && <Text type="danger">{error.name}</Text>}

                    {/* Project Description Input */}
                    <Input.TextArea
                        style={{ marginTop: "10px" }}
                        size="large"
                        placeholder="Project Description"
                        value={project.description}
                        onChange={(e) => changeProperty("description", e.target.value)}
                        aria-label="Project Description"
                    />
                    {error.description && <Text type="danger">{error.description}</Text>}

                    {/* Due Date Picker */}
                    <DatePicker
                        style={{ marginTop: "10px", width: "100%" }}
                        size="large"
                        showTime
                        value={project.finishDate ? project.finishDate : null}
                        onChange={changeDate}
                        aria-label="Project Due Date"
                    />
                    {error.finishDate && <Text type="danger">{error.finishDate}</Text>}

                    {/* Subtasks */}
                    <List
                        bordered
                        dataSource={project.subtasks}
                        renderItem={(subtask, index) => (
                            <List.Item key={index}>
                                <Input
                                    placeholder={`Subtask ${index + 1}`}
                                    value={subtask.task}
                                    onChange={(e) => changeSubtask(index, e.target.value)}
                                    style={{ width: "100%" }}
                                    aria-label={`Subtask ${index + 1}`}
                                />
                            </List.Item>
                        )}
                        style={{ marginTop: "10px" }}
                    />

                    {/* Add Subtask Button */}
                    <Button
                        type="dashed"
                        onClick={addSubtask}
                        style={{ marginTop: "10px", width: "100%" }}
                    >
                        Add Subtask
                    </Button>

                    {/* Edit Project Button */}
                    <Button
                        style={{ marginTop: "10px" }}
                        type="primary"
                        onClick={clickEdit}
                        block
                        disabled={isButtonDisabled}
                    >
                        Edit Project
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default React.memo(EditProjectComp);

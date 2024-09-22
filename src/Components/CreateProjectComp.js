import React, { useEffect, useState, useCallback } from "react";
import { backendUrl } from "../Globals";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import { Alert, Button, Card, Col, Input, Row, Typography, List, DatePicker } from "antd";

const { Text } = Typography;

const CreateProjectComp = ({ createNotification }) => {
    const [message, setMessage] = useState(""); // State for feedback messages
    const [project, setProject] = useState({
        title: "",
        description: "",
        dateFinish: null,
        subtasks: [],
    }); // Initial state for project data
    const [error, setError] = useState({}); // State for input validation errors
    const [touched, setTouched] = useState({}); // State to track if the input has been modified by the user
    const navigate = useNavigate();

    // Memoize the validation function to prevent unnecessary re-renders
    const checkInputErrors = useCallback(() => {
        const updatedErrors = {};

        // Validate project title
        if (touched.title && (!project.title || project.title.length < 2)) {
            updatedErrors.title = "Project name is too short or missing.";
        }

        // Validate project description
        if (touched.description && (!project.description || project.description.length < 5)) {
            updatedErrors.description = "Project description is too short.";
        }

        // Validate due date
        if (project.dateFinish && project.dateFinish < Date.now()) {
            updatedErrors.dateFinish = "Project due date must be in the future.";
        }

        setError(updatedErrors);
    }, [project, touched]);

    // Effect to validate inputs on project state change
    useEffect(() => {
        checkInputErrors();
    }, [project, checkInputErrors]);

    // Update project properties
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

    // Handle date changes from DatePicker
    const changeDate = (date) => {
        setProject((prevProject) => ({
            ...prevProject,
            dateFinish: date ? date.valueOf() : null,
        }));

        setTouched((prevTouched) => ({
            ...prevTouched,
            dateFinish: true,
        }));
    };

    // Add a new subtask
    const addSubtask = () => {
        setProject((prevProject) => ({
            ...prevProject,
            subtasks: [...prevProject.subtasks, { task: "", created_at: null }],
        }));
    };

    // Update a subtask's value
    const changeSubtask = (index, value) => {
        const updatedSubtasks = [...project.subtasks];
        updatedSubtasks[index].task = value;

        setProject((prevProject) => ({
            ...prevProject,
            subtasks: updatedSubtasks,
        }));
    };

    // Check if the create button should be disabled
    const checkButtonDisabled = () => {
        return !project.title || !project.dateFinish || !isEmpty(error);
    };

    // Handle project creation
    const clickCreate = async () => {
        if (isEmpty(error)) {
            try {
                const res = await fetch(`${backendUrl}/projects?apiKey=${localStorage.getItem("apiKey")}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(project),
                });

                if (res.ok) {
                    createNotification("success", "Project created successfully");
                    navigate("/myProjects");
                } else {
                    const jsonData = await res.json();
                    setMessage(jsonData.error);
                }
            } catch {
                setMessage("Error creating project. Please try again.");
            }
        } else {
            setMessage("Cannot submit. Please fix input errors.");
        }
    };

    return (
        <Row align="middle" justify="center" style={{ minHeight: "70vh", padding: "10px" }}>
            {message && <Alert type="error" message={message} style={{ marginBottom: "10px" }} />} {/* Error or success message */}

            <Col xs={24} sm={20} md={16} lg={12}>
                <Card title="Create Project" bordered={false}>

                    {/* Project Title */}
                    <Input
                        size="large"
                        type="text"
                        placeholder="Project Title"
                        value={project.title} // Fix the property name
                        onChange={(e) => changeProperty("title", e.target.value)}
                        aria-label="Project Title"
                        required // Mark as required for accessibility
                    />
                    {error.title && <Text type="danger">{error.title}</Text>} {/* Display error message if exists */}

                    {/* Project Description */}
                    <Input.TextArea
                        style={{ marginTop: "10px" }}
                        size="large"
                        placeholder="Project Description"
                        value={project.description}
                        onChange={(e) => changeProperty("description", e.target.value)}
                        aria-label="Project Description"
                        required // Mark as required for accessibility
                    />
                    {error.description && <Text type="danger">{error.description}</Text>} {/* Display error message if exists */}

                    {/* Due Date Picker */}
                    <DatePicker
                        style={{ marginTop: "10px", width: "100%" }}
                        size="large"
                        showTime
                        placeholder="Select due date"
                        onChange={changeDate}
                        aria-label="Project Due Date"
                    />
                    {error.dateFinish && <Text type="danger">{error.dateFinish}</Text>} {/* Display error message if exists */}

                    {/* Add Subtask Button */}
                    <Button
                        type="dashed"
                        onClick={addSubtask}
                        style={{ marginTop: "10px", width: "100%" }}
                    >
                        Add Subtask
                    </Button>

                    {/* Subtasks List */}
                    <List
                        bordered
                        dataSource={project.subtasks}
                        renderItem={(subtask, index) => (
                            <List.Item key={index}>
                                <Input                      
                                    placeholder={`Subtask ${index + 1}`}
                                    value={subtask.task}  
                                    onChange={(e) => changeSubtask(index, e.target.value)}  
                                    aria-label={`Subtask ${index + 1}`}
                                    style={{ width: '100%', marginRight: '10px' }}
                                />
                            </List.Item>
                        )}
                        style={{ marginTop: "10px" }}
                    />

                    {/* Create Project Button */}
                    <Button
                        style={{ marginTop: "10px" }}
                        type="primary"
                        onClick={clickCreate}
                        block
                        disabled={checkButtonDisabled()} // Disable button if validation fails
                    >
                        Create Project
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default React.memo(CreateProjectComp);

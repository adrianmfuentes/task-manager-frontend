import React, { useEffect, useState, useCallback } from "react";
import { backendUrl } from "../Globals";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { isEmpty } from "lodash";
import { Alert, Button, Card, Col, Input, Row, Typography, List, DatePicker } from "antd";

const { Text } = Typography;

const CreateProjectComp = ({ createNotification }) => {
    // Hook for translation using i18next
    const { t } = useTranslation();

    // State to manage form messages (feedback)
    const [message, setMessage] = useState("");

    // Initial state to manage the project form inputs
    const [project, setProject] = useState({
        title: "",
        description: "",
        dateFinish: null,
        subtasks: [],
    });

    // State to track validation errors
    const [error, setError] = useState({});

    // State to track if the user has touched/modified the input fields
    const [touched, setTouched] = useState({});

    const navigate = useNavigate();

    // Validation logic, memoized to avoid unnecessary recalculations on re-renders
    const checkInputErrors = useCallback(() => {
        const updatedErrors = {};

        // Validate project title: should not be empty or too short
        if (touched.title && (!project.title || project.title.length < 2)) {
            updatedErrors.title = t("errorTitle"); // Use translation for error message
        }

        // Validate project description: should have minimum length
        if (touched.description && (!project.description || project.description.length < 5)) {
            updatedErrors.description = t("errorDescription");
        }

        // Validate due date: must be in the future
        if (project.dateFinish && project.dateFinish < Date.now()) {
            updatedErrors.dateFinish = t("errorDateFinish");
        }

        setError(updatedErrors);
    }, [project, touched, t]);

    // Trigger validation whenever project data changes
    useEffect(() => {
        checkInputErrors();
    }, [project, checkInputErrors]);

    // Handle changes in the project fields (title, description, etc.)
    const changeProperty = (propertyName, value) => {
        setProject((prevProject) => ({
            ...prevProject,
            [propertyName]: value,
        }));

        // Mark field as "touched" to enable validation on blur/change
        setTouched((prevTouched) => ({
            ...prevTouched,
            [propertyName]: true,
        }));
    };

    // Handle date picker input changes
    const changeDate = (date) => {
        setProject((prevProject) => ({
            ...prevProject,
            dateFinish: date ? date.valueOf() : null, // Store date as a timestamp
        }));

        setTouched((prevTouched) => ({
            ...prevTouched,
            dateFinish: true,
        }));
    };

    // Add an empty subtask to the subtasks array
    const addSubtask = () => {
        setProject((prevProject) => ({
            ...prevProject,
            subtasks: [...prevProject.subtasks, { task: "", created_at: null }],
        }));
    };

    // Update the value of a specific subtask by index
    const changeSubtask = (index, value) => {
        const updatedSubtasks = [...project.subtasks];
        updatedSubtasks[index].task = value;

        setProject((prevProject) => ({
            ...prevProject,
            subtasks: updatedSubtasks,
        }));
    };

    // Check if the form submission button should be disabled
    const checkButtonDisabled = () => {
        return !project.title || !project.dateFinish || !isEmpty(error);
    };

    // Handle project creation on form submission
    const clickCreate = async () => {
        // Ensure there are no validation errors before proceeding
        if (isEmpty(error)) {
            try {
                // Make an API request to create a project
                const res = await fetch(`${backendUrl}/projects?apiKey=${localStorage.getItem("apiKey")}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(project),
                });

                if (res.ok) {
                    // Notify user of successful creation and redirect to projects page
                    createNotification("success", t("projectCreated"));
                    navigate("/myProjects");
                } else {
                    // Display any backend errors received from the API
                    const jsonData = await res.json();
                    setMessage(jsonData.error);
                }
            } catch {
                // Handle network or server errors
                setMessage(t("errorCreatingProject"));
            }
        } else {
            // If validation errors exist, prevent submission
            setMessage(t("fixErrorsMessage"));
        }
    };

    return (
        <Row align="middle" justify="center" style={{ minHeight: "70vh", padding: "10px" }}>
            {/* Display feedback message for errors or success */}
            {message && <Alert type="error" message={message} style={{ marginBottom: "10px" }} />}

            <Col xs={24} sm={20} md={16} lg={12}>
                <Card title={t("createProject")} bordered={false}>
                    {/* Project Title input field */}
                    <Input
                        size="large"
                        type="text"
                        placeholder={t("projectTitle")}
                        value={project.title}
                        onChange={(e) => changeProperty("title", e.target.value)}
                        aria-label={t("projectTitle")}
                        required
                    />
                    {error.title && <Text type="danger">{error.title}</Text>} {/* Display error if title is invalid */}

                    {/* Project Description input field */}
                    <Input.TextArea
                        style={{ marginTop: "10px" }}
                        size="large"
                        placeholder={t("projectDescription")}
                        value={project.description}
                        onChange={(e) => changeProperty("description", e.target.value)}
                        aria-label={t("projectDescription")}
                        required
                    />
                    {error.description && <Text type="danger">{error.description}</Text>} {/* Display error if description is invalid */}

                    {/* Due Date picker input */}
                    <DatePicker
                        style={{ marginTop: "10px", width: "100%" }}
                        size="large"
                        showTime
                        placeholder={t("selectDueDate")}
                        onChange={changeDate}
                        aria-label={t("projectDueDate")}
                    />
                    {error.dateFinish && <Text type="danger">{error.dateFinish}</Text>} {/* Display error if date is invalid */}

                    {/* Button to add a new subtask */}
                    <Button
                        type="dashed"
                        onClick={addSubtask}
                        style={{ marginTop: "10px", width: "100%" }}
                    >
                        {t("addSubtask")}
                    </Button>

                    {/* Render the list of subtasks */}
                    <List
                        bordered
                        dataSource={project.subtasks}
                        renderItem={(subtask, index) => (
                            <List.Item key={index}>
                                <Input
                                    placeholder={`${t("subtask")} ${index + 1}`}
                                    value={subtask.task}
                                    onChange={(e) => changeSubtask(index, e.target.value)}
                                    aria-label={`${t("subtask")} ${index + 1}`}
                                    style={{ width: '100%', marginRight: '10px' }}
                                />
                            </List.Item>
                        )}
                        style={{ marginTop: "10px" }}
                    />

                    {/* Button to submit the form and create the project */}
                    <Button
                        style={{ marginTop: "10px" }}
                        type="primary"
                        onClick={clickCreate}
                        block
                        disabled={checkButtonDisabled()} // Disable the button if validation fails
                    >
                        {t("createProject")}
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default React.memo(CreateProjectComp);

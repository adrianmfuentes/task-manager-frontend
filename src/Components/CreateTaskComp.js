import React, { useEffect, useState, useCallback } from "react";
import { backendUrl } from "../Globals";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Col, DatePicker, Input, Row, Select, Typography } from "antd";
import { useTranslation } from 'react-i18next';

const { Option } = Select;
const { Text } = Typography;

const CreateTaskComp = ({ createNotification }) => {
    // Hook for translation using i18next
    const { t } = useTranslation();

    // State for feedback messages
    const [message, setMessage] = useState("");

    // State for task data
    const [task, setTask] = useState({
        title: "",
        description: "",
        priority: "medium",
        dateFinish: null,
    });

    // State for input validation errors
    const [error, setError] = useState({});

    // Track fields user has interacted with
    const [touched, setTouched] = useState({});

    const navigate = useNavigate();

    // Function to validate inputs
    const checkInputErrors = useCallback(() => {
        let updatedErrors = {};

        // Validate task title
        if (touched.title && (!task.title || task.title.length < 2)) {
            updatedErrors.name = t("errorTitle"); // Use translation for error message
        }

        // Validate task description
        if (touched.description && (!task.description || task.description.length < 5)) {
            updatedErrors.description = t("errorDescription");
        }

        // Validate task finish date
        if (touched.dateFinish && task.dateFinish && task.dateFinish < Date.now()) {
            updatedErrors.dateFinish = t("errorDateFinish");
        }

        setError(updatedErrors);
    }, [task, touched, t]);

    // useEffect to trigger validation on task state change
    useEffect(() => {
        checkInputErrors();
    }, [task, checkInputErrors]);

    // Update task properties and mark them as "touched"
    const changeProperty = (propertyName, value) => {
        setTask((prevTask) => ({ ...prevTask, [propertyName]: value }));
        setTouched((prevTouched) => ({ ...prevTouched, [propertyName]: true }));
    };

    // Handle date changes from DatePicker
    const changeDate = (date) => { 
        setTask((prevTask) => ({
            ...prevTask,
            dateFinish: date ? date.valueOf() : null // Store as timestamp
        }));
        setTouched((prevTouched) => ({ ...prevTouched, dateFinish: true }));
    };

    // Handle task creation
    const clickCreate = async () => {
        if (Object.keys(error).length === 0) {
            try {
                const res = await fetch(`${backendUrl}/tasks?apiKey=${localStorage.getItem("apiKey")}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(task),
                });

                if (res.ok) {
                    createNotification("success", t("taskCreated")); // Use translation for success message
                    navigate("/myTasks");
                } else {
                    const jsonData = await res.json();
                    setMessage(jsonData.error || t("errorCreatingTask"));
                }
            } catch {
                setMessage(t("errorCreatingTask"));
            }
        } else {
            setMessage(t("fixErrorsMessage"));
        }
    };

    // Check if the Create Task button should be disabled
    const isButtonDisabled = !task.title || !task.dateFinish || Object.keys(error).length > 0;

    return (
        <Row align="middle" justify="center" style={{ minHeight: "70vh", padding: "10px" }}>
            {/* Display feedback message for errors or success */}
            {message && <Alert type="error" message={message} style={{ marginBottom: "10px" }} />}

            <Col xs={24} sm={20} md={16} lg={12}>
                <Card title={t("createTask")} bordered={false}>

                    {/* Task Title Input */}
                    <Input
                        size="large"
                        placeholder={t("taskTitle")}
                        aria-label={t("taskTitle")}
                        value={task.title}
                        onChange={(e) => changeProperty("title", e.target.value)}
                        required // Mark as required for accessibility
                    />
                    {error.name && <Text type="danger">{error.name}</Text>}

                    {/* Task Description Input */}
                    <Input.TextArea
                        style={{ marginTop: "10px" }}
                        size="large"
                        placeholder={t("taskDescription")}
                        aria-label={t("taskDescription")}
                        value={task.description}
                        onChange={(e) => changeProperty("description", e.target.value)}
                        required // Mark as required for accessibility
                    />
                    {error.description && <Text type="danger">{error.description}</Text>}

                    {/* Task Priority Select */}
                    <Select
                        style={{ marginTop: "10px", width: "100%" }}
                        size="large"
                        placeholder={t("selectPriority")}
                        aria-label={t("taskPriority")}
                        value={task.priority}
                        onChange={(value) => changeProperty("priority", value)}
                    >
                        <Option value="low">{t("low")}</Option>
                        <Option value="medium">{t("medium")}</Option>
                        <Option value="high">{t("high")}</Option>
                    </Select>

                    {/* Due Date Picker */}
                    <DatePicker
                        style={{ marginTop: "10px", width: "100%" }}
                        size="large"
                        showTime
                        placeholder={t("selectDueDate")}
                        onChange={changeDate}
                        aria-label={t("taskDueDate")}
                    />
                    {error.dateFinish && <Text type="danger">{error.dateFinish}</Text>}

                    {/* Create Task Button */}
                    <Button
                        style={{ marginTop: "10px" }}
                        type="primary"
                        aria-label={t("createTask")}
                        onClick={clickCreate}
                        block
                        disabled={isButtonDisabled}
                    >
                        {t("createTask")}
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default React.memo(CreateTaskComp);

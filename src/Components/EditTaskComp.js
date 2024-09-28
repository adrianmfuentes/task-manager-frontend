import dayjs from "dayjs";
import React, { useEffect, useState, useCallback } from "react";
import { backendUrl } from "../Globals";
import { Alert, Button, Card, Col, DatePicker, Input, Row, Select, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const { Option } = Select;
const { Text } = Typography;

const EditTaskComp = ({ createNotification }) => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation(); // Use translation hook

    // State variables for task data, messages, errors, and touched fields
    const [task, setTask] = useState({ title: "", description: "", priority: "medium", dateFinish: null });
    const [message, setMessage] = useState("");
    const [error, setError] = useState({});
    const [touched, setTouched] = useState({});

    // Fetch task details based on taskId
    const fetchTask = useCallback(async () => {
        try {
            const response = await fetch(`${backendUrl}/tasks/${taskId}?apiKey=${localStorage.getItem("apiKey")}`);
            if (response.ok) {
                const data = await response.json();
                setTask({
                    title: data.title || "",
                    description: data.description || "",
                    priority: data.priority || "medium",
                    dateFinish: data.dateFinish ? dayjs(data.dateFinish) : null,
                });
            } else {
                setMessage(t("errorFetchingTask")); // Update to use translation
            }
        } catch {
            setMessage(t("failedToFetchTaskData")); // Update to use translation
        }
    }, [taskId, t]);

    useEffect(() => {
        fetchTask();
    }, [fetchTask]);

    // Validate input fields
    const checkInputErrors = useCallback(() => {
        const updatedErrors = {};
        if (touched.title && (!task.title || task.title.length < 2)) {
            updatedErrors.title = t("taskErrorTitle"); // Update to use translation
        }
        if (touched.description && (!task.description || task.description.length < 5)) {
            updatedErrors.description = t("taskErrorDescription"); // Update to use translation
        }
        if (touched.dateFinish && task.dateFinish && task.dateFinish.isBefore(dayjs())) {
            updatedErrors.dateFinish = t("taskErrorDateFinish"); // Update to use translation
        }

        setError(updatedErrors);
    }, [task, touched, t]);

    useEffect(() => {
        checkInputErrors();
    }, [task, checkInputErrors]);

    // Update task property
    const changeProperty = (propertyName, value) => {
        setTask((prevTask) => ({ ...prevTask, [propertyName]: value }));
        setTouched((prevTouched) => ({ ...prevTouched, [propertyName]: true }));
    };

    // Update finish date
    const changeDate = (date) => {
        setTask((prevTask) => ({
            ...prevTask,
            dateFinish: date ? date.valueOf() : null, // Store as timestamp
        }));
        setTouched((prevTouched) => ({ ...prevTouched, dateFinish: true }));
    };

    // Handle task update
    const clickEdit = async () => {
        if (Object.keys(error).length === 0) {
            try {
                const taskToSend = {
                    ...task,
                    dateFinish: task.dateFinish ? dayjs(task.dateFinish).format('YYYY-MM-DD HH:mm:ss') : null,
                };

                const res = await fetch(`${backendUrl}/tasks/${taskId}?apiKey=${localStorage.getItem("apiKey")}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(taskToSend),
                });

                if (res.ok) {
                    createNotification("success", t("taskUpdatedSuccessfully")); // Update to use translation
                    navigate("/myTasks");
                } else {
                    const jsonData = await res.json();
                    setMessage(jsonData.error || t("failedToUpdateTask")); // Update to use translation
                }
            } catch {
                setMessage(t("errorUpdatingTask")); // Update to use translation
            }
        } else {
            setMessage(t("fixErrorsMessage")); // Update to use translation
        }
    };

    const isButtonDisabled = !task.title || !task.dateFinish || Object.keys(error).length > 0;

    return (
        <Row align="middle" justify="center" style={{ minHeight: "70vh", padding: "10px" }}>
            {message && <Alert type="error" message={message} style={{ marginBottom: "10px" }} />}

            <Col xs={24} sm={20} md={16} lg={12}>
                <Card title={t("editTask")} bordered={false}>
                    
                    {/* Task Title Input */}
                    <Input
                        size="large"
                        placeholder={t("taskTitle")}
                        value={task.title}
                        onChange={(e) => changeProperty("title", e.target.value)}
                        aria-label="Task Title"
                    />
                    {error.title && <Text type="danger">{error.title}</Text>}

                    {/* Task Description Input */}
                    <Input.TextArea
                        style={{ marginTop: "10px" }}
                        size="large"
                        placeholder={t("taskDescription")}
                        value={task.description}
                        onChange={(e) => changeProperty("description", e.target.value)}
                        aria-label="Task Description"
                    />
                    {error.description && <Text type="danger">{error.description}</Text>}

                    {/* Task Priority Select */}
                    <Select
                        style={{ marginTop: "10px", width: "100%" }}
                        size="large"
                        value={task.priority}
                        onChange={(value) => changeProperty("priority", value)}
                        aria-label="Task Priority"
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
                        value={task.dateFinish ? task.dateFinish : null}
                        onChange={changeDate}
                        aria-label="Due Date"
                    />
                    {error.dateFinish && <Text type="danger">{error.dateFinish}</Text>}

                    {/* Edit Task Button */}
                    <Button
                        style={{ marginTop: "10px" }}
                        type="primary"
                        onClick={clickEdit}
                        block
                        disabled={isButtonDisabled}
                    >
                        {t("editTask")} {/* Use translation for button label */}
                    </Button>
                </Card>
            </Col>
        </Row>
    );
}

export default React.memo(EditTaskComp);

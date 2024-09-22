import dayjs from "dayjs";
import React, { useEffect, useState, useCallback } from "react";
import { backendUrl } from "../Globals";
import { Alert, Button, Card, Col, DatePicker, Input, Row, Select, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;
const { Text } = Typography;

const EditTaskComp = ({ createNotification }) => {
    const { taskId } = useParams();
    const navigate = useNavigate();

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
                setMessage("Error retrieving task details.");
            }
        } catch {
            setMessage("Failed to fetch task data.");
        }
    }, [taskId]);

    useEffect(() => {
        fetchTask();
    }, [fetchTask]);

    // Validate input fields
    const checkInputErrors = useCallback(() => {
        const updatedErrors = {};
        if (touched.title && (!task.title || task.title.length < 2)) {
            updatedErrors.title = "Task title is too short.";
        }
        if (touched.description && (!task.description || task.description.length < 5)) {
            updatedErrors.description = "Task description is too short.";
        }
        if (touched.dateFinish && task.dateFinish && task.dateFinish.isBefore(dayjs())) {
            updatedErrors.dateFinish = "Due date must be in the future.";
        }

        setError(updatedErrors);
    }, [task, touched]);

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
                    createNotification("success", "Task updated successfully!");
                    navigate("/myTasks");
                } else {
                    const jsonData = await res.json();
                    setMessage(jsonData.error || "Failed to update task");
                }
            } catch {
                setMessage("Error occurred while updating task. Please try again.");
            }
        } else {
            setMessage("Please correct the highlighted errors.");
        }
    };

    const isButtonDisabled = !task.title || !task.dateFinish || Object.keys(error).length > 0;

    return (
        <Row align="middle" justify="center" style={{ minHeight: "70vh", padding: "10px" }}>
            {message && <Alert type="error" message={message} style={{ marginBottom: "10px" }} />}

            <Col xs={24} sm={20} md={16} lg={12}>
                <Card title="Edit Task" bordered={false}>
                    
                    {/* Task Title Input */}
                    <Input
                        size="large"
                        placeholder="Task title"
                        value={task.title}
                        onChange={(e) => changeProperty("title", e.target.value)}
                        aria-label="Task Title"
                    />
                    {error.title && <Text type="danger">{error.title}</Text>}

                    {/* Task Description Input */}
                    <Input.TextArea
                        style={{ marginTop: "10px" }}
                        size="large"
                        placeholder="Task description"
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
                        <Option value="low">Low</Option>
                        <Option value="medium">Medium</Option>
                        <Option value="high">High</Option>
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
                        Edit Task
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default React.memo(EditTaskComp);

import React, { useEffect, useState, useCallback } from "react";
import { backendUrl } from "../Globals";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Col, DatePicker, Input, Row, Select, Typography } from "antd";

const { Option } = Select;
const { Text } = Typography;

const CreateTaskComp = ({ createNotification }) => {
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
            updatedErrors.name = "Task name is too short.";
        }

        // Validate task description
        if (touched.description && (!task.description || task.description.length < 5)) {
            updatedErrors.description = "Task description is too short.";
        }

        // Validate task finish date
        if (touched.dateFinish && task.dateFinish && task.dateFinish < Date.now()) {
            updatedErrors.dateFinish = "Due date must be in the future.";
        }

        setError(updatedErrors);
    }, [task, touched]);

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
                    createNotification("success", "Task created successfully!");
                    navigate("/myTasks");
                } else {
                    const jsonData = await res.json();
                    setMessage(jsonData.error || "Failed to create task");
                }
            } catch {
                setMessage("Error occurred while creating task. Please try again.");
            }
        } else {
            setMessage("Please correct the highlighted errors.");
        }
    };

    // Check if the Create Task button should be disabled
    const isButtonDisabled = !task.title || !task.dateFinish || Object.keys(error).length > 0;

    return (
        <Row align="middle" justify="center" style={{ minHeight: "70vh", padding: "10px" }}>
            {message && <Alert type="error" message={message} style={{ marginBottom: "10px" }} />}

            <Col xs={24} sm={20} md={16} lg={12}>
                <Card title="Create Task" bordered={false}>

                    {/* Task Title Input */}
                    <Input
                        size="large"
                        placeholder="Task title"
                        aria-label="Task title"
                        value={task.title}
                        onChange={(e) => changeProperty("title", e.target.value)}
                        required // Mark as required for accessibility
                    />
                    {error.name && <Text type="danger">{error.name}</Text>}

                    {/* Task Description Input */}
                    <Input.TextArea
                        style={{ marginTop: "10px" }}
                        size="large"
                        placeholder="Task description"
                        aria-label="Task description"
                        value={task.description}
                        onChange={(e) => changeProperty("description", e.target.value)}
                        required // Mark as required for accessibility
                    />
                    {error.description && <Text type="danger">{error.description}</Text>}

                    {/* Task Priority Select */}
                    <Select
                        style={{ marginTop: "10px", width: "100%" }}
                        size="large"
                        placeholder="Select priority"
                        aria-label="Task priority"
                        value={task.priority}
                        onChange={(value) => changeProperty("priority", value)}
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
                        placeholder="Select due date"
                        onChange={changeDate}
                        aria-label="Task due date"
                    />
                    {error.dateFinish && <Text type="danger">{error.dateFinish}</Text>}

                    {/* Create Task Button */}
                    <Button
                        style={{ marginTop: "10px" }}
                        type="primary"
                        aria-label="Create Task"
                        onClick={clickCreate}
                        block
                        disabled={isButtonDisabled}
                    >
                        Create Task
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default React.memo(CreateTaskComp);

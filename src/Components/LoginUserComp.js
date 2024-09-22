/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { backendUrl } from "../Globals";
import { useNavigate } from "react-router-dom";
import { emailPattern } from "../Utils";
import { Button, Card, Col, Input, Row } from "antd";

const LoginUserComp = ({ setLogin, createNotification }) => {
    // State declarations
    const [email, setEmail] = useState(""); // Email input state
    const [password, setPassword] = useState(""); // Password input state
    const [, setMessage] = useState(""); // State to display error messages
    const [, setError] = useState({}); // State to track validation errors

    const navigate = useNavigate(); // Hook for navigation in the app

    // Effect hook to check for input errors and handle keydown events
    useEffect(() => {
        checkInputErrors(); // Validate inputs on change

        // Function to handle Enter key for login
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                handleLoginClick(); // Trigger login on Enter
            }
        };

        // Attach event listener for keydown
        window.addEventListener("keydown", handleKeyDown);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [email, password]);

    // Validate input fields
    const checkInputErrors = () => {
        let updatedErrors = {};

        // Validate email format
        if (!email || email.length < 3 || !emailPattern.test(email)) {
            updatedErrors.email = "Incorrect email format";
        }

        // Validate password length
        if (!password || password.length < 5) {
            updatedErrors.password = "Password must be at least 5 characters";
        }

        setError(updatedErrors); // Update error state
    };

    // Handlers for input changes
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Handler for login button click event
    const handleLoginClick = async () => {
        const res = await fetch(`${backendUrl}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        // Handle API response
        if (res.ok) {
            const jsonData = await res.json();
            if (jsonData.apiKey) {
                // Store user credentials in localStorage
                localStorage.setItem("apiKey", jsonData.apiKey);
                localStorage.setItem("userId", jsonData.id);
                localStorage.setItem("email", jsonData.email);
            }

            setLogin(true); // Update login state
            navigate("/myTasks"); // Redirect to tasks page
        } else {
            // Handle login failure
            const jsonData = await res.json();
            setMessage(jsonData.error);
            createNotification(jsonData.error);
        }
    };

    return (
        <Row align="middle" justify="center" style={{ minHeight: "70vh" }}>
            <Col>
                <Card title="Login" style={{ minWidth: "300px", maxWidth: "500px" }}>
                    <Input
                        style={{ marginBottom: "10px" }}
                        size="large"
                        type="text"
                        placeholder="Email"
                        onChange={handleEmailChange} // Update email state on input change
                    />
                    <Input
                        style={{ marginBottom: "10px" }}
                        size="large"
                        type="password" // Set input type to password for security
                        placeholder="Password"
                        onChange={handlePasswordChange} // Update password state on input change
                    />
                    <Button
                        type="primary"
                        onClick={handleLoginClick} // Trigger login handler on button click
                        block
                        disabled={!email || !password} // Disable button if fields are empty
                    >
                        Login
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default React.memo(LoginUserComp);

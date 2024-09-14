/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { backendUrl } from "../Globals";
import { useNavigate } from "react-router-dom";
import { emailPattern } from "../Utils";
import { Button, Card, Col, Input, Row } from "antd";

const LoginUserComp = ({ setLogin }) => {
    // State declarations
    const [email, setEmail] = useState(null); // State to hold email input
    const [, setMessage] = useState(null); // State to display error messages
    const [password, setPassword] = useState(""); // State to hold password input
    const [, setError] = useState({}); // State to track validation errors

    const navigate = useNavigate(); // Hook for navigation in the app

    // Effect hook to check for input errors when email or password changes
    useEffect(() => {
        checkInputErrors(); // Call validation function when email or password changes
    }, [email, password]);

    // Function to validate input fields
    const checkInputErrors = () => {
        let updatedErrors = {};

        // Validate email field
        if (!email || email.length < 3 || !emailPattern.test(email)) {
            updatedErrors.email = "Incorrect email format";
        }

        // Validate password field
        if (!password || password.length < 5) {
            updatedErrors.password = "Incorrect password, maybe too short";
        }

        setError(updatedErrors); // Update the error state with the results of validation
    };

    // Handler to update email state
    const handleEmailChange = (e) => {
        setEmail(e.currentTarget.value);
    };

    // Handler to update password state
    const handlePasswordChange = (e) => {
        setPassword(e.currentTarget.value);
    };

    // Handler for the login button click event
    const handleLoginClick = async () => {
        // Make an API request to log in the user
        const res = await fetch(`${backendUrl}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        // If the response is OK, handle success logic
        if (res.ok) {
            const jsonData = await res.json();

            // Store user credentials in localStorage if login is successful
            if (jsonData.apiKey) {
                localStorage.setItem("apiKey", jsonData.apiKey);
                localStorage.setItem("userId", jsonData.id);
                localStorage.setItem("email", jsonData.email);
            }

            setLogin(true); // Update login state
            navigate("/myItems"); // Redirect to a different page
        } else {
            // If the login fails, update the message state with the error
            const jsonData = await res.json();
            setMessage(jsonData.error);
        }
    };

    return (
        <Row align='middle' justify='center' style={{ minHeight: "70vh" }}>
            <Col>
                <Card title='Login' style={{ minWidth: '300px', maxWidth: '500px' }}>
                    <Input 
                        style={{ marginBottom: "10px" }} 
                        size="large" 
                        type="text" 
                        placeholder="email" 
                        onChange={handleEmailChange} // Update email state on input change
                    />
                    <Input 
                        style={{ marginBottom: "10px" }} 
                        size="large" 
                        type="password" // Set input type to password for security
                        placeholder="password" 
                        onChange={handlePasswordChange} // Update password state on input change
                    />
                    <Button 
                        type="primary" 
                        onClick={handleLoginClick} // Trigger login handler on button click
                        block
                    >
                        Login
                    </Button>
                </Card>
            </Col>
        </Row>
    );
};

export default LoginUserComp;

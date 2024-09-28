import React, { useState, useEffect } from "react";
import { backendUrl } from "../Globals";
import { useNavigate } from "react-router-dom";
import { emailPattern } from "../Utils";
import { Button, Card, Col, Input, Row, Typography, Alert } from "antd";
import { useTranslation } from "react-i18next";

const CreateUserComp = (props) => {
  const { t } = useTranslation();
  const { createNotification } = props;

  // State variables for email, password, messages, and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate();

  // Validate inputs and set errors
  const validateInputs = (email, password) => {
    const errors = {};
    if (email !== "" && (!email || email.length < 3 || !emailPattern.test(email))) {
      errors.email = t("incorrectEmailFormat");
    }
    if (password !== "" && (!password || password.length < 5)) {
      errors.password = t("passwordTooShort");
    }
    setError(errors);
    return Object.keys(errors).length === 0; // Return true if valid
  };

  // Handle input changes
  const changeEmail = (e) => setEmail(e.currentTarget.value);
  const changePassword = (e) => setPassword(e.currentTarget.value);

  // Validate inputs on email or password change
  useEffect(() => {
    validateInputs(email, password);
  }, [email, password]);

  // Handle user creation on button click
  const clickCreate = async () => {
    if (!validateInputs(email, password)) return; // Check for errors before submission

    try {
      const res = await fetch(`${backendUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        createNotification("success", t("userCreated"));
        navigate("/login");
      } else {
        const jsonData = await res.json();
        const errorMessages = Array.isArray(jsonData.errors)
          ? jsonData.errors.map((element) => element.error).join(" ")
          : jsonData.errors;
        setMessage(errorMessages);
      }
    } catch (error) {
      setMessage(t("errorCreatingUser"));
    }
  };

  const { Text } = Typography;

  return (
    <Row align="middle" justify="center" style={{ minHeight: "70vh", padding: "10px" }}>
      {message && <Alert type="error" message={message} style={{ marginBottom: "10px" }} />}

      <Col>
        <Card title={t("registerUser")} style={{ minWidth: "300px", maxWidth: "500px" }}>

          {/* Email of the user */}
          <Input
            size="large"
            type="text"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={changeEmail}
            aria-label={t("emailPlaceholder")}
            required
          />
          {error.email && <Text type="danger">{error.email}</Text>}

          {/* Password of the user */}
          <Input
            style={{ marginTop: "10px" }}
            size="large"
            type="password"
            placeholder={t("passwordPlaceholder")}
            value={password}
            onChange={changePassword}
            aria-label={t("passwordPlaceholder")}
            required
          />
          {error.password && <Text type="danger">{error.password}</Text>}

          {/* Button to create a user */}
          <Button
            style={{ marginTop: "10px" }}
            type="primary"
            onClick={clickCreate}
            block
            disabled={Object.keys(error).length > 0} // Disable if there are validation errors
          >
            {t("registerUser")}
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateUserComp;

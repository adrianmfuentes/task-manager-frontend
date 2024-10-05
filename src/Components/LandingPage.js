// Components/LandingPage.js
import React from 'react';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../Css/LandingPage.css'; 

const { Title, Text } = Typography;

const LandingPage = () => {
  const { t } = useTranslation(); // Usa el hook para obtener la función de traducción

  return (
    <div className="landing-page-container">
      <div className="landing-page-content">
        <Title className="landing-title">{t("Welcome to TaskMaster!")}</Title>
        <Text className="landing-text">
          {t("Simplify project and task management with TaskMaster.")}<br />
          {t("Create your account or log in now to start organizing your life efficiently and productively.")}
        </Text><br></br><br></br>
        
        <div className="landing-buttons">
          <Link to="/register">
            <Button type="primary" size="large" className="landing-button">{t("Register")}</Button>
          </Link>
          <Link to="/login">
            <Button type="default" size="large" className="landing-button">{t("Login")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

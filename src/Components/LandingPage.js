// Components/LandingPage.js
import React from 'react';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import '../Css/LandingPage.css'; // Importa los estilos personalizados

const { Title, Text } = Typography;

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="landing-page-content">
        <Title className="landing-title">¡Bienvenido a TaskMaster!</Title>
        <Text className="landing-text">
          Gestiona tus proyectos y tareas fácilmente con nuestra aplicación. Crea una cuenta o inicia sesión para empezar a organizarte mejor.
        </Text>
        <div className="landing-buttons">
          <Link to="/register">
            <Button type="primary" size="large" className="landing-button">Regístrate</Button>
          </Link>
          <Link to="/login">
            <Button type="default" size="large" className="landing-button">Inicia Sesión</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

import 'antd/dist/reset.css'; // Import Ant Design's CSS reset
import { Link, Route, Routes, useNavigate } from 'react-router-dom'; // Import React Router functions
import React, { useEffect, useState, Suspense } from 'react'; // Import React hooks
import { backendUrl } from './Globals'; // Import backend URL from global configuration
import { Layout, Menu, notification, Dropdown, Button } from 'antd'; // Import Ant Design components
import { Content, Header } from 'antd/es/layout/layout'; // Destructure Layout components
import { MenuOutlined } from '@ant-design/icons'; // Import Menu icon

// Import custom components
import CreateUserComp from './Components/CreateUserComp';
import LoginUserComp from './Components/LoginUserComp';
import ViewTasksComp from './Components/ViewTasksComp';
import CreateProjectComp from './Components/CreateProjectComp';
import ViewProjectComp from './Components/ViewProjectsComp';
import EditProjectComp from './Components/EditProjectComp';
import EditTaskComp from './Components/EditTaskComp';
import CustomFooter from './Footer/CustomFooter';

// Import additional components
import PrivacyPolicy from './Footer/PrivacyPolicy';
import TermsOfService from './Footer/TermsOfService';
import Contact from './Footer/Contact';

// Import LanguageSelector
import LanguageSelector from './Components/LanguageSelector'; // Import your LanguageSelector component

// Lazy load CreateTaskComp for better performance
const CreateTaskComp = React.lazy(() => import('./Components/CreateTaskComp'));

function App() {
  const [api, contextHolder] = notification.useNotification(); 
  const [login, setLogin] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Check local storage for apiKey to determine login state
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey) setLogin(true); 

    // Handle user disconnection on page unload
    const handleBeforeUnload = async (event) => {
      if (apiKey) {
        await fetch(`${backendUrl}/user/disconnect?apiKey=${apiKey}`); 
        localStorage.removeItem("apiKey"); 
        setLogin(false); 
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); 

  // Notification function for user feedback
  const createNotif = (type = "info", msg, placement = "top") => {
    api[type]({ message: msg, description: msg, placement }); 
  };

  // Disconnect function for logging out users
  const disconnect = async () => {
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey) {
      await fetch(`${backendUrl}/user/disconnect?apiKey=${apiKey}`); 
      localStorage.removeItem("apiKey"); 
      setLogin(false); 
      navigate("/login"); 
    }
  };

  // Menu items
  const menuItems = login ? [
    { key: "menuTasks", label: <Link to="/createTask">Create Task</Link> },
    { key: "menuMyTasks", label: <Link to="/myTasks">My Tasks</Link> },
    { key: "menuProjects", label: <Link to="/createProject">Create Project</Link> },
    { key: "menuMyProjects", label: <Link to="/myProjects">My Projects</Link> },
    { key: "menuDisconnect", label: <Link to="#" onClick={disconnect}>Exit</Link> }
  ] : [
    { key: "menuRegister", label: <Link to="/register">Register</Link> },
    { key: "menuLogin", label: <Link to="/login">Log In</Link> }
  ];

  // Dropdown menu for mobile view
  const menu = (
    <Menu>
      {menuItems.map(item => item.label)}
      <Menu.Divider />
      <LanguageSelector /> {/* Include the language selector */}
    </Menu>
  );

  return (
    <>
      {contextHolder} {/* Required to show notifications */}

      <Layout className='layout' style={{ minHeight: '100vh' }}>
        <Header>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
              <Button icon={<MenuOutlined />} />
            </Dropdown>
            <Menu mode='horizontal' theme='dark' style={{ flex: 1 }}>
              {menuItems.map(item => (
                <Menu.Item key={item.key} onClick={item.onClick}>
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </Header>

        {/* Main content area */}
        <Content style={{ padding: "20px 50px" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<p>Website Index (under construction)</p>} />
              <Route path="/register" element={<CreateUserComp createNotification={createNotif} />} />
              <Route path="/login" element={<LoginUserComp setLogin={setLogin} createNotification={createNotif} />} />
              <Route path="/myTasks" element={<ViewTasksComp createNotification={createNotif} />} />
              <Route path="/myProjects" element={<ViewProjectComp createNotification={createNotif} />} />
              <Route path="/createTask" element={<CreateTaskComp createNotification={createNotif} />} />
              <Route path="/createProject" element={<CreateProjectComp createNotification={createNotif} />} />
              <Route path="/task/edit/:taskId" element={<EditTaskComp createNotification={createNotif} />} />
              <Route path="/project/edit/:projectId" element={<EditProjectComp createNotification={createNotif} />} />
              {/* Otras rutas */}
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </Content>

        {/* Footer */}
        <CustomFooter />  
      </Layout>
    </>
  );
}

export default React.memo(App);

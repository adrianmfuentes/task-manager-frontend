import 'antd/dist/reset.css'; // Import Ant Design's CSS reset
import { Link, Route, Routes, useNavigate } from 'react-router-dom'; // Import React Router functions
import React, { useEffect, useState } from 'react'; // Import React hooks
import { backendUrl } from './Globals'; // Import backend URL from global configuration
import { Layout, Menu, notification } from 'antd'; // Import Ant Design components
import { Content, Footer, Header } from 'antd/es/layout/layout'; // Destructure Layout components

// Import custom components
import CreateUserComp from './Components/CreateUserComp';
import LoginUserComp from './Components/LoginUserComp';
import CreateTaskComp from './Components/CreateTaskComp';
import ViewTasksComp from './Components/ViewTasksComp';
import EditTaskComp from './Components/EditTaskComp';
import CreateProjectComp from './Components/CreateProjectComp';
import ViewProjectComp from './Components/ViewProjectsComp';
import EditProjectComp from './Components/EditProjectComp';

function App() {
  // Ant Design notification hook
  // `api` is the notification object, `contextHolder` is the UI component for notifications
  const [api, contextHolder] = notification.useNotification(); 

  // State to track login status
  const [login, setLogin] = useState(false);

  const navigate = useNavigate(); // Hook to navigate programmatically within the app

  // Check for existing API key in localStorage on initial render
  useEffect(() => {
    if (localStorage.getItem("apiKey") !== null) {
      setLogin(true); // If an API key is found, set login state to true
    }
  }, []); // Empty dependency array ensures this runs only on initial mount

  // Function to create and display notifications
  const createNotif = (type = "info", msg, placement = "top") => {
    // Create notification of specified type and placement
    api[type]({ message: msg, description: msg, placement }); 
  };

  // Function to handle user logout
  const disconnect = async () => {
    // Make API call to disconnect user
    await fetch(`${backendUrl}/user/disconnect?apiKey=${localStorage.getItem("apiKey")}`); 
    // Remove API key from localStorage
    localStorage.removeItem("apiKey"); 
    // Set login state to false
    setLogin(false); 
    // Navigate user back to login page
    navigate("/login"); 
  };

  return (
    <>
      {contextHolder} {/* This is required to show notifications */}

      <Layout className='layout' style={{ minHeight: '100vh' }}>
        <Header>
          {/* Show menu items based on login status */}
          {!login && (
            <Menu mode='horizontal' theme='dark' items={[
              { key: "menuRegister", label: <Link to="/register">Register</Link> },
              { key: "menuLogin", label: <Link to="/login">Log In</Link> }
            ]}>
            </Menu>
          )}

          {login && (
            <Menu mode='horizontal' theme='dark' items={[
              { key: "menuItems", label: <Link to="/items">Create Task</Link> },
              { key: "menuMyItems", label: <Link to="/myItems">My Tasks</Link> },
              { key: "menuCreateItem", label: <Link to="/createItem">My Projects</Link> },
              { key: "menuDisconnect", label: <Link to="#" onClick={disconnect}>Exit</Link> }
            ]}>
            </Menu>
          )}
        </Header>

        {/* Main content area */}
        <Content style={{ padding: "20px 50px" }}>
          <Routes>
            {/* Define routes for different pages */}
            <Route path="/" element={<p> Website Index (under construction) </p>} />
            <Route path="/register" element={<CreateUserComp createNotification={createNotif} />} />
            <Route path="/login" element={<LoginUserComp setLogin={setLogin} />} />
            <Route path="/task" element={<ViewTasksComp />} />
            <Route path="/project" element={<ViewProjectComp />} />
            <Route path="/createTask" element={<CreateTaskComp createNotification={createNotif} />} />
            <Route path="/createProject" element={<CreateProjectComp createNotification={createNotif} />} />
            <Route path="/task/edit/:projectid" element={<EditProjectComp createNotification={createNotif} />} />
            <Route path="/project/edit/:itemId" element={<EditTaskComp createNotification={createNotif} />} />
          </Routes>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: 'center' }}>To Do List Website</Footer>
      </Layout>
    </>
  );
}

export default App;

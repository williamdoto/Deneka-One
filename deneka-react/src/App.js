import React, { useState } from "react";
import { Layout, Button } from "antd";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./AppRoutes";
import TopBar from "./components/TopBar/TopBar";
import { useAuthContext } from './context/AuthContext';
import SigninPage from './views/SignInPage/SigninPage';

const { Header, Content, Sider } = Layout;

function App() {
  const { user } = useAuthContext();

  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarRight, setIsSidebarRight] = useState(false); 

  const handleCollapse = (isCollapsed) => {
    setCollapsed(isCollapsed);
  };

  const togglerStyle = {
    backgroundColor: "#ffff",
    color: "#333",
    fontSize: '22px',
    borderRight: "1px solid #E0E0E0",
    borderLeft: "1px solid #E0E0E0",
  };

  const toggleSidebarPosition = () => {
    setIsSidebarRight(!isSidebarRight);
    setCollapsed(true); // Ensure the sidebar is collapsed when its position changes
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isSidebarRight && (
        <Sider 
          width={200} 
          collapsed={collapsed}
          collapsible 
          onCollapse={handleCollapse}
          trigger={<div style={togglerStyle}>&#9776;</div>}
          style={{ 
            background: "#ffff", 
            borderRight: "1px solid #E0E0E0",
          }}
        >
          {/* Pass the toggleSidebarPosition function as a prop */}
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} togglePosition={toggleSidebarPosition} isSidebarRight={isSidebarRight} />

        </Sider>
      )}
      <Layout>
        <Header style={{ padding: 0, height: 'auto', lineHeight: 'normal' }}>
          <TopBar />
        </Header>
        <Content>
          <AppRoutes />
        </Content>
      </Layout>
      {isSidebarRight && (
        <Sider 
          width={200} 
          collapsed={collapsed}
          collapsible 
          onCollapse={handleCollapse}
          trigger={<div style={togglerStyle}>&#9776;</div>}
          style={{ 
            background: "#ffff", 
            borderRight: "1px solid #E0E0E0",
          }}
        >
          {/* Pass the toggleSidebarPosition function as a prop */}
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} togglePosition={toggleSidebarPosition} isSidebarRight={isSidebarRight} />

        </Sider>
      )}
    </Layout>
  );
}

export default App;

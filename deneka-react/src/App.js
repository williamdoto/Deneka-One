import React, { useState } from "react";
import { ConfigProvider, Layout, Button, theme } from "antd";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./AppRoutes";
import TopBar from "./components/TopBar/TopBar";
import { useAuthContext } from './context/AuthContext';
import SigninPage from './views/SignInPage/SigninPage';

const { Header, Content, Sider } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const { user } = useAuthContext();
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarRight, setIsSidebarRight] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleCollapse = (isCollapsed) => {
    setCollapsed(isCollapsed);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  const togglerStyle = {
    backgroundColor: isDarkMode ? '#141414' : '#FFFFFF',
    color: isDarkMode ? '#FFFFFF' : '#333',
    fontSize: '22px',
    borderRight: "1px solid #E0E0E0",

  };
  const toggleSidebarPosition = () => {
    setIsSidebarRight(!isSidebarRight);
    setCollapsed(true); // Ensure the sidebar is collapsed when its position changes
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        components: { TopBar: { colorPrimary: '#141414' } }
      }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          width={200}
          collapsed={collapsed}
          collapsible
          onCollapse={handleCollapse}
          trigger={<div style={togglerStyle}>&#9776;</div>}
          style={{
            background: isDarkMode ? '#141414' : '#FFFFFF', // Adjusted to respond to isDarkMode
            borderRight: "1px solid #E0E0E0",
          }}
        >
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} togglePosition={toggleSidebarPosition} isSidebarRight={isSidebarRight} isDarkMode={isDarkMode} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, height: 'auto', lineHeight: 'normal' }}>
            <TopBar isDarkMode={isDarkMode} toggleDarkMode={handleToggleDarkMode} />
          </Header>
          <Content style={{ background: isDarkMode ? '#141414' : '#FFFFFF' }}> {/* Adjusted to respond to isDarkMode */}
            <AppRoutes />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;

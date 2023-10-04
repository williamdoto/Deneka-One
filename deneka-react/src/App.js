import React, { useState } from "react";
import {FloatButton, ConfigProvider, Layout, theme } from "antd";
import SidebarMenu from "./components/Sidebar/Sidebar";
import AppRoutes from "./AppRoutes";
import TopBar from "./components/TopBar/TopBar";
import { useAuthContext } from './context/AuthContext';
import NotificationBar from "./components/NotificationBar/NotificationBar";
import SigninPage from './views/SignInPage/SigninPage';
import { useLocation } from 'react-router-dom';

import { MessageTwoTone } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const { user } = useAuthContext();
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarRight, setIsSidebarRight] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const location = useLocation();

  const isAuthenticated = () => {
    // Replace with your actual authentication check
    return true;
  };

  const shouldHideBars = location.pathname === '*' || !isAuthenticated();

  const handleCollapse = (isCollapsed) => {
    setCollapsed(isCollapsed);
  };

  const toggleNotificationBar = () => {
    setNotificationVisible(!notificationVisible);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  const togglerStyle = {
    backgroundColor: isDarkMode ? '#29323c' : '#FFFFFF',
    color: isDarkMode ? '#FFFFFF' : '#333',
    fontSize: '22px',
    borderRight: "1px solid #E0E0E0",
  };

  const toggleSidebarPosition = () => {
    setIsSidebarRight(!isSidebarRight);
    setCollapsed(true);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        components: { TopBar: { colorPrimary: isDarkMode ? '#29323c' : '#FFFFFF' } }
      }}
    >
      <Layout style={{ minHeight: "100vh", background: isDarkMode ? '#141414' : '#FFFFFF' }}>
        {!shouldHideBars && !isSidebarRight && (
          <Sider
            width={200}
            collapsed={collapsed}
            collapsible
            onCollapse={handleCollapse}
            trigger={<div style={togglerStyle}>&#9776;</div>}
            style={{
              background: isDarkMode ? 'linear-gradient(60deg, #29323c 0%, #485563 100%)' : 'linear-gradient(60deg, #ffffff 0%, #f0f0f0 100%)',
              borderRight: "1px solid #E0E0E0",
              color: isDarkMode ? 'white' : 'black'
            }}
          >
            <SidebarMenu collapsed={collapsed} setCollapsed={setCollapsed} togglePosition={toggleSidebarPosition} isSidebarRight={isSidebarRight} isDarkMode={isDarkMode} />
          </Sider>
        )}
        <Layout>
          {!shouldHideBars && (
            <Header style={{ padding: 0, height: 'auto', lineHeight: 'normal', background: isDarkMode ? 'linear-gradient(60deg, #29323c 0%, #485563 100%)' : '#FFFFFF' }}>
              <TopBar isDarkMode={isDarkMode} toggleDarkMode={handleToggleDarkMode} toggleNotificationBar={toggleNotificationBar} />
            </Header>)}
          <Content style={{ background: isDarkMode ? '#141414' : '#FFFFFF', position: 'relative' }}>
            <AppRoutes />
            {!shouldHideBars && <FloatButton shape="circle" tooltip={<div>Chat</div>} icon={<MessageTwoTone />} style={{ bottom:'24px', boxShadow: isDarkMode ? '0px 2px 10px 0px #ffff' : '0px 2px 10px 0px #000000' }}/>} {/* Add logo prop here */}
          </Content>
        </Layout>
        {!shouldHideBars && isSidebarRight && (
          <Sider
            width={200}
            collapsed={collapsed}
            collapsible
            onCollapse={handleCollapse}
            trigger={<div style={togglerStyle}>&#9776;</div>}
            style={{
              background: isDarkMode ? 'linear-gradient(60deg, #29323c 0%, #485563 100%)' : '#FFFFFF',
              borderLeft: "1px solid #E0E0E0",
            }}
          >
            <SidebarMenu collapsed={collapsed} setCollapsed={setCollapsed} togglePosition={toggleSidebarPosition} isSidebarRight={isSidebarRight} isDarkMode={isDarkMode} />
          </Sider>
        )}
        {!shouldHideBars && (
          <NotificationBar
            visible={notificationVisible}
            onClose={toggleNotificationBar}
            placement={!isSidebarRight ? "right" : "left"}
          />)}
      </Layout>
    </ConfigProvider>
  );

}

export default App;

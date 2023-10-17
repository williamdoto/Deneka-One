import React, { useState } from "react";
import {FloatButton, ConfigProvider, Layout, theme } from "antd";
import SidebarMenu from "./components/Sidebar/Sidebar";
import AppRoutes from "./AppRoutes";
import TopBar from "./components/TopBar/TopBar";
import { useAuthContext } from './context/AuthContext';
import NotificationBar from "./components/NotificationBar/NotificationBar";
import SigninPage from './views/SignInPage/SigninPage';
import FeedbackButton from "./components/FloatButton/FeedbackButton";
import { useLocation } from 'react-router-dom';


const { Header, Content, Sider } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const { user } = useAuthContext();
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarRight, setIsSidebarRight] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const location = useLocation();

  const [drawerWidth, setDrawerWidth] = useState(0); // Define drawerWidth and setDrawerWidth

  const [drawerPinned, setDrawerPinned] = useState(false); // New state to track whether the drawer is pinned
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

  const computeContentStyle = () => {
    return {
      background: isDarkMode ? '#141414' : '#FFFFFF',
      position: 'relative',
      marginRight: notificationVisible && drawerPinned && !isSidebarRight ? `378px` : '0px',
      marginLeft: notificationVisible && drawerPinned && isSidebarRight ? `378px` : '0px',
    };
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
          <Content style={computeContentStyle()}>
            <AppRoutes />
            <FeedbackButton 
    shouldHideBars={shouldHideBars} 
    isDarkMode={isDarkMode} 
    isSidebarRight={isSidebarRight} 
  />
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
            setDrawerWidth={setDrawerWidth} // Pass the setter function
      onPin={setDrawerPinned} // Pass the setter function for drawerPinned
          />)}
      </Layout>
    </ConfigProvider>
  );

}

export default App;

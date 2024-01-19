import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './redux/slices/authSlice';
import { toggleCollapsed, toggleSidebarPosition, toggleDarkMode, toggleNotificationVisible } from './redux/slices/uiSlice';
import { ConfigProvider, Layout, theme } from "antd";
import SidebarMenu from "./components/Sidebar/Sidebar";
import AppRoutes from "./AppRoutes";
import TopBar from "./components/TopBar/TopBar";
import NotificationBar from "./components/NotificationBar/NotificationBar";
import { useLocation } from 'react-router-dom';

const { Header, Content, Sider } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const dispatch = useDispatch();
  const { collapsed, isSidebarRight, isDarkMode, notificationVisible, notificationBarPinned } = useSelector((state) => state.ui);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const shouldHideBars = location.pathname === '*' || !isAuthenticated;

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
      marginRight: notificationVisible && notificationBarPinned && !isSidebarRight ? `378px` : '0px',
      marginLeft: notificationVisible && notificationBarPinned && isSidebarRight ? `378px` : '0px',
    };
  };

  return (
    <ConfigProvider theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}>
      <Layout style={{ minHeight: "100vh", background: isDarkMode ? '#141414' : '#FFFFFF' }}>
        {isAuthenticated && !shouldHideBars && !isSidebarRight && (
          <Sider
            width={200}
            collapsed={collapsed}
            collapsible
            onCollapse={() => dispatch(toggleCollapsed())}
            trigger={<div style={togglerStyle}>&#9776;</div>}
            style={{
              background: isDarkMode ? 'linear-gradient(60deg, #29323c 0%, #485563 100%)' : 'linear-gradient(60deg, #ffffff 0%, #f0f0f0 100%)',
              borderRight: "1px solid #E0E0E0",
              color: isDarkMode ? 'white' : 'black'
            }}
          >
            <SidebarMenu />
          </Sider>
        )}
        <Layout>
          {isAuthenticated && !shouldHideBars && (
            <Header style={{ padding: 0, height: 'auto', lineHeight: 'normal', background: isDarkMode ? 'linear-gradient(60deg, #29323c 0%, #485563 100%)' : '#FFFFFF' }}>
              <TopBar />
            </Header>
          )}
          <Content style={computeContentStyle()}>
            <AppRoutes />
            {/* Other components */}
          </Content>
        </Layout>
        {isAuthenticated && !shouldHideBars && isSidebarRight && (
          <Sider
            width={200}
            collapsed={collapsed}
            collapsible
            onCollapse={() => dispatch(toggleCollapsed())}
            trigger={<div style={togglerStyle}>&#9776;</div>}
            style={{
              background: isDarkMode ? 'linear-gradient(60deg, #29323c 0%, #485563 100%)' : '#FFFFFF',
              borderLeft: "1px solid #E0E0E0",
            }}
          >
            <SidebarMenu />
          </Sider>
        )}
        {isAuthenticated && !shouldHideBars && (
          <NotificationBar
            visible={notificationVisible}
            onClose={() => dispatch(toggleNotificationVisible())}
            placement={!isSidebarRight ? "right" : "left"}
          />
        )}
      </Layout>
    </ConfigProvider>
  );
}

export default App;

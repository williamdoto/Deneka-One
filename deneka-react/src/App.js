import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./AppRoutes";
import TopBar from "./components/TopBar/TopBar";
import { useAuthContext } from './context/AuthContext';
import SigninPage from './views/SignInPage/SigninPage';
const { Header, Content, Sider } = Layout;

function App() {
  const { user } = useAuthContext();
  
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = (isCollapsed) => {
    setCollapsed(isCollapsed);
  };

  const togglerStyle = {
    backgroundColor: "#F5F5F5",
    color: "#333",
    fontSize: '22px',
    borderRight: "1px solid #E0E0E0",
  };

  // if (!user) {
  //   return <SigninPage />;
  // }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider 
        width={200} 
        collapsible 
        onCollapse={handleCollapse}
        trigger={<div style={togglerStyle}>&#9776;</div>} // Custom styling for the toggler
        style={{ 
          background: "#F5F5F5", 
          borderRight: "1px solid #E0E0E0",
        }}
      >
        <Sidebar collapsed={collapsed} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, height: 'auto', lineHeight: 'normal' }}>
          <TopBar />
        </Header>
        <Content>
          <AppRoutes />
        </Content>
        {/* Uncomment this once you want the NotificationBar */}
        {/* <Footer>
          <NotificationBar />
        </Footer> */}
      </Layout>
    </Layout>
  );
}

export default App;

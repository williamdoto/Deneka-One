import React from "react";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./AppRoutes";
import TopBar from "./components/TopBar/TopBar";
import { useAuthContext } from './context/AuthContext';
import SigninPage from './views/SignInPage/SigninPage';
const { Header, Content, Sider } = Layout;

function App() {
  const { user } = useAuthContext();

  // if (!user) {
  //   return <SigninPage />;
  // }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} collapsible> {/* Adjust width as needed */}
        <Sidebar />
      </Sider>
      <Layout>
        <Header>
          {/* <TopBar /> */}
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

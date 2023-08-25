import React from "react";
import { Layout } from "antd";
import AppHeader from "./pages/Appheader/Appheader";
import AppRoutes from "./AppRoutes";
const { Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
        <Content>
          <AppRoutes />
        </Content>
    </Layout>
  );
}

export default App;

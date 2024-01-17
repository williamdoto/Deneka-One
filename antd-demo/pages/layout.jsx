import React from 'react';
import { useSelector } from 'react-redux';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import TopBar from '../components/TopBar/TopBar';
// import SidebarMenu from '../components/Sidebar/Sidebar';
// import NotificationBar from '../components/NotificationBar/NotificationBar';

const RootLayout = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <AntdRegistry>
      {<TopBar />}
      {/* {<SidebarMenu />} */}
      <main>{children}</main>
      {/* {<NotificationBar />} */}
    </AntdRegistry>
  );
};

export default RootLayout;

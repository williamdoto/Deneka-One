import React, { useState } from 'react';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import AddService from './AddService'; // Assuming ServiceManager is in the same directory

const items = [
  {
    label: 'Services',
    key: 'services',
    icon: <AppstoreOutlined />,
    children: [
      {
        label: 'Create a Service',
        key: 'create-service',
      },
      {
        label: 'Manage Services',
        key: 'manage-services',
      },
    ],
  },
  {
    label: 'Category',
    key: 'category',
    icon: <SettingOutlined />,
    children: [
      {
        label: 'Create a Category',
        key: 'create-category',
      },
      {
        label: 'Manage Categories',
        key: 'manage-categories',
      },
    ],
  },
];

const ServiceManager = () => {
  const [current, setCurrent] = useState('create-service');

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const renderContent = () => {
    switch (current) {
      case 'create-service':
        return <AddService/>
      case 'create-category':
        // return <ServiceManager />;
      case 'manage-services':
        // return <ManageServicesComponent />;
        return <p>Manage Services</p>;
      case 'manage-categories':
        // return <ManageCategoriesComponent />;
        return <p>Manage Categories</p>;
      default:
        return null;
    }
  };

  return (
    <>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      <div className="content">{renderContent()}</div>
    </>
  );
};

export default ServiceManager;

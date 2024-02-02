import React, { useState } from 'react';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import AddService from './AddService'; // Assuming ServiceManager is in the same directory
import CreateCategory from './CreateCategory';
import ServiceList from './ServiceList';
import CategoryList from './CategoryList';
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
        return <CreateCategory/>
      case 'manage-services':
        // return <ManageServicesComponent />;
        return <ServiceList/>;
      case 'manage-categories':
        // return <ManageCategoriesComponent />;
        return <CategoryList/>;
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

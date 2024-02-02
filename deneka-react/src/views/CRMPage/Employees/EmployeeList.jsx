import React, { useState } from 'react';
import { Breadcrumb,Table, Select } from 'antd';
import {HomeOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

const { Option } = Select;

const EmployeeList = () => {
  const [data, setData] = useState([
    {
      EMPLOYEE_ID: 1,
      COMPANY_ID: 101,
      EMPLOYEE_NAME: 'John Doe',
      JOB_TITLE: 'Software Engineer',
      COUNTRY: 'USA',
      WORK_MODE: 'Remote',
      EMPLOYMENT_TYPE: 'Permanent',
      DEPARTMENT: 'Engineering',
    },
    // Add more sample data as needed
  ]);

  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'EMPLOYEE_ID',
      key: 'EMPLOYEE_ID',
      sorter: (a, b) => a.EMPLOYEE_ID - b.EMPLOYEE_ID,
    },
    {
      title: 'Company ID',
      dataIndex: 'COMPANY_ID',
      key: 'COMPANY_ID',
      sorter: (a, b) => a.COMPANY_ID - b.COMPANY_ID,
    },
    {
      title: 'Employee Name',
      dataIndex: 'EMPLOYEE_NAME',
      key: 'EMPLOYEE_NAME',
    },
    {
      title: 'Job Title',
      dataIndex: 'JOB_TITLE',
      key: 'JOB_TITLE',
    },
    {
      title: 'Country',
      dataIndex: 'COUNTRY',
      key: 'COUNTRY',
    },
    {
      title: 'Work Mode',
      dataIndex: 'WORK_MODE',
      key: 'WORK_MODE',
      render: (workMode, record) => (
        <Select
          value={workMode}
          onChange={(value) => handleDropdownChange(value, 'WORK_MODE', record)}
        >
          <Option value="Remote">Remote</Option>
          <Option value="On-site">On-site</Option>
        </Select>
      ),
    },
    {
      title: 'Employment Type',
      dataIndex: 'EMPLOYMENT_TYPE',
      key: 'EMPLOYMENT_TYPE',
      render: (employmentType, record) => (
        <Select
          value={employmentType}
          onChange={(value) => handleDropdownChange(value, 'EMPLOYMENT_TYPE', record)}
        >
          <Option value="Permanent">Permanent</Option>
          <Option value="Temporary">Temporary</Option>
          <Option value="Intern">Intern</Option>
        </Select>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'DEPARTMENT',
      key: 'DEPARTMENT',
      render: (department, record) => (
        <Select
          value={department}
          onChange={(value) => handleDropdownChange(value, 'DEPARTMENT', record)}
        >
          <Option value="Engineering">Engineering</Option>
          <Option value="Sales">Sales</Option>
          <Option value="Marketing">Marketing</Option>
        </Select>
      ),
    },
  ];

  const handleDropdownChange = (value, field, record) => {
    // Update the data when a dropdown value changes
    const updatedData = data.map((item) => {
      if (item.EMPLOYEE_ID === record.EMPLOYEE_ID) {
        return { ...item, [field]: value };
      }
      return item;
    });

    setData(updatedData);
  };

  return (
    <>
      <Breadcrumb style={{ margin: '20px 20px' }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <TeamOutlined />
          <span>Teams</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <UserOutlined />
          <span>Employees</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Table dataSource={data} columns={columns} rowKey="EMPLOYEE_ID" />
    </>
  );
};

export default EmployeeList;

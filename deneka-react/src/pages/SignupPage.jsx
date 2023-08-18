import React, { useState } from 'react';
import { Card, Input, Button, Form, Select } from 'antd';
import 'antd';

const { Option } = Select;

const SignupPage = () => {
  const [form] = Form.useForm();
  
  const handleSubmit = (values) => {
    console.log('Form values:', values);
    // Here you can handle the form submission, like sending the data to your backend
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card title="Sign Up" style={{ width: 400 }}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Company Name" name="companyName" rules={[{ required: true, message: 'Please input your company name!' }]}>
            <Input placeholder="Company Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Business Address" name="address" rules={[{ required: true, message: 'Please input your business address!' }]}>
            <Input placeholder="Business Address" />
          </Form.Item>
          <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Please select your location!' }]}>
            <Select placeholder="Select Location">
              {/* You can replace these options with the actual Australian locations you need */}
              <Option value="Sydney">Sydney</Option>
              <Option value="Melbourne">Melbourne</Option>
              <Option value="Brisbane">Brisbane</Option>
            </Select>
          </Form.Item>
          {/* You can add more form fields here if needed */}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignupPage;

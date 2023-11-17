import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailInputPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const email = form.getFieldValue('email');
      if (!email) {
        console.log('Please enter an email address.');
        return;
      }

      const response = await axios.post('http://localhost:1337/api/request-reset', { email });
      if (response.data && response.data.success) {
        console.log('Reset link sent:', response.data.message);
        // Optionally navigate to a success page or display a success message
      } else {
        console.log('Error:', response.data.message);
      }
    } catch (error) {
      console.log('Error sending reset link:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Card className="email-input-card">
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Send Reset Link
        </Button>
      </Form>
    </Card>
  );
};

export default EmailInputPage;

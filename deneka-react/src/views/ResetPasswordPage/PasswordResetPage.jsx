import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const PasswordResetPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useParams();

  const handleSubmit = async () => {
    try {
      const { newPassword, confirmPassword } = form.getFieldsValue();
      if (newPassword !== confirmPassword) {
        console.log('Passwords do not match.');
        return;
      }

      const response = await axios.post('http://localhost:1337/api/reset-password', {
        token,
        newPassword
      });

      if (response.data && response.data.success) {
        console.log('Password reset successful:', response.data.message);
        navigate('/signin'); // Redirect to the sign-in page
      } else {
        console.log('Error:', response.data.message);
      }
    } catch (error) {
      console.log('Error resetting password:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Card className="password-reset-card">
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="newPassword"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your new password!' }]}
        >
          <Input.Password placeholder="Confirm New Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Reset Password
        </Button>
      </Form>
    </Card>
  );
};

export default PasswordResetPage;

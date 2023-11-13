import React from 'react';
import { Card, Form, Input, Button } from 'antd';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const TOTPInputPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email;

  console.log('User email:', userEmail); // Debugging line

  const handleSubmit = (values) => {
    console.log('TOTP Token:', values.totpToken); // Debugging line

    // Call your backend to verify the TOTP token
    axios.post('http://localhost:1337/api/verify-totp', { email: userEmail, totpToken: values.totpToken })
      .then(response => {
        console.log('Response from server:', response); // Debugging line
        if (response.data && response.data.success) {
          // Redirect to the dashboard or next page
          navigate('/dashboard');
        }
      })
      .catch(error => {
        // Handle error (e.g., invalid TOTP token)
        console.error('Error:', error.response ? error.response.data : error.message);
      });
  };

  return (
    <Card title="Enter TOTP">
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="totpToken"
          rules={[{ required: true, message: 'Please input your TOTP token!' }]}
        >
          <Input placeholder="TOTP Token" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Verify
        </Button>
        <Button onClick={() => navigate('/setup-totp', { state: { email: userEmail } })}>
            Setup TOTP
        </Button>
      </Form>
    </Card>
  );
};

export default TOTPInputPage;

import React from 'react';
import { Card, Form, Input, Button } from 'antd';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { completeTOTP } from '../../redux/slices/authSlice'; // Import the completeTOTP action


const TOTPInputPage = () => {
  const dispatch = useDispatch(); // Initialize dispatch
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
      if (response.data && response.data.success) {
        dispatch(completeTOTP()); // Complete the authentication process
        navigate('/dashboard');
      }
    })
    .catch(error => {
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

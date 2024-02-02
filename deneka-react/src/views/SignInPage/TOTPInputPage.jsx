import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { completeTOTP } from '../../redux/slices/authSlice';

const TOTPInputPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isTotpSetupDisabled, setIsTotpSetupDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email;


  
  useEffect(() => {
    axios.post('http://localhost:1337/api/check-totp-setup', { email: userEmail })
      .then(response => {
        console.log("Check TOTP Setup response:", response.data); // Debugging line
        if (response.data && response.data.isTotpSet) {
          setIsTotpSetupDisabled(true);
        }
      })
      .catch(error => {
        message.error('Error: ' + error.message);
      });
  }, [userEmail]);
  


  const handleSubmit = (values) => {
    axios.post('http://localhost:1337/api/verify-totp', { email: userEmail, totpToken: values.totpToken })
      .then(response => {
        if (response.data && response.data.success) {
          dispatch(completeTOTP());
          navigate('/dashboard');
        }
      })
      .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
      });
  };

  const handleSetup = () => {
    navigate('/setup-totp', { state: { email: userEmail } });
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
        <Button onClick={handleSetup} disabled={isTotpSetupDisabled}>
          Setup TOTP
        </Button>
      </Form>
    </Card>
  );
};

export default TOTPInputPage;

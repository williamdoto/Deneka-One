import React, { useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailInputPage = ({ navigateTo }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:1337/api/send-otp', values);
      if (response.data && response.data.success) {
        message.success('OTP sent to your email!');
        navigate('/OtpInput', { state: { email: values.email } });
      } else {
        message.error('Error:', response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error:', error.response.data);
        message.error('Error sending OTP:', error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error:', error.request);
        message.error('Error sending OTP: No response from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        message.error('Error sending OTP:', error.message);
      }
    }
  };
  

  const handleNavigate = () => {
    navigateTo('otpInput');
  };

  return (
    <div className="card-container">
      <Card className="card" bodyStyle={{ padding: 0, margin: 0 }}>
        <div className="form-container">
          <h2 className="form-title">Enter Email</h2>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item className="form-input" name="email" rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}>
              <Input prefix={<i className="fa fa-envelope-o" aria-hidden="true"></i>} placeholder="Email *" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="signup-button">
                Send OTP
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default EmailInputPage;

import React, { useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const OtpInputPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;



const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:1337/api/verify-otp', { ...values, email });
      if (response.data && response.data.success) {
        message.success('OTP validated!');
        navigate('/');
      } else {
        message.error('Error:', response.data.message);
      }
    } catch (error) {
      message.error('Error validating OTP:', error.response ? error.response.data.message : error.message);
    }
  };

  

  return (
    <div className="card-container">
      <Card className="card" bodyStyle={{ padding: 0, margin: 0 }}>
        <div className="form-container">
          <h2 className="form-title">Enter OTP</h2>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item className="form-input" name="otp" rules={[{ required: true, message: 'Please input the OTP!' }]}>
              <Input prefix={<i className="fa fa-key" aria-hidden="true"></i>} placeholder="OTP *" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="signup-button">
                Validate OTP
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default OtpInputPage;

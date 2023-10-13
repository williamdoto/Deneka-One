import React, { useState, useEffect } from 'react';
import { Alert, Card, Form, Input, Select, Button, Checkbox, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { API } from '../../constant'; // Ensure API is not redeclared
import { setToken } from '../../helpers';
import videoSrc from '../../assets/media/pexels-andre-moura-4021521.jpg';
import videoSrc2 from '../../assets/media/pexels-ryutaro-tsukata-6249808.jpg';
import 'font-awesome/css/font-awesome.min.css';
import './SignupPage.css';
import logo from '../../assets/media/Deneka-One.png';

const { Option } = Select;

const SignupPage = () => {
  const { setUser } = useAuthContext();
  const [form] = Form.useForm();
  const [currentImage, setCurrentImage] = useState(videoSrc);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => prevImage === videoSrc ? videoSrc2 : videoSrc);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/signup/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',
      });
  
      const data = await response.json();
      if (!response.ok || data?.error) {
        throw new Error(data?.message || 'Failed to sign up');
      }

      const emailResponse = await fetch(`${API}/send-verification-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      });

      if (!emailResponse.ok) {
        const emailErrorData = await emailResponse.json();
        throw new Error(emailErrorData.message || 'Failed to send verification email');
      }

      setToken(data.jwt);
      setUser(data.user);
      message.success(`Welcome to Social Cards ${data.user.username}! Check your email for verification.`);
      navigate('/profile', { replace: true });
    } catch (error) {
      console.error(error);
      setError(error?.message ?? 'Something went wrong!');
      setIsLoading(false);
    }
  };

  return (
    <div className="card-container">
      <Card className="card" bodyStyle={{ padding: 0, margin: 0 }}>
        <div className="card-content">
          <div className="image-container">
            <img className="img" src={currentImage} alt="presentation" />
          </div>
          <div className="form-container">
            <img src={logo} alt="Logo" style={{ width: '100px', display: 'block', margin: '0 auto 10px' }} />
            <h2 className="form-title">Sign Up</h2>
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item className="form-input name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input prefix={<i className="fa fa-user" aria-hidden="true"></i>} placeholder="Name *" />
              </Form.Item>
              <Form.Item className="form-input" name="companyName" rules={[{ required: true, message: 'Please input your company name!' }]}>
                <Input prefix={<i className="fa fa-building-o" aria-hidden="true"></i>} placeholder="Company Name *" />
              </Form.Item>
              <Form.Item className="form-input" name="email" rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}>
                <Input prefix={<i className="fa fa-envelope-o" aria-hidden="true"></i>} placeholder="Email *" />
              </Form.Item>
              <Form.Item className="form-input" name="address" rules={[{ required: true, message: 'Please input your business address!' }]}>
                <Input prefix={<i className="fa fa-map-marker" aria-hidden="true"></i>} placeholder="Business Address" />
              </Form.Item>
              <Form.Item name="location" rules={[{ required: true, message: 'Please select your location!' }]}>
                <Select placeholder="Select Location">
                  <Option value="Sydney">Sydney</Option>
                  <Option value="Melbourne">Melbourne</Option>
                  <Option value="Brisbane">Brisbane</Option>
                </Select>
              </Form.Item>
              <Form.Item name="agreement" valuePropName="checked" rules={[{ required: true, message: 'Please agree to the terms of service and privacy policy!' }]}>
                <Checkbox>
                  I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <div className="signup-button-container">
                  <Button type="primary" htmlType="submit" className="signup-button">
                    Sign Up
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <div className="signin-link">
              <p><a href="/signin">Already have an account? Sign in</a></p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;

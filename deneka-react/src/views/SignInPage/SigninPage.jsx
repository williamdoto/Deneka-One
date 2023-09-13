import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button } from 'antd';
import videoSrc from '../../assets/media/pexels-andre-moura-4021521.jpg';
import videoSrc2 from '../../assets/media/pexels-ryutaro-tsukata-6249808.jpg';
import 'font-awesome/css/font-awesome.min.css';
import './SigninPage.css';

const SigninPage = () => {
  const [form] = Form.useForm();
  const [currentImage, setCurrentImage] = useState(videoSrc);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => prevImage === videoSrc ? videoSrc2 : videoSrc);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    // Here you can handle the form submission, like sending the data to your backend
  };

  return (
    <div className="card-container">
      <Card className="card" bodyStyle={{ padding: 0, margin: 0 }}>
        <div className="card-content">
          <div className="image-container">
            <img className="img" src={currentImage} alt="presentation" />
          </div>
          <div className="form-container">
            <h2 className="form-title">Sign In</h2>
            <Form form={form} onFinish={handleSubmit} layout="vertical" >
              <Form.Item className="form-input" name="email" rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}>
                <Input prefix={<i className="fa fa-envelope-o" aria-hidden="true"></i>} placeholder="Email *" />
              </Form.Item>
              <Form.Item className="form-input" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input prefix={<i className="fa fa-unlock-alt" aria-hidden="true"></i>} placeholder="Password *" />
              </Form.Item>
              <Form.Item>
                <div className="signup-button-container">
                  <Button type="primary" htmlType="submit" className="signup-button">
                    Confirm
                  </Button>
                </div>
                <div className="signin-link">
                  <span onClick={() => { /* your click handler code here */ }}>
                    Forgot Password?
                  </span>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SigninPage;

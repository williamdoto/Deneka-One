import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button } from 'antd';
import videoSrc from '../../assets/media/pexels-andre-moura-4021521.jpg';
import videoSrc2 from '../../assets/media/pexels-ryutaro-tsukata-6249808.jpg';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import './SigninPage.css';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../helpers'; // Make sure the path is correct
import { useAuthContext } from '../../context/AuthContext';



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

  const handleForgotPassword = async () => {
    try {
        const email = form.getFieldValue('email');
        if (!email) {
            console.log('Please provide an email address.');
            return;
        }
        const response = await axios.post('http://localhost:3500/api/request-reset', { email });
        if (response.data && response.data.success) {
            // Handle successful request. Inform the user to check their email for further instructions.
            console.log('Reset link sent:', response.data);
        } else {
            console.log('Error:', response.data.message);
        }
    } catch (error) {
        console.log('Error sending reset link:', error.response ? error.response.data : error.message);
    }
};

const handleEmailInputRedirect = () => {
    navigate('/emailInput');
  };


// ... inside your SigninPage component:
const navigate = useNavigate();
const { setUser } = useAuthContext(); // Destructure setUser from the context

const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:1337/api/signin', values);
  
      if (response.data && response.data.success) {
        // Save the token using the helper function you've already set up
        setToken(response.data.token); // Remove the quotes around response.data.token
  
        // If you're passing user data, update the context
        // setUser(response.data.user); // Uncomment if you're passing user data
        setUser({ isAuthenticated: true });
        // Redirect to the dashboard
        navigate('/totpinput', { state: { email: values.email } });
      } else {
        // Display an error message to the user
        console.log('Error signing in:', response.data.error);
      }
    } catch (error) {
      // Display an error message to the user
      console.error('Sign in error:', error.response ? error.response.data.error : error.message);
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
                  <h2 className="form-title">Sign In</h2>
                  <Form form={form} onFinish={handleSubmit} layout="vertical">
                      <Form.Item className="form-input" name="email" rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}>
                          <Input prefix={<i className="fa fa-envelope-o" aria-hidden="true"></i>} placeholder="Email *" />
                      </Form.Item>
                      <Form.Item className="form-input" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                          <Input.Password prefix={<i className="fa fa-unlock-alt" aria-hidden="true"></i>} placeholder="Password *" />
                      </Form.Item>
                      <Form.Item>
                          <div className="signup-button-container">
                              <Button 
                                  type="primary" 
                                  htmlType="submit" 
                                  className="signup-button"
                              >
                                  Confirm
                              </Button>
                          </div>
                          <div className="signin-link">
                              <span onClick={handleForgotPassword}>
                                  Forgot Password?
                              </span>
                          </div>
                          <div className="signin-link">
                              <span onClick={handleEmailInputRedirect}>
                                  One-Time Password
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

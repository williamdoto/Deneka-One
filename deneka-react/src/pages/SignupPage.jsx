import React, { useState, useEffect } from 'react';
import { Alert, Card, Form, Input, Select, Button, Checkbox, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { API } from '../constant';
import { setToken } from '../helpers';
import videoSrc from '../img_video/pexels-andre-moura-4021521.jpg';
import videoSrc2 from '../img_video/pexels-ryutaro-tsukata-6249808.jpg';
import 'font-awesome/css/font-awesome.min.css';

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
      const response = await fetch(`${API}/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        setToken(data.jwt);
        setUser(data.user);
        message.success(`Welcome to Social Cards ${data.user.username}!`);
        navigate('/profile', { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  // The UI remains unchanged from the first code snippet

  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card bodyStyle={{ padding: 0, margin: 0 }} style={{ width: '800px', height: '650px', borderRadius: '8px' }}>
        <div style={{ display: 'flex', flexWrap: 'nowrap', height: '648px' }}> {/* fixed height here */}
          <div style={{ flex: 6, padding: 0, margin: 0, height: '648px', overflow: 'hidden' }}>
            <img src={currentImage} alt="presentation" style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              borderRadius: '8px 0 0 8px' 
            }} />
          </div>
            <div style={{ flex: 4, padding: '20px', height: '100%' , display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
                <Form form={form} onFinish={onFinish} layout="vertical" >
                  <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                    <div style={{ position: 'relative' }}>
                      <i className="fa fa-user" aria-hidden="true" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'lightgrey', zIndex: 1000 }}></i>
                      <Input style={{ paddingLeft: '30px' }} placeholder="Name *" />
                    </div>
                  </Form.Item>

                  <Form.Item name="companyName" rules={[{ required: true, message: 'Please input your company name!' }]}>
                    <div style={{ position: 'relative' }}>
                      <i className="fa fa-building-o" aria-hidden="true" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'lightgrey', zIndex: 1000 }}></i>
                      <Input style={{ paddingLeft: '30px' }} placeholder="Company Name *" />
                    </div>
                  </Form.Item>
                  <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}>
                    <div style={{ position: 'relative' }}>
                      <i className="fa fa-envelope-o" aria-hidden="true" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'lightgrey', zIndex: 1000 }}></i>
                      <Input style={{ paddingLeft: '30px' }} placeholder="Email *" />
                    </div>
                  </Form.Item>
                  <Form.Item name="address" rules={[{ required: true, message: 'Please input your business address!' }]}>
                    <div style={{ position: 'relative' }}>
                      <i className="fa fa-map-marker" aria-hidden="true" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'lightgrey', zIndex: 1000 }}></i>
                      <Input style={{ paddingLeft: '30px' }} placeholder="Business Address" />
                    </div>
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
                    <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: 'purple', borderColor: 'purple' }}>
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;

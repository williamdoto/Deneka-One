
import { Card, Form, Input, Select, Button, Checkbox } from 'antd';
import React, { useState, useEffect } from 'react';
import videoSrc from '../img_video/pexels-andre-moura-4021521.jpg';  
import videoSrc2 from '../img_video/pexels-ryutaro-tsukata-6249808.jpg';
import 'font-awesome/css/font-awesome.min.css';



const { Option } = Select;

const SignupPage = () => {
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
                <Form form={form} onFinish={handleSubmit} layout="vertical" >
                  <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                    <div style={{ position: 'relative' }}>
                      <i className="fa fa-user" aria-hidden="true" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'lightgrey', zIndex: 1000 }}></i>
                      <Input style={{ paddingLeft: '30px' }} placeholder="Name *" />
                    </div>
                  </Form.Item>

                  <Form.Item label="Company Name" name="companyName" rules={[{ required: true, message: 'Please input your company name!' }]}>
                    <div style={{ position: 'relative' }}>
                      <i className="fa fa-building-o" aria-hidden="true" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'lightgrey', zIndex: 1000 }}></i>
                      <Input style={{ paddingLeft: '30px' }} placeholder="Company Name" />
                    </div>
                  </Form.Item>
                  <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}>
                    <div style={{ position: 'relative' }}>
                      <i className="fa fa-envelope-o" aria-hidden="true" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'lightgrey', zIndex: 1000 }}></i>
                      <Input style={{ paddingLeft: '30px' }} placeholder="Email" />
                    </div>
                  </Form.Item>
                  <Form.Item label="Business Address" name="address" rules={[{ required: true, message: 'Please input your business address!' }]}>
                    <div style={{ position: 'relative' }}>
                      <i className="fa fa-map-marker" aria-hidden="true" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'lightgrey', zIndex: 1000 }}></i>
                      <Input style={{ paddingLeft: '30px' }} placeholder="Business Address" />
                    </div>
                  </Form.Item>
                  <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Please select your location!' }]}>
                    <div style={{ position: 'relative' }}>
                      <i className="fa fa-location-arrow" aria-hidden="true" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' , color: 'lightgrey', zIndex: 1000}}></i>
                      <Select style={{ paddingLeft: '30px' }} placeholder="Select Location">
                        <Option value="Sydney">Sydney</Option>
                        <Option value="Melbourne">Melbourne</Option>
                        <Option value="Brisbane">Brisbane</Option>
                      </Select>
                    </div>
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

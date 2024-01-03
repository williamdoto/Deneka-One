import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button } from 'antd';
import videoSrc from '../../assets/media/pexels-andre-moura-4021521.jpg';
import videoSrc2 from '../../assets/media/pexels-ryutaro-tsukata-6249808.jpg';
import axios from 'axios';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';

const CompanySignupPage = () => {
    const [form] = Form.useForm();
    const [currentImage, setCurrentImage] = useState(videoSrc);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prevImage => prevImage === videoSrc ? videoSrc2 : videoSrc);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (values) => {
        console.log('Form Submission Values:', values);

        try {
            const response = await axios.post('http://localhost:1337/api/company-signup', values);
            if (response.data && response.data.message === "Company signed up successfully") {
                console.log('Company registered:', response.data);
                navigate('/signup'); // Navigate to user sign-up if successful
            } else {
                console.log('Error:', response.data.message);
            }
        } catch (error) {
            console.error('Company registration error:', error.response ? error.response.data : error.message);
        }
    };

    const handleSkip = () => {
        navigate('/signup'); // Navigate to user sign-up page
    };

    return (
        <div className="card-container">
            <Card className="card" bodyStyle={{ padding: 0, margin: 0 }}>
                <div className="card-content">
                    <div className="image-container">
                        <img className="img" src={currentImage} alt="presentation" />
                    </div>
                    <div className="form-container">
                        <h2 className="form-title">Company Sign Up</h2>
                        <Form form={form} onFinish={handleSubmit} layout="vertical">
                            <Form.Item className="form-input" name="companyName" rules={[{ required: true, message: 'Please input your company name!' }]}>
                                <Input placeholder="Company Name *" />
                            </Form.Item>
                            <Form.Item className="form-input" name="abn" rules={[{ required: true, message: 'Please input your ABN!' }]}>
                                <Input placeholder="ABN *" />
                            </Form.Item>
                            <Form.Item className="form-input" name="companyStreet" rules={[{ required: true, message: 'Please input your company street!' }]}>
                                <Input placeholder="Company Street *" />
                            </Form.Item>
                            <Form.Item className="form-input" name="country" rules={[{ required: true, message: 'Please input your country!' }]}>
                                <Input placeholder="Country *" />
                            </Form.Item>
                            <Form.Item className="form-input" name="state" rules={[{ required: true, message: 'Please input your state!' }]}>
                                <Input placeholder="State *" />
                            </Form.Item>
                            <Form.Item className="form-input" name="city" rules={[{ required: true, message: 'Please input your city!' }]}>
                                <Input placeholder="City *" />
                            </Form.Item>
                            <Form.Item className="form-input" name="postCode" rules={[{ required: true, message: 'Please input your post code!' }]}>
                                <Input placeholder="Post Code *" />
                            </Form.Item>
                            <Form.Item>
                                <div className="signup-button-container">
                                    <Button type="primary" htmlType="submit" className="signup-button">Register Company</Button>
                                </div>
                                <div className="skip-link">
                                    <span onClick={handleSkip}>Skip / Already have a Company</span>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CompanySignupPage;

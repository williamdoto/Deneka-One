import React, { useState, Fragment } from 'react';
import { Alert, Button, Card, Form, Input, Select, message, Spin, Row, Col, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { API } from '../constant';
import { setToken } from '../helpers';

const { Option } = Select;

const SignupPage = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <Fragment>
      <Row align="middle">
        <Col span={24}>
          <Card title="Sign Up">
            {error ? (
              <Alert
                className="alert_error"
                message={error}
                type="error"
                closable
                afterClose={() => setError('')}
              />
            ) : null}
            <Form
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item label="Name" name="username" rules={[{ required: true, type: 'string' }]}>
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                <Input placeholder="Email address" />
              </Form.Item>
              <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                <Input.Password placeholder="Password" />
              </Form.Item>
              {/* You can add more form fields here if needed */}
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login_submit_btn">
                  Submit {isLoading && <Spin size="small" />}
                </Button>
              </Form.Item>
            </Form>
            <Typography.Paragraph className="form_help_text">
              Already have an account? <Link to="/signin">Sign In</Link>
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignupPage;

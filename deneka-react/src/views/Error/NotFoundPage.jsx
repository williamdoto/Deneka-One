import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleBackClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div style={{
      background: '#292b4a',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Roboto, sans-serif'
    }}>
      <Result
        status= "404"
        title={
          <div style={{ color: '#fff', fontFamily: 'Pacifico, cursive', fontSize: '3em' }}>
            404
          </div>
        }
        subTitle={
          <div style={{ color: '#fff' }}>
            {isAuthenticated ?
              "Sorry, the page you visited does not exist." :
              "You need to sign in to visit this page."
            }
          </div>
        }
        extra={
          <Button type="primary" onClick={handleBackClick} style={{
            backgroundColor: '#6c5ce7',
            borderColor: '#6c5ce7',
            color: '#fff',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'bold'
          }}>
            {isAuthenticated ? "Go to Dashboard" : "Sign In"}
          </Button>
        }
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default NotFoundPage;

// NotFoundPage.jsx
import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
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
        status="404"
        title={
          <div style={{ color: '#fff', fontFamily: 'Pacifico, cursive', fontSize: '3em' }}>
            404
          </div>
        }
        subTitle={
          <div style={{ color: '#fff' }}>
            Sorry, the page you visited does not exist.
          </div>
        }
        extra={
          <Link to="/">
            <Button type="primary" style={{
              backgroundColor: '#6c5ce7',
              borderColor: '#6c5ce7',
              color: '#fff',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 'bold'
            }}>
              Back Home
            </Button>
          </Link>
        }
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default NotFoundPage;

// SetupTOTPPage.jsx

import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SetupTOTPPage = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const location = useLocation();
  const userEmail = location.state?.email;

  useEffect(() => {
    // Call your backend to get the QR code URL
    axios.post('http://localhost:1337/api/setup-totp', { email: userEmail })

      .then(response => {
        if (response.data && response.data.qrCodeUrl) {
          setQrCodeUrl(response.data.qrCodeUrl);
        } else {
          // Handle case where qrCodeUrl is not in the response
          console.error('QR Code URL not received:', response.data);
        }
      })
      .catch(error => {
        message.error('Error fetching QR code: ' + error);
      });
  }, []);
  

  return (
    <Card title="Setup TOTP">
      <p>Scan this QR code with your authenticator app or enter the key manually:</p>
      {qrCodeUrl && <img src={qrCodeUrl} alt="TOTP QR Code" />}
      {/* Add more UI elements as needed */}
    </Card>
  );
};

export default SetupTOTPPage;

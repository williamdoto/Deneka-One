import React, { useState, useEffect } from 'react';
import { Card, Button, message } from 'antd';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SetupTOTPPage = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [totpSecret, setTotpSecret] = useState('');
  const location = useLocation();
  const userEmail = location.state?.email;

  useEffect(() => {
    axios.post('http://localhost:1337/api/setup-totp', { email: userEmail })
      .then(response => {
        if (response.data && response.data.qrCodeUrl) {
          setQrCodeUrl(response.data.qrCodeUrl);
          setTotpSecret(response.data.plainSecret);
        } else {
          console.error('QR Code URL not received:', response.data);
        }
      })
      .catch(error => {
        message.error('Error fetching QR code: ' + error);
      });
  }, [userEmail]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(totpSecret)
      .then(() => {
        message.success('Secret Key Copied!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        message.error('Failed to copy secret key.');
      });
  };

  return (
    <Card title="Setup TOTP">
      <p>Scan this QR code with your authenticator app or enter the key manually:</p>
      {qrCodeUrl && <img src={qrCodeUrl} alt="TOTP QR Code" />}
      {totpSecret && (
        <div>
          <strong>Secret Key:</strong> {totpSecret}
          <Button onClick={copyToClipboard} style={{ marginLeft: 10 }}>Copy Secret</Button>
        </div>
      )}
    </Card>
  );
};

export default SetupTOTPPage;

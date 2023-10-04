// FloatButton.jsx (or wherever your FloatButton component is defined)

import React from 'react';
import { Tooltip, Button } from 'antd';

const FloatButton = ({ tooltip, logo }) => {
  return (
    <Tooltip title={tooltip}>
      <Button type="primary" shape="circle" icon={logo} style={floatButtonStyle} />
    </Tooltip>
  );
};

const floatButtonStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
};

export default FloatButton;

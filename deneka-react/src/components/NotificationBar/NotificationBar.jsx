import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import {
  PushpinOutlined,
  PushpinFilled,
} from '@ant-design/icons';

const NotificationBar = ({ visible, onClose, placement }) => {
  const [mask, setMask] = useState(true); // set initial state for mask

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Notifications</span>
          <Button
            type="text"
            icon={mask ? <PushpinOutlined /> : <PushpinFilled />}
            onClick={() => setMask(!mask)} // toggle mask state on icon click
          />
        </div>
      }
      placement={placement}
      onClose={onClose}
      closable={true}
      visible={visible}
      mask={mask} // set mask prop from state
    >
      {/* Your notification content here */}
      <p>Some contents...</p>
    </Drawer>
  );
};

export default NotificationBar;

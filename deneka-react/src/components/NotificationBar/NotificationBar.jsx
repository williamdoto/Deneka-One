import React, { useState, useRef, useEffect } from 'react';
import { Drawer, Button } from 'antd';
import {
  PushpinOutlined,
  PushpinFilled,
} from '@ant-design/icons';

const NotificationBar = ({ visible, onClose, placement, onPin, setDrawerWidth }) => {
  const [mask, setMask] = useState(true); // set initial state for mask
  const [pinned, setPinned] = useState(false); // New state to track whether the drawer is pinned

  const drawerRef = useRef(null);

  useEffect(() => {
    if (drawerRef.current) {
      const width = drawerRef.current.clientWidth || drawerRef.current.offsetWidth;
      setDrawerWidth(width);
    }
  }, [visible, setDrawerWidth]);

  const handlePin = () => {
    setPinned(!pinned);
    setMask(pinned); // Update the mask when pinned state changes
    onPin(!pinned);
  };


  return (
    <Drawer
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <span>Notifications</span>
          <Button
            type="text"
            icon={pinned ? <PushpinFilled /> : <PushpinOutlined />}
            onClick={handlePin} // toggle pinned state on icon click
          />
        </div>
      }
      placement={placement}
      onClose={onClose}
      closable={true}
      visible={visible}
      mask={!pinned} // Set mask based on pinned state
      getContainer={false} // This prop allows the drawer to be a sibling to the content
      style={{ position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 0.88)' }} // Set position to absolute
      ref={drawerRef}
      
    >
      {/* Your notification content here */}
      <p>Some contents...</p>
    </Drawer>
  );
};

export default NotificationBar;

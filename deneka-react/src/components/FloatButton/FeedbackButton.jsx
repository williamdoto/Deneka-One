import React from 'react';

import { MessageTwoTone } from '@ant-design/icons';
import {FloatButton, Popover} from "antd";

const FeedbackButton = ({ shouldHideBars, isDarkMode, isSidebarRight }) => {
  const buttonStyle = {
    bottom:'24px',
    right: isSidebarRight ? 'initial' : '24px', 
    left: isSidebarRight ? '24px' : 'initial', 
    boxShadow: isDarkMode ? '0px 2px 10px 0px #ffff' : '0px 2px 10px 0px #000000'
  };

  return (
    !shouldHideBars && 
      <Popover 
        content={
          <>
            <textarea placeholder="Provide feedback..." style={{ width: '200px', height: '100px' }} />
            {/* other content */}
          </>
        } 
        title="Feedback" 
        trigger="click"
      >
        <FloatButton 
          shape="circle"
          icon={<MessageTwoTone></MessageTwoTone>}
          tooltip={<div>Chat</div>} 
          style={buttonStyle}
        />
      </Popover>
  );
};
export default FeedbackButton;
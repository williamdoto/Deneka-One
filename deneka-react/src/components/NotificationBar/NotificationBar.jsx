import React, { useState, useRef, useEffect } from 'react';
import { Drawer, Card, Button, List, Avatar, Timeline, Typography } from "antd";
import { PushpinOutlined, PushpinFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNotificationBarPinned } from '../../redux/slices/uiSlice';
import Paragraph from "antd/lib/typography/Paragraph";

const NotificationBar = ({ visible, onClose, placement }) => {
  const dispatch = useDispatch();
  const { notificationBarPinned: pinned } = useSelector((state) => state.ui);
  const [modifiedBackgroundColor, setModifiedBackgroundColor] = useState('');
  const drawerRef = useRef(null);

  useEffect(() => {
    if (visible && drawerRef.current) {
      const bgColor = window.getComputedStyle(drawerRef.current).backgroundColor;
      const match = bgColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      if (match) {
        setModifiedBackgroundColor(`rgba(${match[1]}, ${match[2]}, ${match[3]}, 0.82)`);
      }
    }
  }, [visible]);

  const handlePin = () => {
    dispatch(toggleNotificationBarPinned());
  };

  const data = [
    {
      title: "Sophie B.",
      // avatar: convesionImg,
      description: "Hi! I need more information…",
    },
    {
      title: "Anne Marie",
      // avatar: convesionImg2,
      description: "Awesome work, can you…",
    },
    {
      title: "Ivan",
      // avatar: convesionImg3,
      description: "About files I can…",
    },
    {
      title: "Peterson",
      // avatar: convesionImg4,
      description: "Have a great afternoon…",
    },
    {
      title: "Nick Daniel",
      // avatar: convesionImg5,
      description: "Hi! I need more information…",
    },
  ];

  const issuedTickets = [
    {
      title: "Reported Bug in App",
      category: "Bug",
      time: "09 JUN 7:20 PM",
      color: "green",
    },
    {
      title: "Marketplace Inquiry",
      category: "Marketplace",
      time: "08 JUN 12:20 PM",
      color: "green",
    },
    {
      title: "Server Connectivity Issue",
      category: "Technical",
      time: "04 JUN 3:10 PM",
    },
    {
      title: "Add New Feature Request",
      category: "Feature Request",
      time: "02 JUN 2:45 PM",
    },
    {
      title: "Development Assistance Request",
      category: "Technical",
      time: "18 MAY 1:30 PM",
    },
    {
      title: "Order Status Inquiry",
      category: "Marketplace",
      time: "14 MAY 3:30 PM",
      color: "gray",
    },
  ];

  const { Title, Text } = Typography;

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Notifications</span>
          <Button
            type="text"
            icon={pinned ? <PushpinFilled /> : <PushpinOutlined />}
            onClick={handlePin}
          />
        </div>
      }
      placement={placement}
      onClose={() => {
        onClose();
        if (pinned) dispatch(toggleNotificationBarPinned());
      }}
      closable={true}
      visible={visible}
      mask={!pinned}
      getContainer={false}
      style={{ position: 'absolute', backgroundColor: modifiedBackgroundColor }}
      ref={drawerRef}
    >
      
      {/* Your notification content here */}
      <Card
          bordered={false}
          title={<p className="font-semibold m-0">Messages</p>}
          className="header-solid h-full"
          bodyStyle={{ paddingTop: 0, paddingBottom: 16, marginBottom: 50 }}
        >
          <List
            itemLayout="horizontal"
            dataSource={data}
            split={false}
            className="conversations-list"
            renderItem={(item) => (
              <List.Item actions={[<Button type="link">REPLY</Button>]}>
                <List.Item.Meta
                  avatar={
                    <Avatar shape="square" size={30} src={"favicon.ico"} />
                  }
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
      </Card>

      <Card
          bordered={false}
          title={<p className="font-semibold m-0">Activity Feeds</p>}
          className="header-solid h-full"
          bodyStyle={{ paddingTop: 0, paddingBottom: 16, marginBottom: 50}}
        >
          <List
            itemLayout="horizontal"
            dataSource={data}
            split={false}
            className="conversations-list"
            renderItem={(item) => (
              <List.Item actions={[<Button type="link">REPLY</Button>]}>
                <List.Item.Meta
                  avatar={
                    <Avatar shape="square" size={30} src={"logo512.png"} />
                  }
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Card>

        <Card 
          bordered={false}
          title={<p className="font-semibold m-0">Issued Tickets</p>}
          className="header-solid h-full"
          bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <div className="timeline-box">
              {/* <Title level={5}>Issued Tickets</Title> */}
              <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                this month <span className="bnb2">20%</span>
              </Paragraph>

              <Timeline
                // pending="Recording..."
                className="timelinelist"
                // reverse={reverse}
              >
                {issuedTickets.map((t, index) => (
                  <Timeline.Item color={t.color} key={index}>
                    <div>
                      <Title level={5}>{t.title}</Title>
                      <Text level={5} className="category-label">
                        {t.category}
                      </Text>
                    </div>
                    <Text>{t.time}</Text>
                  </Timeline.Item>
                ))}
              </Timeline>
              {/* <Button
                type="primary"
                className="width-100"
                onClick={() => setReverse(!reverse)}
              >
                {<MenuUnfoldOutlined />} REVERSE
              </Button> */}
            </div>
        </Card>
    </Drawer>
  );
};

export default NotificationBar;

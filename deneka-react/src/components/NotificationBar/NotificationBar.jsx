import React, { useState, useRef, useEffect } from 'react';
import {
  Drawer,
  Card,
  Button,
  List,
  Avatar,
  Timeline,
  Typography
} from "antd";

import Paragraph from "antd/lib/typography/Paragraph";

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
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

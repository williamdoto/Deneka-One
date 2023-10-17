import React from 'react'
import "./HomePage.css"

import DashboardBanner from './DashboardBanner';
import LineChart from "../components/chart/LineChart";

import { DollarOutlined, ShoppingOutlined, TeamOutlined, RiseOutlined} from '@ant-design/icons';

import {
  Card,
  Col,
  Row,
  Typography,
  Avatar,
  Radio
} from "antd";

const HomePage = () => {

  const { Title, Text } = Typography;

  
  const count = [
    {
      today: "Today’s Sales",
      title: "$53,000",
      persent: "+30%",
      icon: <DollarOutlined spin={false} style={{ fontSize: '25px' }} />,
      bnb: "bnb2",
    },
    {
      today: "Today’s Customers",
      title: "3,200",
      persent: "+20%",
      icon: <TeamOutlined spin={false} style={{ fontSize: '25px' }} />,
      bnb: "bnb2",
    },
    {
      today: "New Customers",
      title: "+1,200",
      persent: "-20%",
      icon: <RiseOutlined spin={false} style={{ fontSize: '25px' }} />,
      bnb: "redtext",
    },
    {
      today: "New Orders",
      title: "$13,200",
      persent: "10%",
      icon: <ShoppingOutlined spin={false} style={{ fontSize: '25px' }} />,
      bnb: "bnb2",
    },
  ];

  return (
    <div>
      <DashboardBanner />

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col className="col-info">
              <Avatar.Group>

                <div className="avatar-info">
                  <Avatar size={40} shape="square" src={"logo192.png"} />
                  <h6 className="font-semibold m-0">Please confirm your email address!</h6>
                  <p>If you didn't receive an email from us yet, you can resend email. We will contact you on the following address: sinef49551@ksyhtc.com
                      Wrong email address? You can change your email here.</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={0}
              md={0}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Radio.Group defaultValue="a">
                <Radio.Button value="a">OVERVIEW</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        }
      ></Card>


      <Row className="p-30" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
            >
              <Card bordered={true} className="criclebox">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={5}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>


        <Row className="p-30" gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={15}>
            <Card bordered={false} className="criclebox">
              <LineChart />

            </Card>
          </Col>
          {/* <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24"> */}
          <Col xs={24} sm={24} md={24} lg={24} xl={8}>

            <Card bordered={true} className="criclebox">
              {/* <Echart /> */}
              <p> Some </p>
            </Card>
          </Col>
        </Row>

    </div>
  )
}

export default HomePage
import React from 'react'
import "./HomePage.css"

import DashboardBanner from './DashboardBanner';
import LineChart from "../components/chart/LineChart";
import PricingCard from "../components/Card/PricingCard";
// import Carousel3d from "../components/Carousel/Carousel";

import { DollarOutlined, ShoppingOutlined, TeamOutlined, RiseOutlined} from '@ant-design/icons';
import { PlusOutlined, ExclamationOutlined } from "@ant-design/icons";

import {
  Card,
  Col,
  Row,
  Typography,
  Avatar,
  Radio,
  Statistic,
  List,
  Switch,
  Descriptions,
  Button
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
  CheckOutlined
} from "@ant-design/icons";

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


  const calender = [
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
        fill="#111827"
        className="fill-muted"
      ></path>
    </svg>,
  ];
  const mins = [
    <svg
      width="10"
      height="10"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 10C5 9.44772 5.44772 9 6 9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11L6 11C5.44772 11 5 10.5523 5 10Z"
        className="fill-danger"
      ></path>
    </svg>,
  ];
  const newest = [
    {
      headding: <h6>NEWEST</h6>,
      avatar: mins,
      title: "Netflix",
      description: "27 March 2021, at 12:30 PM",
      amount: "- $2,500",
      textclass: "text-light-danger",
      amountcolor: "text-danger",
    },
    {
      headding: <h6>NEWEST</h6>,
      avatar: mins,
      title: "Netflix",
      description: "27 March 2021, at 12:30 PM",
      amount: "- $2,500",
      textclass: "text-light-danger",
      amountcolor: "text-danger",
    },
    {
      headding: <h6>NEWEST</h6>,
      avatar: mins,
      title: "Netflix",
      description: "27 March 2021, at 12:30 PM",
      amount: "- $2,500",
      textclass: "text-light-danger",
      amountcolor: "text-danger",
    },
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: "Apple",
      description: "27 March 2021, at 04:30 AM",
      amount: "+ $2,000",
      textclass: "text-fill",
      amountcolor: "text-success",
    },
  ];
  const yesterday = [
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: "Stripe",
      description: "26 March 2021, at 12:30 AM",
      amount: "+ $750",
      textclass: "text-fill",
      amountcolor: "text-success",
    },
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: "HubSpot",
      description: "26 March 2021, at 11:30 AM",
      amount: "+ $1,050",
      textclass: "text-fill",
      amountcolor: "text-success",
    },
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: "Creative Tim",
      description: "26 March 2021, at 07:30 AM",
      amount: "+ $2,400",
      textclass: "text-fill",
      amountcolor: "text-success",
    },
    {
      avatar: <ExclamationOutlined style={{ fontSize: 10 }} />,
      title: "Webflow",
      description: "26 March 2021, at 04:00 AM",
      amount: "Pending",
      textclass: "text-warning",
      amountcolor: "text-warning-b",
    },
  ];


  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];



  return (
    <div>
      <DashboardBanner />

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" className="flex-col" align="middle" gutter={[24, 0]}>
            <Col className="col-info">
              <Avatar.Group>

                <div className="avatar-info">
                  <Avatar size={40} shape="square" src={"logo192.png"} />
                  <h6 className="fs-16 semi-bold">Please Complete Your Profile!</h6>
                  <p>If you didn't complete, you'll miss out our key features.</p>
                </div>
              </Avatar.Group>

              {/* <Radio.Group defaultValue="a">
                <Radio.Button value="a">OVERVIEW</Radio.Button>
              </Radio.Group>
              <Radio.Group defaultValue="a">
                <Radio.Button value="a">OVERVIEW</Radio.Button>
              </Radio.Group>
              <Radio.Group defaultValue="a">
                <Radio.Button value="a">OVERVIEW</Radio.Button>
              </Radio.Group> */}
            </Col>
            <Col
              span={0}
              md={0}
              style={{
                display: "block",
                
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
              <Card
                // title={wifi}
                bordered={false}
                className="card-credit header-solid h-ful"
              >
                <h5 className="card-number">Some Statistics</h5>

                <div className="card-footer">
                  <div className="mr-30">
                    <p>Card Holder</p>
                    <h6>Jack Peterson</h6>
                  </div>
                  <div className="mr-30">
                    <p>Expires</p>
                    <h6>11/22</h6>
                  </div>
                  <div className="card-footer-col col-logo ml-auto">
                    <img src={"logo512.png"} alt="mastercard" />
                  </div>
                </div>
              </Card>

              <Card bordered={false} className="widget-2 h-full mb-10">
                <Statistic
                  title={
                    <>
                      {/* <div className="icon">{angle}</div> */}
                      <h6>Revenue</h6>
                      <p>Belong Interactive</p>
                    </>
                  }
                  value={"$2,000"}
                  valueStyle={{ color: '#3f8620' }}
                  prefix={<PlusOutlined />}
                />
              </Card>


              <Card bordered={false} className="widget-2 h-full">
                <Statistic
                  title={
                    <>
                      <div className="icon">
                        {/* <img src={paypal} alt="paypal" /> */}
                      </div>
                      <h6>Expense</h6>
                      <p>Freelance Payments</p>
                    </>
                  }
                  value={"$49,000"}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<PlusOutlined />}
                />
              </Card>
            </Card>
          </Col>
        </Row>

        {/* <Carousel3d /> */}


        <Row className="p-30" gutter={[24, 0]}>
          
          <Col xs={24} sm={24} md={24} lg={24} xl={15} className="">
            <Card
              bordered={true}
              bodyStyle={{ paddingTop: 0 }}
              className="header-solid h-full  ant-list-yes criclebox"
              title={<h5 className="font-semibold m-0">Your Top 10 Activities</h5>}
              extra={
                <p className="card-header-date">
                  {calender}
                  {/* <span>23 - 30 Oct 2023</span> */}
                </p>
              }
            >
              <List
                header={<h6>NEWEST</h6>}
                className="transactions-list ant-newest"
                itemLayout="horizontal"
                dataSource={newest}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar size="small" className={item.textclass}>
                          {item.avatar}
                        </Avatar>
                      }
                      title={item.title}
                      description={item.description}
                    />
                    <div className="amount">
                      <span className={item.amountcolor}>{item.amount}</span>
                    </div>
                  </List.Item>
                )}
              />

              
            </Card>
          </Col>


          <Col span={24} md={8} className="mb-24">
            <Card
              bordered={true}
              className="header-solid card-profile-information criclebox"
              bodyStyle={{ paddingTop: 0, paddingBottom: 16}}
            >
              <div className="package-title">
                  Starter Package
              </div>
              
              <div className=""> 
                  <div className="pricing-tag">
                    $100/month
                  </div>
                  <div className="pricing-desc">Discover what services are available to quick start your company</div>
              </div>
              <hr className="my-25" />
              <Descriptions>
                <Descriptions.Item span={3}>
                  <CheckOutlined className="color-green" /> 15GB Drive Storage
                </Descriptions.Item>
                <Descriptions.Item span={3}>
                  <CheckOutlined className="color-green" /> Unlimited email
                </Descriptions.Item>
                <Descriptions.Item span={3}>
                  <CheckOutlined className="color-green" /> Access to Shared Drive
                </Descriptions.Item>
                <Descriptions.Item span={3}>
                  <CheckOutlined className="color-green" /> Remote Monitoring & Management (RMM)
                </Descriptions.Item>
                
              </Descriptions>
              <Button className="w-100">Getting Started</Button>

            </Card>
        </Col>
      </Row>

    </div>
  )
}

export default HomePage
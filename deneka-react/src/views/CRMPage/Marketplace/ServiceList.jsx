// // components/ServiceList.js

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Table, Spin, Alert } from 'antd';
// import { fetchServices } from '../../redux/slices/servicesSlice';

// const ServiceList = () => {
//   const dispatch = useDispatch();
//   const {  services, loading, error } = useSelector((state) => state.services);

//   useEffect(() => {
//     dispatch(fetchServices());
//   }, [dispatch]);


//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//     },
//     {
//       title: 'Price',
//       dataIndex: 'price',
//       key: 'price',
//     },
//     {
//       title: 'Categories',
//       dataIndex: 'categories',
//       key: 'categories',
//       render: categories => categories.map(cat => cat.name).join(', '),
//     },
//   ];

//   return (
//     <div>
//       {loading && <Spin />}
//       {error && <Alert message={error} type="error" />}
//       {!loading && !error && (
//         <Table dataSource={services} columns={columns} rowKey="id" />
//       )}
//     </div>
//   );
// };

// export default ServiceList;

import CustomCard from './CustomCard';
import React, { useState } from 'react';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Table, Tag, Card, Col, Row, Radio, Pagination } from 'antd';
import './ServiceList.css'; // Import the CSS file for custom styles 
const { Meta } = Card; // Add this line to import Meta


const ServiceList = () => {
  const [viewType, setViewType] = useState('table'); // Default to table view

  const handleViewChange = (e) => {
    setViewType(e.target.value);
  };

  // Sample static data for offline testing
  const services = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Full stack web development services with a focus on modern technologies and best practices.',
      price: '1000',
      categories: [{ name: 'Development' }, { name: 'Web' }],
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    {
      id: 2,
      title: 'Graphic Design',
      description: 'Creative graphic design services for branding, marketing materials, and digital assets.',
      price: '500',
      categories: [{ name: 'Design' }, { name: 'Graphics' }],
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    // Add more sample services as needed
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Categories',
      key: 'categories',
      dataIndex: 'categories',
      render: categories => (
        <>
          {categories.map(cat => (
            <Tag color="blue" key={cat.name}>
              {cat.name.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    // Optional: Add more columns as needed
  ];
  const cardView = (
    <div>
      <Row gutter={16}>
        {services.map(service => (
          <Col key={service.id} span={4}>
            <CustomCard {...service} />
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
  
  
  
  
  
  
  

  const tableView = (
    <Table
      dataSource={services}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      scroll={{ x: 1000 }} // Adjust the scroll width as needed for responsiveness
    />
  );

  return (
    <div style={{ padding: '15px' }}>
      
      <Row justify="end"style={{ marginBottom: '15px' }}>
        <Col>
          <Radio.Group
            value={viewType}
            onChange={handleViewChange}
            buttonStyle="solid"
          >
            <Radio.Button value="table">Table</Radio.Button>
            <Radio.Button value="card">Card</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>

      {/* Render the selected view */}
      {viewType === 'table' ? tableView : cardView}
    </div>
  );
};

export default ServiceList;

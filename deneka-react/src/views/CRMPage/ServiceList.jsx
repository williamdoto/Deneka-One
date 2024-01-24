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


import React from 'react';
import { Table, Tag, Space } from 'antd';
import './ServiceList.css'; // Import the CSS file for custom styles 

const ServiceList = () => {
  // Sample static data for offline testing
  const services = [
    {
      id: 1,
      name: 'Web Development',
      description: 'Full stack web development services',
      price: '1000',
      categories: [{ name: 'Development' }, { name: 'Web' }],
    },
    {
      id: 2,
      name: 'Graphic Design',
      description: 'Creative graphic design services',
      price: '500',
      categories: [{ name: 'Design' }, { name: 'Graphics' }],
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

  return (
    <div style={{ padding: '20px' }}>
      <Table 
        dataSource={services} 
        columns={columns} 
        rowKey="id" 
        pagination={{ pageSize: 10 }} 
        scroll={{ x: 1000 }} // Adjust the scroll width as needed for responsiveness
      />
    </div>
  );
};


export default ServiceList;

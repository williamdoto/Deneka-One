import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spin, Alert } from 'antd';
import './CategoryList.css'; // Import your custom CSS

const CategoryList = () => {
  const [categories, setCategories] = useState([
    // Sample data
    { id: 1, name: 'Web Development', servicesCount: 15 },
    { id: 2, name: 'Graphic Design', servicesCount: 8 },
    { id: 3, name: 'Digital Marketing', servicesCount: 12 },
    // Add more sample categories as needed
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Uncomment and use this useEffect in production to fetch data from API
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get('https://yourapi.com/categories');
  //       setCategories(response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Total Services',
      dataIndex: 'servicesCount',
      key: 'servicesCount',
      sorter: (a, b) => a.servicesCount - b.servicesCount,
    },
    // You can add more columns as needed
  ];

  return (
    <div style={{ padding: '20px' }}>
      {loading && <Spin />}
      {error && <Alert message={error} type="error" />}
      {!loading && !error && (
        <Table 
          dataSource={categories} 
          columns={columns} 
          rowKey="id" 
          pagination={{ pageSize: 10 }} 
          scroll={{ x: 1000 }} // Adjust the scroll width as needed for responsiveness
        />
      )}
    </div>
  );
};

export default CategoryList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spin, Alert, Tag, Card, Col, Row, Radio, Pagination } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
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
  const [viewType, setViewType] = useState('table'); // Default to table view

  useEffect(() => {
    // Uncomment and use this useEffect in production to fetch data from API
    // const fetchCategories = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await axios.get('https://yourapi.com/categories');
    //     setCategories(response.data);
    //     setLoading(false);
    //   } catch (err) {
    //     setError(err.message);
    //     setLoading(false);
    //   }
    // };
    // fetchCategories();
  }, []);

  const handleViewChange = (e) => {
    setViewType(e.target.value);
  };

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

  const cardView = (
    <div>
      <Row gutter={16}>
        {categories.map(category => (
          <Col key={category.id} span={8}>
            <Card title={category.name} style={{ marginBottom: '16px' }}>
              <p>Total Services: {category.servicesCount}</p>
            </Card>
          </Col>
        ))}
      </Row>
      {/* Add pagination for card view */}
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );

  const tableView = (
    <Table
      dataSource={categories}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      scroll={{ x: 1000 }} // Adjust the scroll width as needed for responsiveness
    />
  );

  return (
    <div style={{ padding: '15px' }}>
      <Row justify="end" style={{ marginBottom: '15px' }}>
        <Col>
          <Radio.Group
            value={viewType}
            onChange={handleViewChange}
            buttonStyle="solid"
          >
            <Radio.Button value="table" icon={<UnorderedListOutlined />}>Table View</Radio.Button>
            <Radio.Button value="card" icon={<AppstoreOutlined />}>Card View</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>

      {/* Render the selected view */}
      {viewType === 'table' ? tableView : cardView}
    </div>
  );
};

export default CategoryList;

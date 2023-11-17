import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Select, Spin, message, Typography, Row, Col, Space } from 'antd';
const { Title } = Typography;
const AddService = () => {
  const [serviceName, setServiceName] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://yourapi.com/categories');
        setCategories(response.data);
      } catch (err) {
        message.error('Error fetching categories');
      }
    };

    fetchCategories();
  }, []);

  const CreateService = async () => {
    setLoading(true);
    try {
      const serviceResponse = await axios.post('https://yourapi.com/services', {
        name: serviceName,
        description: serviceDesc,
        price: servicePrice
      });

      const serviceId = serviceResponse.data.id; // Assuming the response contains the service ID

      await Promise.all(selectedCategories.map(catId =>
        axios.post(`https://yourapi.com/services/${serviceId}/categories/${catId}`)
      ));

      message.success('Service and categories associations created successfully');
    } catch (err) {
      message.error('Error creating service or associations');
    }
    setLoading(false);
  };
  return (
    <div>
      <Row justify="center">
        <Col span={12}>
          <Title level={5} style={{ textAlign: 'center', margin: '20px 0' }}>Create a Service</Title>
          {loading ? (
            <Spin size="large" />
          ) : (
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <Input
                placeholder="Service Name"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
              <Input.TextArea
                placeholder="Service Description"
                value={serviceDesc}
                onChange={(e) => setServiceDesc(e.target.value)}
              />
              <Input
                placeholder="Service Price"
                type="number"
                value={servicePrice}
                onChange={(e) => setServicePrice(e.target.value)}
              />
              <Select
                mode="multiple"
                placeholder="Select Categories"
                style={{ width: '100%' }}
                onChange={values => setSelectedCategories(values)}
              >
                {categories.map(category => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
              <Button type="primary" onClick={CreateService} style={{ width: '100%' }}>
                Create Service
              </Button>
            </Space>
          )}
        </Col>
      </Row>
    </div>
  );
};
export default AddService;

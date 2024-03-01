import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Input, Button, Select, Spin, message, Typography, Row, Col, Space, Form } from 'antd';
import { 
  setServiceName, 
  setServiceDesc, 
  setServicePrice, 
  setSelectedCategories, 
  setCategories, 
  addNewService 
} from '../../../redux/slices/servicesSlice';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const AddService = () => {
  const dispatch = useDispatch();
  const { serviceName, serviceDesc, servicePrice, categories, selectedCategories, addLoading } = useSelector((state) => state.services.addingService);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://yourapi.com/categories');
        dispatch(setCategories(response.data));
      } catch (err) {
        message.error('Error fetching categories');
      }
    };

    fetchCategories();
  }, [dispatch]);

  const handleCreateService = async (values) => {
    dispatch(addNewService({
      name: values.serviceName,
      description: values.serviceDesc,
      price: values.servicePrice,
      categories: values.selectedCategories
    }));
  };

  return (
    <div>
      <Row justify="center">
        <Col xs={24} md={12} lg={8}>
          <Title level={3} style={{ textAlign: 'center', marginTop: 20 }}>Create a New Service</Title>
          <Paragraph type="secondary" style={{ textAlign: 'center' }}>
            Fill in the details below to add a new service.
          </Paragraph>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateService}
            initialValues={{
              serviceName: '',
              serviceDesc: '',
              servicePrice: '',
              selectedCategories: [],
            }}
          >
            {addLoading ? <Spin size="large" /> : (
              <Space direction="vertical" size="middle" style={{ width: '100%', padding: 20 }}>
                <Form.Item
                  label="Service Name"
                  name="serviceName"
                  rules={[{ required: true, message: 'Please input the service name!' }]}
                >
                  <Input placeholder="Service Name" />
                </Form.Item>
                <Form.Item
                  label="Service Description"
                  name="serviceDesc"
                  rules={[{ required: true, message: 'Please input the service description!' }]}
                >
                  <Input.TextArea placeholder="Service Description" />
                </Form.Item>
                <Form.Item
                  label="Service Price"
                  name="servicePrice"
                  rules={[{ required: true, message: 'Please input the service price!' }]}
                >
                  <Input placeholder="Service Price" type="number" />
                </Form.Item>
                <Form.Item
                  label="Select Categories"
                  name="selectedCategories"
                >
                  <Select
                    mode="multiple"
                    placeholder="Select Categories"
                  >
                    {categories.map(category => (
                      <Option key={category.id} value={category.id}>
                        {category.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  Create Service
                </Button>
              </Space>
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AddService;

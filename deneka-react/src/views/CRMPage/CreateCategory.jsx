import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Form, message } from 'antd';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post('https://yourapi.com/categories', {
        name: categoryName,
      });
      message.success('Category Created Successfully');
      setCategoryName('');
      setLoading(false);
    } catch (err) {
      message.error('Error creating category: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h5>Create a Category</h5>
      <Form onFinish={handleSubmit}>
        <Form.Item
          label="Category Name"
          name="categoryName"
          rules={[{ required: true, message: 'Please input the category name!' }]}
        >
          <Input
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCategory;

// CustomCard.jsx
import React from 'react';
import { Card, Tag } from 'antd';
const { Meta } = Card;

const CustomCard = ({ title, imageUrl, description, price, categories }) => (
  <Card
    hoverable
    style={{ marginBottom: '16px', width: 250 }}
    cover={<img alt={title} src={imageUrl} style={{ height: '120px', objectFit: 'cover' }} />}
  >
    <Meta
      title={title}
      description={
        <div>
          <p>{description}</p>
          {price ? <p>Price: {price}</p> : <p></p>}
          <div>
            {categories ? categories.map(cat => (
              <Tag color="blue" key={cat.name} style={{ margin: '0px 0' }}>
                {cat.name.toUpperCase()}
              </Tag>
            )) : <p></p>}
          </div>
        </div>
      }
    />
  </Card>
);

export default CustomCard;

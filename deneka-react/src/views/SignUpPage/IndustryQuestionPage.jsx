import React from 'react';
import { Card, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import './QuestionPage.css'; // Ensure your CSS file contains the required styles

const options = [
  { label: 'Manufacturing', icon: <i className="fa fa-industry" aria-hidden="true"></i> },
  { label: 'Retail', icon: <i className="fa fa-shopping-bag" aria-hidden="true"></i> },
  { label: 'Technology', icon: <i className="fa fa-laptop" aria-hidden="true"></i> },
  { label: 'Healthcare', icon: <i className="fa fa-heartbeat" aria-hidden="true"></i> },
  { label: 'Finance/Banking', icon: <i className="fa fa-university" aria-hidden="true"></i> },
  { label: 'Education', icon: <i className="fa fa-graduation-cap" aria-hidden="true"></i> },
  { label: 'Government', icon: <i className="fa fa-university" aria-hidden="true"></i> },
  { label: 'Service Industry', icon: <i className="fa fa-concierge-bell" aria-hidden="true"></i> },
  { label: 'Other', icon: <i className="fa fa-ellipsis-h" aria-hidden="true"></i> }
];

const IndustryQuestionPage = ({ onAnswer, onSkip, onBack }) => {
  return (
    <div className="question-page-container">
      <div className="top-bar">
        <Button icon={<LeftOutlined />} type="text" onClick={onBack}>Back</Button>
        <Button type="text" onClick={onSkip}>Skip</Button>
      </div>
      <Card className="question-card">
        <h2 className="question-title">Which industry do you belong to?</h2>
        <div className="options-container">
          {options.map((option, index) => (
            <Button 
              key={index} 
              className="option-button" 
              onClick={() => onAnswer('industry', option.label)}
              icon={option.icon}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default IndustryQuestionPage;

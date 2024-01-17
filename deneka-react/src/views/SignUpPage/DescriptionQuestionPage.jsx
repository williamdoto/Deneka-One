import React from 'react';
import { Card, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import './QuestionPage.css'; // Ensure your CSS file contains the required styles

const options = [
  { label: 'Business Owner', icon: <i className="fa fa-briefcase" aria-hidden="true"></i> },
  { label: 'Manager/Supervisor', icon: <i className="fa fa-users" aria-hidden="true"></i> },
  { label: 'IT Professional', icon: <i className="fa fa-desktop" aria-hidden="true"></i> },
  { label: 'Financial Analyst/Accountant', icon: <i className="fa fa-line-chart" aria-hidden="true"></i> },
  { label: 'Operations Specialist', icon: <i className="fa fa-cogs" aria-hidden="true"></i> },
  { label: 'Other', icon: <i className="fa fa-ellipsis-h" aria-hidden="true"></i> }
];

const DescriptionQuestionPage = ({  onAnswer, onSkip, onBack  }) => {
  return (
    <div className="question-page-container">
      <div className="top-bar">
        <Button icon={<LeftOutlined />} type="text" onClick={onBack}>Back</Button>
        <Button type="text" onClick={onSkip}>Skip</Button>
      </div>
      <Card className="question-card">
        <h2 className="question-title">What is the best description for you?</h2>
        <div className="options-container">
          {options.map((option, index) => (
            <Button 
              key={index} 
              className="option-button" 
              onClick={() => onAnswer('description', option.label)}
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

export default DescriptionQuestionPage;

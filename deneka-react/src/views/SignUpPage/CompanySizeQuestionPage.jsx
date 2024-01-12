import React from 'react';
import { Card, Button } from 'antd';
import { LeftOutlined, CheckOutlined } from '@ant-design/icons';
import './QuestionPage.css'; // Make sure your CSS file contains the required styles

const options = [
  'Self-employed',
  'Small (1-10 employees)',
  'Medium (11-50 employees)',
  'Large (51-200 employees)',
  'Enterprise (201-500 employees)',
  'Corporation (More than 500 employees)'
];

const CompanySizeQuestionPage = ({ onAnswer, onSkip, onBack, onConfirm }) => {
  return (
    <div className="question-page-container">
      <div className="top-bar">
        <Button icon={<LeftOutlined />} type="text" onClick={onBack}>Back</Button>
        <Button type="text" onClick={onSkip}>Skip</Button>
      </div>
      <Card className="question-card">
        <h2 className="question-title">What is your company size?</h2>
        <div className="options-container">
          {options.map((option, index) => (
            <Button 
              key={index} 
              className="option-button" 
              onClick={() => onAnswer('companySize', option)}
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="confirm-button-container">
          <Button type="primary" icon={<CheckOutlined />} onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CompanySizeQuestionPage;

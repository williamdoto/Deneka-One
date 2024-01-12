import React from 'react';
import { Card, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import './QuestionPage.css'; // Ensure your CSS file contains the required styles

const options = [
  '1-5',
  '6-10',
  '11-20',
  '21-50',
  '51-100',
  '101-500',
  '501-1000',
  'More than 1000'
];

const TeamSizeQuestionPage = ({ onAnswer, onSkip, onBack }) => {
  return (
    <div className="question-page-container">
      <div className="top-bar">
        <Button icon={<LeftOutlined />} type="text" onClick={onBack}>Back</Button>
        <Button type="text" onClick={onSkip}>Skip</Button>
      </div>
      <Card className="question-card">
        <h2 className="question-title">What is your team size?</h2>
        <div className="options-container">
          {options.map((option, index) => (
            <Button 
              key={index} 
              className="option-button" 
              onClick={() => onAnswer('teamSize', option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TeamSizeQuestionPage;

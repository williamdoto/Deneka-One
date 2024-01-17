import React from 'react';
import { Card, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import './QuestionPage.css'; // Ensure your CSS file contains the required styles

const options = [
  { label: 'Starting a new business', icon: <i className="fa fa-lightbulb-o" aria-hidden="true"></i> },
  { label: 'Expanding current business', icon: <i className="fa fa-arrows-alt" aria-hidden="true"></i> },
  { label: 'Streamlining business processes', icon: <i className="fa fa-stream" aria-hidden="true"></i> },
  { label: 'Digital transformation', icon: <i className="fa fa-digital-tachograph" aria-hidden="true"></i> },
  { label: 'Researching business solutions', icon: <i className="fa fa-search" aria-hidden="true"></i> },
  { label: 'Other', icon: <i className="fa fa-ellipsis-h" aria-hidden="true"></i> }
];

const CurrentWorkQuestionPage = ({ onAnswer, onSkip, onBack }) => {
  return (
    <div className="question-page-container">
      <div className="top-bar">
        <Button icon={<LeftOutlined />} type="text" onClick={onBack}>Back</Button>
        <Button type="text" onClick={onSkip}>Skip</Button>
      </div>
      <Card className="question-card">
        <h2 className="question-title">What are you working on right now?</h2>
        <div className="options-container">
          {options.map((option, index) => (
            <Button 
              key={index} 
              className="option-button" 
              onClick={() => onAnswer('currentWork', option.label)}
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

export default CurrentWorkQuestionPage;

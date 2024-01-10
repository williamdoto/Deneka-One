import React from 'react';

const options = [
  'Business Owner', 
  'Manager/Supervisor', 
  'IT Professional', 
  'Financial Analyst/Accountant', 
  'Operations Specialist', 
  'Other'
];

const DescriptionQuestionPage = ({ onAnswer }) => {
  return (
    <div>
      <h2>What is the best description for you?</h2>
      {options.map(option => (
        <button key={option} onClick={() => onAnswer('description', option)}>{option}</button>
      ))}
    </div>
  );
};

export default DescriptionQuestionPage;

import React from 'react';

const options = [
  'Manufacturing', 
  'Retail', 
  'Technology', 
  'Healthcare', 
  'Finance/Banking', 
  'Education', 
  'Government', 
  'Service Industry', 
  'Other'
];

const IndustryQuestionPage = ({ onAnswer }) => {
  return (
    <div>
      <h2>Which industry do you belong to?</h2>
      {options.map(option => (
        <button key={option} onClick={() => onAnswer('industry', option)}>{option}</button>
      ))}
    </div>
  );
};

export default IndustryQuestionPage;

import React from 'react';

const options = [
  'Self-employed',
  'Small (1-10 employees)',
  'Medium (11-50 employees)',
  'Large (51-200 employees)',
  'Enterprise (201-500 employees)',
  'Corporation (More than 500 employees)'
];

const CompanySizeQuestionPage = ({ onAnswer }) => {
  return (
    <div>
      <h2>What is your company size?</h2>
      {options.map(option => (
        <button key={option} onClick={() => onAnswer('companySize', option)}>{option}</button>
      ))}
    </div>
  );
};

export default CompanySizeQuestionPage;

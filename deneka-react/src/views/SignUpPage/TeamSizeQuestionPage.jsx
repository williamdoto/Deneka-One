import React from 'react';

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

const TeamSizeQuestionPage = ({ onAnswer }) => {
  return (
    <div>
      <h2>What is your team size?</h2>
      {options.map(option => (
        <button key={option} onClick={() => onAnswer('teamSize', option)}>{option}</button>
      ))}
    </div>
  );
};

export default TeamSizeQuestionPage;

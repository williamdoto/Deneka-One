import React from 'react';

const options = [
  'Starting a new business',
  'Expanding current business',
  'Streamlining business processes',
  'Digital transformation',
  'Researching business solutions',
  'Other'
];

const CurrentWorkQuestionPage = ({ onAnswer }) => {
  return (
    <div>
      <h2>What are you working on right now?</h2>
      {options.map(option => (
        <button key={option} onClick={() => onAnswer('currentWork', option)}>{option}</button>
      ))}
    </div>
  );
};

export default CurrentWorkQuestionPage;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../../constant';
import DescriptionQuestionPage from './DescriptionQuestionPage';
import IndustryQuestionPage from './IndustryQuestionPage';
import CurrentWorkQuestionPage from './CurrentWorkQuestionPage';
import TeamSizeQuestionPage from './TeamSizeQuestionPage';
import CompanySizeQuestionPage from './CompanySizeQuestionPage';

// Replace with your actual API URL
// This should be the base URL of your backend server
// const API = 'http://localhost:1337'; // or import from a configuration file

const TOTAL_STEPS = 5; // Total number of questions

// const submitAnswers = async (userId, answers) => {
//     try {
//         console.log({ userId, ...answers });

//       const response = await fetch(`${API}/signup/user`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId, ...answers }),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || 'Error submitting questionnaire answers');
//       }
//       // Handle successful submission
//       // For example, you could navigate to a different page or display a success message
//     } catch (error) {
//       console.error('Error submitting questionnaire answers:', error);
//       // Handle errors, for example, by displaying an error message
//     }
//   };

const Questionnaire = ({ userId }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const registrationData = location.state?.registrationData;
  
    const submitAllData = async () => {
        const registrationData = location.state?.registrationData;
        const allData = { ...registrationData, ...answers };
        console.log("Submitting data:", allData);
      try {
        const response = await fetch(`${API}/signup/user`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(allData),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Error submitting data');
        }
        navigate('/success'); // Navigate to the success page
      } catch (error) {
        console.error('Error:', error);
        // Handle errors
      }
    };
  
    const handleAnswer = (key, value) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
        if (currentStep < TOTAL_STEPS) {
          setCurrentStep(currentStep + 1);
        } else {
          submitAllData();
        }
      };
  

      const handleSkip = () => {
        const questionKeys = ["description", "industry", "currentWork", "teamSize", "companySize"];
        const skippedQuestionKey = questionKeys[currentStep - 1];
        const defaultValue = getDefaultFor(skippedQuestionKey);
        setAnswers(prev => ({ ...prev, [skippedQuestionKey]: defaultValue }));
    
        if (currentStep < TOTAL_STEPS) {
            setCurrentStep(currentStep + 1);
        } else {
            // Make sure all questions are filled before submitting
            const finalAnswers = questionKeys.reduce((acc, key) => {
                if (acc[key] === undefined) {
                    acc[key] = getDefaultFor(key);
                }
                return acc;
            }, {...answers});
    
            submitAllData(finalAnswers);
        }
    };
    
    function getDefaultFor(key) {
        // Define default values for each question
        const defaults = {
            description: "Not provided",
            industry: "Not provided",
            currentWork: "Not provided",
            teamSize: "Not provided",  
            companySize: "Not provided"  
        };
        return defaults[key] || "";
    }
    

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderQuestion = () => {
    switch (currentStep) {
      case 1:
        return <DescriptionQuestionPage onAnswer={handleAnswer} />;
      case 2:
        return <IndustryQuestionPage onAnswer={handleAnswer} />;
      case 3:
        return <CurrentWorkQuestionPage onAnswer={handleAnswer} />;
      case 4:
        return <TeamSizeQuestionPage onAnswer={handleAnswer} />;
      case 5:
        return <CompanySizeQuestionPage onAnswer={handleAnswer} />;
      default:
        return <div>Thank you for completing the questionnaire!</div>;
    }
  };

  return (
    <div>
      {renderQuestion()}
      {currentStep > 1 && <button onClick={handleBack}>Back</button>}
      {currentStep < TOTAL_STEPS && <button onClick={handleSkip}>Skip</button>}
      {currentStep === TOTAL_STEPS && <button onClick={submitAllData}>Confirm</button>}
    </div>
  );
};

export default Questionnaire;

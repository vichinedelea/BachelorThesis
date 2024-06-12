import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmail } from './EmailContext';
import './Buttons.css';

const BackToHomePageButton = ({ clearEmail = true }) => {
  const navigate = useNavigate();
  const { setEmail } = useEmail();

  const handleBackToHome = () => {
    if (clearEmail) {
      setEmail('');
    }
    navigate('/');
  };

  return (
    <button onClick={handleBackToHome} className="buttonBackToHomePage">
      Back to Home Page
    </button>
  );
};

export default BackToHomePageButton;
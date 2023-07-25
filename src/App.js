import React from 'react';
import './ButtonLine.css';

const ButtonLine = () => {
  return (
    <div className="button-line-container">
      <button className="btn1">Button 1</button>
      <svg className="line">
        <line x1="0" y1="0" x2="100" y2="0" />
      </svg>
      <button className="btn2">Button 2</button>
    </div>
  );
};

export default ButtonLine;

import React from 'react';
import { useSelector } from 'react-redux';

const ComponentC = () => {
  const value = useSelector(state => state.value); // Assuming "value" is stored in the Redux store

  return (
    <div>
      <h5>Value from Redux store: {value}</h5>
    </div>
  );
};

export default ComponentC;
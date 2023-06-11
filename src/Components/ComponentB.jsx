import React from 'react';
import { useDispatch } from 'react-redux';
import { updateValue } from '../Redux/action';

const ComponentB = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value } = event.target;
    dispatch(updateValue(value)); 
  };

  return (
    <div>
      <input type="text" placeholder='Type Your Text here' onChange={handleChange} />
    </div>
  );
};

export default ComponentB;
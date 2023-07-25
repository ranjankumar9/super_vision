import React, { useState } from 'react';
import ReactFlow, { addEdge, removeElements } from 'react-flow-renderer';

const NodeBetweenButtons = () => {
  const [elements, setElements] = useState([]);
  const [count, setCount] = useState(0);

  const onAddButtonClick = () => {
    const newNode = {
      id: `node-${count}`,
      data: { label: `Node ${count}` },
      position: { x: 100, y: 100 },
      type: 'default',
    };

    setElements((prevElements) => [...prevElements, newNode]);
    setCount((prevCount) => prevCount + 1);
  };

  const onRemoveButtonClick = () => {
    setElements((prevElements) => removeElements(elements, prevElements));
  };

  const onConnect = (params) => {
    setElements((prevElements) => addEdge(params, prevElements));
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={onAddButtonClick}>Add Node</button>
        <button onClick={onRemoveButtonClick}>Remove Node</button>
      </div>
      <div style={{ height: '400px', border: '1px solid #ddd' }}>
        <ReactFlow elements={elements} onConnect={onConnect} />
      </div>
    </div>
  );
};

export default NodeBetweenButtons;

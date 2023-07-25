import React, { useState } from 'react';
import ReactFlow from 'react-flow-renderer';

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

  const onElementsRemove = (elementsToRemove) => {
    setElements((prevElements) =>
      prevElements.filter((element) => !elementsToRemove.includes(element))
    );
  };

  const onConnect = (params) => {
    setElements((prevElements) => [...prevElements, params]);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={onAddButtonClick}>Add Node</button>
      </div>
      <div style={{ height: '400px', border: '1px solid #ddd' }}>
        <ReactFlow elements={elements} onElementsRemove={onElementsRemove} onConnect={onConnect} />
      </div>
    </div>
  );
};

export default NodeBetweenButtons;

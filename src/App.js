import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes'; // We'll define this later

const Question = ({ question, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.QUESTION,
    item: { question },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        border: '1px solid #ccc',
        padding: '10px',
        margin: '5px',
      }}
    >
      {question}
    </div>
  );
};

const Answer = ({ answer, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.QUESTION,
    drop: (item) => onDrop(item.question, answer),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? '#f5f5f5' : 'transparent',
        border: '1px solid #ccc',
        padding: '10px',
        margin: '5px',
      }}
    >
      {answer}
    </div>
  );
};

const MatchQuestionAndAnswer = () => {
  const questions = ['Question 1', 'Question 2', 'Question 3'];
  const answers = ['Answer A', 'Answer B', 'Answer C'];

  const handleDrop = (question, answer) => {
    console.log(`Question: ${question}, Answer: ${answer}`);
    // Add your logic here to check if the match is correct or display feedback to the user
  };

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <h2>Questions</h2>
        {questions.map((question, index) => (
          <Question key={index} question={question} onDrop={handleDrop} />
        ))}
      </div>
      <div>
        <h2>Answers</h2>
        {answers.map((answer, index) => (
          <Answer key={index} answer={answer} onDrop={handleDrop} />
        ))}
      </div>
    </div>
  );
};

export default MatchQuestionAndAnswer;


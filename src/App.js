import React, { useState } from 'react';
import './MatchingLine.css'; // Make sure to create this CSS file

const MatchingLine = () => {
  const [matchedPairs, setMatchedPairs] = useState([]);

  const questions = ['Question 1', 'Question 2', 'Question 3'];
  const answers = ['Answer A', 'Answer B', 'Answer C'];

  const handleDrop = (question, answer) => {
    // Add the matched pair to the state
    setMatchedPairs([...matchedPairs, { question, answer }]);
  };

  const removeMatch = (question) => {
    // Remove the matched pair from the state
    setMatchedPairs(matchedPairs.filter((pair) => pair.question !== question));
  };

  return (
    <div>
      <div className="matching-container">
        <div className="questions">
          {questions.map((question, index) => (
            <div
              key={index}
              className="question-box"
              onDrop={() => handleDrop(question, '')}
              onDragOver={(e) => e.preventDefault()}
            >
              {question}
            </div>
          ))}
        </div>
        <div className="answers">
          {answers.map((answer, index) => (
            <div
              key={index}
              className="answer-box"
              onDrop={() => handleDrop('', answer)}
              onDragOver={(e) => e.preventDefault()}
            >
              {answer}
            </div>
          ))}
        </div>
      </div>
      <div className="matching-lines">
        {matchedPairs.map((pair, index) => (
          <MatchingLineConnector
            key={index}
            question={pair.question}
            answer={pair.answer}
            onRemove={() => removeMatch(pair.question)}
          />
        ))}
      </div>
    </div>
  );
};

const MatchingLineConnector = ({ question, answer, onRemove }) => {
  const questionRef = React.createRef();
  const answerRef = React.createRef();

  const drawLine = () => {
    const questionRect = questionRef.current.getBoundingClientRect();
    const answerRect = answerRef.current.getBoundingClientRect();

    const startX = questionRect.left + questionRect.width / 2;
    const startY = questionRect.top + questionRect.height / 2;
    const endX = answerRect.left + answerRect.width / 2;
    const endY = answerRect.top + answerRect.height / 2;

    const line = document.createElement('div');
    line.className = 'matching-line';
    line.style.position = 'absolute';
    line.style.left = startX + 'px';
    line.style.top = startY + 'px';
    line.style.width = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2) + 'px';
    line.style.transformOrigin = '0 0';
    line.style.transform = `rotate(${Math.atan2(endY - startY, endX - startX)}rad)`;

    document.body.appendChild(line);

    return line;
  };

  const line = drawLine();

  return (
    <React.Fragment>
      <div ref={questionRef} className="hidden-element">
        {question}
      </div>
      <div ref={answerRef} className="hidden-element">
        {answer}
      </div>
      <div className="matching-remove" onClick={onRemove}>
        X
      </div>
    </React.Fragment>
  );
};

export default MatchingLine;

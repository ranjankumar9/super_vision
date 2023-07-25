# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)





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


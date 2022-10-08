import './App.css';
import React from 'react';
import { useState, useEffect } from 'react'; 

const getRandomColor = () => {
  const digits = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

  const color = new Array(6).fill('').map(() => digits[Math.floor(Math.random() * digits.length)]).join('');

  return `#${color}`;
}

// function shuffles an array using fisher-yates algorithm
const shuffleAnswer = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array [j];
    array[j] = temp;
  }
  return array;
}

function App() {

  const [color, setColor] = useState('');
  const [answer, setAnswer] = useState([]);
  const [isWrongSelection, setWrongSelection] = useState(undefined);
  const [correctCount, setCorrectCount] = useState(0);

  const generateColor = () => {
    const currentColor = getRandomColor();
    setColor(currentColor);
    setAnswer(shuffleAnswer([currentColor, getRandomColor(), getRandomColor()]));
  }

  useEffect(() => {
    generateColor();
  }, [])

  const handleAnswerClicked = (answer) => {
    if (answer == color) {
      setWrongSelection(false);
      setCorrectCount(correctCount + 1);
      generateColor();
    } else {
      setWrongSelection(true);
      setCorrectCount(0);
    }
  }

  return (
    <div className="App">
      <div>
      <h1>Colour Guessr</h1>
      <div className="guess-me" style={{background: color}}></div>
        {answer.map((answer) => (
          <button onClick={() => handleAnswerClicked(answer)} key={answer}>
            {answer}
          </button>
        ))}
        <div className="answer" style={isWrongSelection ? {color: 'red'} : {color: 'green'}}>
           {isWrongSelection == true && 'Incorrect. Try Again!'}
           {isWrongSelection == false && 'Correct!'}
        </div>
        <div className="correct-count">
          Points: {correctCount}
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import Button from "./Button";

import React from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        <p>{`${text} `}</p>
      </td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const onAnecdoteClick = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const onVoteClick = () => {
    points.splice(selected, 1, points[selected] + 1);
    setPoints([...points]);
  };

  return (
    <div>
      <h2>give feedback</h2>

      <Button text="good" handleClick={handleGoodClick} />
      <Button text="neutral" handleClick={handleNeutralClick} />
      <Button text="bad" handleClick={handleBadClick} />

      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine
            text="average"
            value={(good * 1 + neutral * 0 + bad * -1) / 9}
          />
          <StatisticLine text="positive" value={`${(good / 9) * 100} %`} />
        </tbody>
      </table>

      <p>{anecdotes[selected]}</p>
      <div>
        <button onClick={onVoteClick}>vote</button>
        <p>has {points[selected]} votes</p>
        <button onClick={onAnecdoteClick}>next anecdote</button>
      </div>
    </div>
  );
};

export default App;

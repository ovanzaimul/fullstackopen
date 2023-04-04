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
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

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
    </div>
  );
};

export default App;

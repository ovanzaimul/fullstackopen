import React from "react";

const Total = (props) => {
  const { parts } = props;
  const total = parts.reduce((acc, curr) => acc + curr.exercises, 0);
  return (
    <p>
      <b>{`total of ${total} exercises`}</b>
    </p>
  );
};

export default Total;

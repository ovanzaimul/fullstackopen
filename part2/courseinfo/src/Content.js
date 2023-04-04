import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} data={part} />
      ))}
    </div>
  );
};

export default Content;

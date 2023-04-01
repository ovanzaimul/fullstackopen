import React from "react";
import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      <Part data={props.part1} />
      <Part data={props.part2} />
      <Part data={props.part3} />
    </div>
  );
};

export default Content;

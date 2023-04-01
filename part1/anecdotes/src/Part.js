import React from "react";

const Part = ({ data }) => {
  return (
    <p>
      {data.part} {data.exercise}
    </p>
  );
};

export default Part;

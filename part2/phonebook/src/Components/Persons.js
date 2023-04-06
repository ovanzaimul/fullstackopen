import React from "react";

const Persons = (props) => {
  const handleDeleteClick = (person) => {
    if (window.confirm(`delete ${person.name}?`)) {
      props.onDelete(person.id);
    }
  };
  return (
    <>
      {props.persons.map((person) => (
        <p key={person.name}>
          {`${person.name} ${person.number}`}
          <button onClick={() => handleDeleteClick(person)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default Persons;

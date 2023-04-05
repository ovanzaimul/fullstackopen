import { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchName(e.target.value);
  };

  const addName = (e) => {
    e.preventDefault();
    const isAlreadyExist = persons.some((person) => person.name === newName);
    if (isAlreadyExist) {
      return alert(`${newName} is already added to phonebook`);
    }
    setPersons(
      persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      })
    );
    setNewName("");
    setNewNumber("");
  };

  useEffect(() => {
    const searchText = searchName.toLowerCase();
    const newPersons = !searchText
      ? persons
      : persons.filter((person) => {
          return person.name.toLowerCase().includes(searchText);
        });
    setFilteredPersons(newPersons);
  }, [JSON.stringify(persons), searchName]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onSearch={handleSearch} value={searchName} />
      <h2>add a new</h2>
      <PersonForm
        onSubmitForm={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;

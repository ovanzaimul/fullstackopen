import { useEffect, useState } from "react";
import axios from "axios";

import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";

const baseURL = "http://localhost:3001/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
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

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    axios.post(baseURL, newPerson).then((response) => {
      setPersons(persons.concat(response.data));
    });
    setNewName("");
    setNewNumber("");
  };

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPersons(response.data);
    });
  }, []);

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

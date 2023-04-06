import { useEffect, useState } from "react";

import personService from "./services/persons";

import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";

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
    const foundPerson = persons.find((person) => person.name === newName);
    console.log({ foundPerson });
    if (foundPerson) {
      const isUserOk = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one`
      );
      if (isUserOk) {
        personService.updatePerson(foundPerson.id, {
          ...foundPerson,
          number: newNumber,
        });
        setNewName("");
        setNewNumber("");
      }

      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    personService.create(newPerson).then((response) => {
      setPersons(persons.concat(response));
    });
    setNewName("");
    setNewNumber("");
  };

  const handleDeletePerson = (id) => {
    personService.deletePerson(id).then((res) => {});
  };

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
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
      <Persons onDelete={handleDeletePerson} persons={filteredPersons} />
    </div>
  );
};

export default App;

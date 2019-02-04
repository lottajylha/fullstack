import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [names, setNames] = useState([])
  const [deleteId, setDelete] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDelete = (event) => {
    setDelete(event.target.value)
    console.log(deleteId)
  }

  const deletePerson = (event) => {
    event.preventDefault()
  }

const addPerson = (event) => {
    event.preventDefault()
    var index = names.indexOf(newName)
    if (index === -1) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNames(names.concat(personObject.name))
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          
        })
    } else {
      alert(`${newName} on jo luettelossa`)
    }
    setNewNumber('')
    setNewName('')
  }
  console.log(deleteId)
  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <NewPerson addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numerot</h2>
      <Persons persons={persons} handleDelete={handleDelete}/>
    </div>
  )

}

const Persons = (props) => {
  const rows = () => props.persons.map(person =>
      <Person key={person.id} name={person.name} number={person.number} id={props.id}/>
  )
  return (
    <div> {rows()} </div>
  )
}

const Person = (props) => {
  return (
    <div>
    <p>{props.name} {props.number}
    <form onSubmit={props.handleDelete}>
    <output value={props.id}/>
    <button type="submit">poista</button>
    </form>
    </p>
    </div>
  )
}

const NewPerson = (props) => {
  return (
      <form onSubmit={props.addPerson}>
        <div>
          nimi: <input value={props.newName} 
          onChange={props.handleNewName}
          />
        </div>
        <div>
          numero: <input value={props.newNumber} 
          onChange={props.handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [names, setNames] = useState([])
  const [notification, setNotification] = useState({
    message: null
  })


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 10000)
  }
 

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const ok = window.confirm(`Poistetaanko ${person.name}`)
    if (ok) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
      notify(`Poistettiin ${person.name}`)
    }
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
  
  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <NewPerson addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numerot</h2>
      <Persons persons={persons} deletePerson={deletePerson}/>
    </div>
  )

}

const Persons = (props) => {
  const rows = () => props.persons.map(person =>
    <Person name={person.name} number={person.number} id={person.id} deletePerson={props.deletePerson}/>
  )
  return (
    <div>
      {rows()}
    </div>
  )
}

const Person = (props) => {
  return (
    <div>
    {props.name} {props.number}
    <button onClick={()=>props.deletePerson(props.id)}>poista</button>
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

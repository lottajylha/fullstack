import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'



const App = () => {
  const courses = [
    {
      name: 'Half Stack -sovelluskehitys',
      id: 1,
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10,
          id: 11
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7,
          id: 12
        },
        {
          name: 'Komponenttien tila',
          exercises: 14,
          id: 13
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 2,
          id: 21
        },
        {
          name: 'Middlewaret',
          exercises: 7,
          id: 22
        }
      ]
    }
  ]
  const array = () => courses.map(course =>
    <Course key={course.id} name={course.name} id={course.id} parts={course.parts}/>
  )
  
    return (
     <div>
       <h1>Opetusohjelma</h1>
       <ul>
          {array()}
       </ul>
     </div>
   )
 }

ReactDOM.render(
 <App />,
 document.getElementById('root')
)


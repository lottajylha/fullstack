import React from 'react'

const Header = course =>
 <h2>{course.name}</h2>

const Total = (course) => {
   const array = course.parts.map(part => part.exercises)
   console.log(array)
   const reducer = (accumulator, currentValue) => accumulator + currentValue;
   const total = array.reduce(reducer, 0)
  
   console.log(total)
   return (
       <p>yhteensä {total} tehtävää</p>
   )
}

const Part = part =>
 <p>{part.name} {part.exercises}</p>

const Content = (course) => {
   const rows = () =>
   course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)
   return (
       <div>
           <ul>
              {rows()}
           </ul>
       </div>
   )
}

const Course = (course) => {

   return (
       <div>
          <Header name={course.name}/>
          <Content course={course} parts={course.parts}/>
          <Total course={course} parts={course.parts}/>
       </div>
   )

}

export default Course
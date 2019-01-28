import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
   const course = {
       name: 'Half Stack -sovelluskehitys',
       parts: [
         {
           name: 'Reactin perusteet',
           exercises: 10
         },
         {
           name: 'Tiedonvälitys propseilla',
           exercises: 7
         },
         {
           name: 'Komponenttien tila',
           exercises: 14
         }
       ]
   }
    return (
     <div>
       <Header course={course}/>
       <Content course={course}/>
       <Total course={course}/>
     </div>
   )
}

const Header = (props) => {
   return (
       <div>
           <h1>
               {props.course.name}
           </h1> 
       </div>
   )
}

const Content = (props) => {
   return (
       <div>
           <Part name={props.course.parts[0].name} exercises={props.course.parts[0].exercises}/>
           <Part name={props.course.parts[1].name} exercises={props.course.parts[1].exercises}/>
           <Part name={props.course.parts[2].name} exercises={props.course.parts[2].exercises}/>
       </div>
   )
}

const Total = (props) => {
   let sum = 0;
   for (let i = 0; i < 3; i++) {
       sum += props.course.parts[i].exercises
   }
   return (
       <div>
           <p>Yhteensä {sum} tehtävää</p>
       </div>
   )
}

const Part = (props) => {
   return (
       <div>
           <p>{props.name} {props.exercises}</p>
       </div>
   )
}
ReactDOM.render(<App />, document.getElementById('root'))
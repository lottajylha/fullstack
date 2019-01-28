import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
   const setGoodToValue = (goodValue, totalValue, sumValue) => {
       return () => {
           setGood(goodValue)
           setTotal(totalValue)
           setSum(sumValue)
       }
   }

   const setNeutralToValue = (neutralValue, totalValue, sumValue) => {
       return () => {
           setNeutral(neutralValue)
           setTotal(totalValue)
           setSum(sumValue)
       }
   }

   const setBadToValue = (badValue, totalValue, sumValue) => {
       return () => {
           setBad(badValue)
           setTotal(totalValue)
           setSum(sumValue)
       }
   }

   const [good, setGood] = useState(0)
   const [neutral, setNeutral] = useState(0)
   const [bad, setBad] = useState(0)
   const [total, setTotal] = useState(0)
   const [sum, setSum] = useState(0)
 
   if (total === 0) {
       return (
           <div>
           <Header/>
           <h2>Anna palautetta</h2>
           <Button handleClick={setGoodToValue(good + 1, total + 1, sum + 1)} text='hyvä'/>
           <Button handleClick={setNeutralToValue(neutral + 1, total + 1, sum)} text='neutraali'/>
           <Button handleClick={setBadToValue(bad + 1, total + 1, sum - 1)} text='huono'/>
           <h2>Statistiikka</h2>
           <p>Yhtään palautetta ei ole annettu!</p>
           </div>
       )
   } else {
       return (
           <div>
           <Header/>
           <h2>Anna palautetta</h2>
           <Button handleClick={setGoodToValue(good + 1, total + 1, sum + 1)} text='hyvä'/>
           <Button handleClick={setNeutralToValue(neutral + 1, total + 1, sum)} text='neutraali'/>
           <Button handleClick={setBadToValue(bad + 1, total + 1, sum - 1)} text='huono'/>
           <h2>Statistiikka</h2>
           <html>
           <table>

           <Statistics text='hyvä' value={good} all={total}/>
           <Statistics text='neutraali' value={neutral} all={total}/>
           <Statistics text='huono' value={bad} all={total}/>
           <Statistics text='yhteensä' value={total} all={total}/>
           <Statistics text='keskiarvo' value={sum / total} all={total}/>
           <Statistics text='positiivisia' value={100 * (good / total)} all={total}/>
           </table>
       </html>
           </div>
              
       )
   }
  
}

const Statistics = (props) => {
   return (
       <tr>
           <td>{props.text}</td>
           <td>{props.value}</td>
       </tr>
   )
}

const Header = (props) => {
   return (
       <div>
           <h1>
               Unicafen palautesovellus
           </h1> 
       </div>
   )
}

const Button = (props) =>
   <button onClick={props.handleClick}>{props.text} </button>

          
     

ReactDOM.render(<App />,
 document.getElementById('root')
)

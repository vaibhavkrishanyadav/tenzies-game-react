import './styles.css';
import Dice from './components/dice';
import { useState } from 'react';
import {nanoid} from 'nanoid';

export default function App() {

  const [dice, setDice] = useState(allNewDice())
    
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
        newDice.push({
          value: Math.ceil(Math.random() * 6), 
          isHeld: false,
          id: nanoid()
        })
      }
      return newDice
  }
    
  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld === false ?
          {...die, value: Math.ceil(Math.random() * 6)} :
          die
    }))
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
  }

  const diceElements = dice.map(die => (
    <Dice 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld} 
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <div className='App'>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </div>
  );
}

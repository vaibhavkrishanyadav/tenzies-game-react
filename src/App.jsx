import './styles.css';
import Dice from './components/dice';
import { useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
    
  useEffect(() => {
    let count = 0, n = dice[0].value;
    for(let i=0; i<dice.length; i++) {
        if(dice[i].isHeld === false) {
            break;
        }
        if(dice[i].value === n) {
            count++;
        }
        else {
            break;
        }
    }
    if(count === 10) {
        setTenzies(true)
        console.log("You won!")
    }

      // const allHeld = dice.every(die => die.isHeld)
      // const firstValue = dice[0].value
      // const allSameValue = dice.every(die => die.value === firstValue)
      // if (allHeld && allSameValue) {
      //     setTenzies(true)
      //     console.log("You won!")
      // }
  }, [dice])
    
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
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld === false ?
            {...die, value: Math.ceil(Math.random() * 6)} :
            die
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
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
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button 
        className="roll-dice" 
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  );
}

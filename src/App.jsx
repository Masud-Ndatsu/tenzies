import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
        id: nanoid(),
      });
    }
    return arr;
  }
  const rollDice = () => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld
          ? die
          : {
              value: Math.floor(Math.random() * 6 + 1),
              isHeld: false,
              id: nanoid(),
            };
      })
    );
  };

  const holdDice = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  return (
    <main className="game--board">
      <h3>Tenzies</h3>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dies">
        {dice.map((die) => (
          <Die
            key={die.id}
            isHeld={die.isHeld}
            value={die.value}
            holdDice={() => holdDice(die.id)}
          />
        ))}
      </div>
      <button type="button" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}

export default App;

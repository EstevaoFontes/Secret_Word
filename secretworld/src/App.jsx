import './App.css';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import End from './components/End';
import { useCallback, useEffect, useState } from 'react';
import { wordList } from './data/words';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
];

function App() {
  const [gameStage, setgameStage] = useState(stages[0].name);
  const [words] = useState(wordList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessesLetters, setGuessesLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)




  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return [word, category]
  },[words])


  const starGame = useCallback(() => {
    
    clearLetterStates()
    
    const [word, category] = pickWordAndCategory();

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase())

    setPickedCategory(category)
    setPickedWord(word)
    setLetters(wordLetters)


    setgameStage(stages[1].name);
    
},[pickWordAndCategory])

const verifyLetter = (letter) => {

  const normalizedLetter = letter.toLowerCase();

  if (
    guessesLetters.includes(normalizedLetter) ||
    wrongLetters.includes(normalizedLetter)
  ) {
    return;
  }

  if (letters.includes(normalizedLetter)) {

    setGuessesLetters((actualGuessesLetters) => [
      ...actualGuessesLetters,
      normalizedLetter,
    ]);
  } else {
    setWrongLetters((actualWrongLetters) => [
      ...actualWrongLetters,
      normalizedLetter,
    ]);

    setGuesses(actualGuesses => actualGuesses - 1)
  }

}
const clearLetterStates = () => {
  setGuessesLetters([])
  setWrongLetters([])
}

useEffect(() => {
  if (guesses <= 0) {

    clearLetterStates()

    setTimeout(() => {
      setgameStage(stages[2].name)
    }, "500")

  }
}, [guesses])

useEffect(() => {
  const uniqueLetters = [...new Set(letters)];

  if(uniqueLetters.length != 0){
    if (uniqueLetters.length === guessesLetters.length) {
      setScore((actualScore) => (actualScore += 100));

      setTimeout(() =>{
        starGame();
      },"500")
      
  }}

}, [guessesLetters, letters, starGame]);

const restart = () => {
  setScore(0)
  setGuesses(3)
  setgameStage(stages[0].name)
}

return (
  <div className='app'>
    {gameStage === "start" && <StartScreen starGame={starGame} />}
    {gameStage === "game" &&
      <Game
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessesLetters={guessesLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}
    {gameStage === "end" && <End restart={restart} score={score} />}
  </div>
)
}


export default App

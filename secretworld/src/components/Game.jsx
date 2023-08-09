import { useState, useRef } from 'react';
import './Game.css';

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessesLetters, wrongLetters, guesses, score }) => {

    const [letter, setLetter] = useState("")
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();

        verifyLetter(letter);
        setLetter("");
        letterInputRef.current.focus();
    }

    return (
        <div className='game'>
            <p>
                <span className="points">Pontuação: {score}</span>
            </p>
            <h1>Advinha a palavra</h1>
            <h3 className='tip'>Dica sobre a palavra: <span>{pickedCategory}</span> </h3>
            <p>Você ainda tem {guesses} tentativas</p>
            <div className='wordContainer'>
                {letters.map((letter, i) =>
                    guessesLetters.includes(letter) ? (
                        <span className="letter" key={i}>{letter}</span>
                    ) : (
                        <span className="quadradoBranco" key={i}></span>
                    )
                )}
            </div>
            <div className="letterContainer">
                <p>Tente advinhar a palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                     name='letter' 
                     maxLength={1} 
                     required 
                     onChange={(e) => setLetter(e.target.value)} 
                     value={letter} 
                     ref={letterInputRef}
                     />
                    <button>Jogar!</button>
                </form >
            </div>
            <div className="wrongLetterContainer">
                <p>Letras ja utilizadas:</p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter}, </span>
                ))}
            </div>
        </div>
    )
}

export default Game
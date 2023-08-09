import './StartScreen.css';

const StartScreen = ({starGame}) => {
    return(
        <div className='start'> 
            <h1>Secret Word</h1>
            <p>Clique no botão para começar o jogo</p>
            <button onClick={starGame}>Começar o jogo</button>
        </div>
    )
};

export default StartScreen;
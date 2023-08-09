import './End.css';

const End = ({restart, score}) =>{
    return(
        <div>
            <h1>Fim de Jogo!</h1>
            <h2>A sua pontuação final foi: <span>{score}</span></h2>
            <button onClick={restart}>Recomeçar Jogo</button>
        </div>
    )
}

export default End
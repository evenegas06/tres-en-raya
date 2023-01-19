import { useState } from "react";
import Square from "./components/Square";
import confetti from "canvas-confetti";

const TURNS = {
    X: 'x',
    O: 'o'
};

//TODO: optimizar 
const WINNER_COMBOS = [
    [0, 1, 2],
    [4, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function App() {
    /* ----- State ----- */
    const [board, setBoard]     = useState(Array(9).fill(null));
    const [turn, setTurn]       = useState(TURNS.X);
    const [winner, setWinner]   = useState(null); // null = no hay ganador, false = empate

    /* ----- Functions ----- */
    const updateBoard = (index) => {
        // si la posición ya tiene algo o ya existe un ganador, salimos de la función
        if (board[index] || winner) return;

        // siempre hay que tratar el estado y las props como elementos inmutables
        const newBoard = [...board]; // esto crea una copia de *board* en un nuevo arreglo
        newBoard[index] = turn;
        setBoard(newBoard); // actualizamos el tablero

        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        setTurn(newTurn); // cambiar entre turnos ('x' u 'o')

        // revisar si ya existe un ganador
        const newWinner = checkWinner(newBoard);
        if (newWinner) {
            setWinner(newWinner);
            confetti();
        } else if (checkEndGame(newBoard)) {
            setWinner(false);
        }
    }

    //TODO: optimizar
    const checkWinner = (boardToCheck) => {
        // revisar todas las combinaciones ganadoras
        for (const combo of WINNER_COMBOS) {
            const [a, b, c] = combo;
            if (
                boardToCheck[a] &&
                boardToCheck[a] === boardToCheck[b] &&
                boardToCheck[a] === boardToCheck[c]
            ) {
                return boardToCheck[a];
            }
        }
    }

    const checkEndGame = (newBoard) => {
        //si todos los espacios están llenos (!= null) entonces hay un empate
        return newBoard.every((square) => square !== null);
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(TURNS.X);
        setWinner(null);
    }
    
    return (
        <main className='board'>
            <h1>Tic Tac Toe</h1>
            <button onClick={resetGame}>Resetear el juego</button>
            <section className='game'>
                {board.map((_, index) => {
                    return (
                        <Square
                            key={index}
                            index={index}
                            updateBoard={updateBoard}
                        >
                            {board[index]}
                        </Square>
                    );
                })}
            </section>

            <section className="turn">
                <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
            </section>
            
            {
                winner !== null && (
                    <section className="winner">
                        <div className="text">
                            <h2>
                                {
                                    winner === false
                                        ? 'Empate'
                                        : 'Ganó'
                                }
                            </h2>
                            <header className="win">
                                {winner && <Square>{winner}</Square>}
                            </header>

                            <footer>
                                <button onClick={resetGame}>Empezar de nuevo</button>
                            </footer>
                        </div>
                    </section>
                )
            }
        </main>
    );
}

export default App;

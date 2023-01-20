import { useState } from "react";
import Square from "./components/Square";
import confetti from "canvas-confetti";
import { TURNS } from './utils/constants'
import { checkWinner, checkEndGame } from "./logic/functions";
import WinnerModal from "./components/WinnerModal";

function App() {
    /* ----- State ----- */
    const boardFromStorage = JSON.parse(window.localStorage.getItem('board')) ?? Array(9).fill(null);
    const [board, setBoard]     = useState(boardFromStorage);

    const turnFromStorage = window.localStorage.getItem('turn') ?? TURNS.X;
    const [turn, setTurn]       = useState(turnFromStorage);

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

        // guardar partida en local storage
        window.localStorage.setItem('board', JSON.stringify(newBoard));
        window.localStorage.setItem('turn', newTurn);

        // revisar si ya existe un ganador
        const newWinner = checkWinner(newBoard);
        if (newWinner) {
            setWinner(newWinner);
            confetti();
        } else if (checkEndGame(newBoard)) {
            setWinner(false);
        }
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(TURNS.X);
        setWinner(null);

        window.localStorage.removeItem('board');
        window.localStorage.removeItem('turn');
    }
    
    return (
        <main className='board'>
            <h1>Tres en raya</h1>
            <button onClick={resetGame}>Resetear el juego</button>
            <section className='game'>
                {board.map((square, index) => {
                    return (
                        <Square
                            key={index}
                            index={index}
                            updateBoard={updateBoard}
                        >
                            {square}
                        </Square>
                    );
                })}
            </section>

            <section className="turn">
                <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
            </section>
            
            <WinnerModal
                resetGame={resetGame}
                winner={winner}
            />
        </main>
    );
}

export default App;

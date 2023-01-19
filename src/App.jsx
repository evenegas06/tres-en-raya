import { useState } from "react";
import Square from "./components/Square";

const TURNS = {
    X: 'x',
    O: 'o'
};


function App() {
    /* ----- State ----- */
    const [board, setBoard] = useState(Array(9).fill(null));
    const [turn, setTurn]   = useState(TURNS.X);

    /* ----- Functions ----- */
    const updateBoard = (index) => {
        // siempre hay que tratar el estado y las props como elementos inmutables
        const newBoard = [...board]; //esto crea una copia de *board* en un nuevo arreglo
        newBoard[index] = turn;
        setBoard(newBoard);

        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        setTurn(newTurn);
    }

    return (
        <main className='board'>
            <h1>Tic Tac Toe</h1>
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
        </main>
    );
}

export default App;

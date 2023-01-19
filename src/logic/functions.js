import { WINNER_COMBOS } from "../utils/constants";

//TODO: optimizar
export const checkWinner = (boardToCheck) => {
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

export const checkEndGame = (newBoard) => {
    //si todos los espacios están llenos (!= null) entonces hay un empate
    return newBoard.every((square) => square !== null);
}
import { PAWN_STARTING_POSITIONS } from "./constants";
import { IOnClickSquare } from "./interfaces";

const onClickSquare = ({
  square,
  table,
  highliteSquares,
  unhilightAllSquares,
  setSelectedPiece,
  selectedPiece,
  movePieceToSquare,
  turn,
  changeTurn,
}: IOnClickSquare) => {
  unhilightAllSquares();

  const squareName = Object.keys(square)[0];
  if (square[squareName].highlighted && square[squareName].piece === null) {
    movePieceToSquare(squareName);
    changeTurn();
    return;
  }

  const turnCoeficient = turn === "black" ? 1 : -1;

  if (square[squareName].type === "pawn" && square[squareName].color === turn) {
    setSelectedPiece(square);

    const file = squareName.split("")[0];
    const row = +squareName.split("")[1];
    if (!PAWN_STARTING_POSITIONS.includes(squareName)) {
      if (table[file + (row + -1 * turnCoeficient)].type === null) {
        highliteSquares({ squares: [file + (row + -1 * turnCoeficient)] });
      }

      return;
    }

    if (table[file + (row + -2 * turnCoeficient)]?.type === null) {
      if (table[file + (row + -1 * turnCoeficient)]?.type === null) {
        highliteSquares({ squares: [file + (row + -1 * turnCoeficient), file + (row + -2 * turnCoeficient)] });
      }
    } else {
      highliteSquares({ squares: [file + (row + -1 * turnCoeficient)] });
    }
  }
};
export default onClickSquare;

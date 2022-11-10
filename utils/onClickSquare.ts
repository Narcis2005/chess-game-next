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
  setSelectedPiece(square);

  const turnCoeficient = turn === "black" ? 1 : -1;
  const file = squareName.split("")[0];
  const row = +squareName.split("")[1];

  interface IFileNumber {
    [key: string]: number;
  }
  interface INumberFile {
    [key: number]: string;
  }
  const fileNumber: IFileNumber = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };
  const numberFile: INumberFile = { 1: "a", 2: "b", 3: "c", 4: "d", 5: "e", 6: "f", 7: "g", 8: "h" };
  if (square[squareName].type === "pawn" && square[squareName].color === turn) {
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
  } else if (square[squareName].type === "knight" && square[squareName].color === turn) {
    const possibleMoves = [];

    for (let i = -1; i < 2; i += 2) {
      for (let j = -1; j < 2; j += 2) {
        const verticalMove = { x: fileNumber[file] + j, y: row + i * 2 };
        const horizontalMove = { x: fileNumber[file] + i * 2, y: row + j };

        if (table[numberFile[verticalMove.x] + verticalMove.y]?.type === null) {
          possibleMoves.push(numberFile[verticalMove.x] + verticalMove.y);
        }

        if (table[numberFile[horizontalMove.x] + horizontalMove.y]?.type === null) {
          possibleMoves.push(numberFile[horizontalMove.x] + horizontalMove.y);
        }
      }
    }
    highliteSquares({ squares: possibleMoves });
  } else if (square[squareName].type === "bishop" && square[squareName].color === turn) {
    const possibleMoves = [];
    const initialX = fileNumber[file];
    const initialY = row;
    for (let i = 1; i < 8; i++) {
      if (table[numberFile[initialX + i] + (initialY + i)]?.type === null) {
        possibleMoves.push(numberFile[initialX + i] + (initialY + i));
      } else break;
    }
    for (let i = 1; i < 8; i++) {
      if (table[numberFile[initialX + i] + (initialY - i)]?.type === null) {
        possibleMoves.push(numberFile[initialX + i] + (initialY - i));
      } else break;
    }
    for (let i = 1; i < 8; i++) {
      if (table[numberFile[initialX - i] + (initialY - i)]?.type === null) {
        possibleMoves.push(numberFile[initialX - i] + (initialY - i));
      } else break;
    }
    for (let i = 1; i < 8; i++) {
      if (table[numberFile[initialX - i] + (initialY + i)]?.type === null) {
        possibleMoves.push(numberFile[initialX - i] + (initialY + i));
      } else break;
    }
    highliteSquares({ squares: possibleMoves });
  } else if (square[squareName].type === "rook" && square[squareName].color === turn) {
    const possibleMoves = [];
    const initialX = fileNumber[file];
    const initialY = row;
    for (let i = 1; i < 8; i++) {
      if (table[numberFile[initialX - i] + initialY]?.type === null) {
        possibleMoves.push(numberFile[initialX - i] + initialY);
      } else break;
    }
    for (let i = 1; i < 8; i++) {
      if (table[numberFile[initialX + i] + initialY]?.type === null) {
        possibleMoves.push(numberFile[initialX + i] + initialY);
      } else break;
    }
    for (let i = 1; i < 8; i++) {
      if (table[numberFile[initialX] + (initialY + i)]?.type === null) {
        possibleMoves.push(numberFile[initialX] + (initialY + i));
      } else break;
    }
    for (let i = 1; i < 8; i++) {
      if (table[numberFile[initialX] + (initialY - i)]?.type === null) {
        possibleMoves.push(numberFile[initialX] + (initialY - i));
      } else break;
    }
    highliteSquares({ squares: possibleMoves });
  }
};
export default onClickSquare;

import { FILE_LETTER } from "./constants";
import { willBeCheck } from "./generalFunctions";
import { Color, FileNumber, IMove, ITableState } from "./interfaces";

interface IGetQueenMoves {
  table: ITableState;
  file: string;
  row: number;
  color: Color | null;
  enPassantSquare: string | null;
}

export const getQueenAttackingMovesWithoutCheckingForCheck = ({ table, file, row, color }: IGetQueenMoves): string[] | null => {
  const possibleMoves = [];
  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;

  // Left row
  for (let i = 1; i < 8; i++) {
    const leftRowSquare = FILE_LETTER[initialX - i - 1] + initialY;

    if (table[leftRowSquare] && table[leftRowSquare]?.type !== null && table[leftRowSquare]?.color !== color) {
      possibleMoves.push(leftRowSquare);
      break;
    } else if (table[leftRowSquare]?.color === color) break;
  }

  // Right row
  for (let i = 1; i < 8; i++) {
    const rightRowSquare = FILE_LETTER[initialX + i - 1] + initialY;

    if (table[rightRowSquare] && table[rightRowSquare]?.type !== null && table[rightRowSquare]?.color !== color) {
      possibleMoves.push(rightRowSquare);
      break;
    } else if (table[rightRowSquare]?.color === color) break;
  }

  // Top file
  for (let i = 1; i < 8; i++) {
    const topFileSquare = FILE_LETTER[initialX - 1] + (initialY + i);

    if (table[topFileSquare] && table[topFileSquare]?.type !== null && table[topFileSquare]?.color !== color) {
      possibleMoves.push(topFileSquare);
      break;
    } else if (table[topFileSquare]?.color === color) break;
  }

  // Bottom row
  for (let i = 1; i < 8; i++) {
    const bottomFileSquare = FILE_LETTER[initialX - 1] + (initialY - i);

    if (table[bottomFileSquare] && table[bottomFileSquare]?.type !== null && table[bottomFileSquare]?.color !== color) {
      possibleMoves.push(bottomFileSquare);
      break;
    } else if (table[bottomFileSquare]?.color === color) break;
  }

  // Top-right diagonal
  for (let i = 1; i < 8; i++) {
    const topRightDiagonalSquare = FILE_LETTER[initialX + i - 1] + (initialY + i);

    if (table[topRightDiagonalSquare] && table[topRightDiagonalSquare]?.type !== null && table[topRightDiagonalSquare]?.color !== color) {
      possibleMoves.push(topRightDiagonalSquare);
      break;
    } else if (table[topRightDiagonalSquare]?.color === color) break;
  }

  // Bottom-right diagonal
  for (let i = 1; i < 8; i++) {
    const bottomRightDiagonalSquare = FILE_LETTER[initialX + i - 1] + (initialY - i);

    if (
      table[bottomRightDiagonalSquare] &&
      table[bottomRightDiagonalSquare]?.type !== null &&
      table[bottomRightDiagonalSquare]?.color !== color
    ) {
      possibleMoves.push(bottomRightDiagonalSquare);
      break;
    } else if (table[bottomRightDiagonalSquare]?.color === color) break;
  }

  // Top-left diagonal
  for (let i = 1; i < 8; i++) {
    const topLeftDiagonalSquare = FILE_LETTER[initialX - i - 1] + (initialY + i);

    if (table[topLeftDiagonalSquare] && table[topLeftDiagonalSquare]?.type !== null && table[topLeftDiagonalSquare]?.color !== color) {
      possibleMoves.push(topLeftDiagonalSquare);
      break;
    } else if (table[topLeftDiagonalSquare]?.color === color) break;
  }

  // Bottom-left diagonal
  for (let i = 1; i < 8; i++) {
    const bottomLeftDiagonalSquare = FILE_LETTER[initialX - i - 1] + (initialY - i);

    if (
      table[bottomLeftDiagonalSquare] &&
      table[bottomLeftDiagonalSquare]?.type !== null &&
      table[bottomLeftDiagonalSquare]?.color !== color
    ) {
      possibleMoves.push(bottomLeftDiagonalSquare);
      break;
    } else if (table[bottomLeftDiagonalSquare]?.color === color) break;
  }
  return possibleMoves;
};
export const getQueenAttackingMoves = ({ table, file, row, color, enPassantSquare }: IGetQueenMoves): IMove[] | null => {
  const possibleMoves: IMove[] | null = [];
  if (color === undefined || color === null) return null;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;

  // Left row
  for (let i = 1; i < 8; i++) {
    const leftRowSquare = FILE_LETTER[initialX - i - 1] + initialY;

    if (table[leftRowSquare] && table[leftRowSquare]?.type !== null && table[leftRowSquare]?.color !== color) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: leftRowSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: leftRowSquare });
      }
      break;
    } else if (table[leftRowSquare]?.color === color) break;
  }

  // Right row
  for (let i = 1; i < 8; i++) {
    const rightRowSquare = FILE_LETTER[initialX + i - 1] + initialY;

    if (table[rightRowSquare] && table[rightRowSquare]?.type !== null && table[rightRowSquare]?.color !== color) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: rightRowSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: rightRowSquare });
      }
      break;
    } else if (table[rightRowSquare]?.color === color) break;
  }

  // Top file
  for (let i = 1; i < 8; i++) {
    const topFileSquare = FILE_LETTER[initialX - 1] + (initialY + i);

    if (table[topFileSquare] && table[topFileSquare]?.type !== null && table[topFileSquare]?.color !== color) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: topFileSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: topFileSquare });
      }
      break;
    } else if (table[topFileSquare]?.color === color) break;
  }

  // Bottom file
  for (let i = 1; i < 8; i++) {
    const bottomFileSquare = FILE_LETTER[initialX - 1] + (initialY - i);

    if (table[bottomFileSquare] && table[bottomFileSquare]?.type !== null && table[bottomFileSquare]?.color !== color) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: bottomFileSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: bottomFileSquare });
      }
      break;
    } else if (table[bottomFileSquare]?.color === color) break;
  }

  //Top-right diagonal
  for (let i = 1; i < 8; i++) {
    const topRightDiagonalSquare = FILE_LETTER[initialX + i - 1] + (initialY + i);

    if (table[topRightDiagonalSquare] && table[topRightDiagonalSquare]?.type !== null && table[topRightDiagonalSquare]?.color !== color) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: topRightDiagonalSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: topRightDiagonalSquare });
      }
      break;
    } else if (table[topRightDiagonalSquare]?.color === color) break;
  }

  //Bottom-right diagonal
  for (let i = 1; i < 8; i++) {
    const bottomRightDiagonalSquare = FILE_LETTER[initialX + i - 1] + (initialY - i);

    if (
      table[bottomRightDiagonalSquare] &&
      table[bottomRightDiagonalSquare]?.type !== null &&
      table[bottomRightDiagonalSquare]?.color !== color
    ) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: bottomRightDiagonalSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: bottomRightDiagonalSquare });
      }
      break;
    } else if (table[bottomRightDiagonalSquare]?.color === color) break;
  }

  //Top-left diagonal
  for (let i = 1; i < 8; i++) {
    const topLeftDiagonalSquare = FILE_LETTER[initialX - i - 1] + (initialY + i);

    if (table[topLeftDiagonalSquare] && table[topLeftDiagonalSquare]?.type !== null && table[topLeftDiagonalSquare]?.color !== color) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: topLeftDiagonalSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: topLeftDiagonalSquare });
      }
      break;
    } else if (table[topLeftDiagonalSquare]?.color === color) break;
  }

  //Bottom-left diagonal
  for (let i = 1; i < 8; i++) {
    const bottomLeftDiagonalSquare = FILE_LETTER[initialX - i - 1] + (initialY - i);

    if (
      table[bottomLeftDiagonalSquare] &&
      table[bottomLeftDiagonalSquare]?.type !== null &&
      table[bottomLeftDiagonalSquare]?.color !== color
    ) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: bottomLeftDiagonalSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: bottomLeftDiagonalSquare });
      }
      break;
    } else if (table[bottomLeftDiagonalSquare]?.color === color) break;
  }
  return possibleMoves;
};
export const getQueenMoves = ({ table, file, row, color, enPassantSquare }: IGetQueenMoves): IMove[] | null => {
  const possibleMoves: IMove[] | null = [];
  if (color === undefined || color === null) return null;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;

  //Left row
  for (let i = 1; i < 8; i++) {
    const leftRowSquare = FILE_LETTER[initialX - i - 1] + initialY;

    if (table[leftRowSquare]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: leftRowSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: leftRowSquare });
      }
    } else break;
  }

  //Right row
  for (let i = 1; i < 8; i++) {
    const rightRowSquare = FILE_LETTER[initialX + i - 1] + initialY;

    if (table[rightRowSquare]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: rightRowSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: rightRowSquare });
      }
    } else break;
  }

  //Top file
  for (let i = 1; i < 8; i++) {
    const topFileSquare = FILE_LETTER[initialX - 1] + (initialY + i);

    if (table[topFileSquare]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: topFileSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: topFileSquare });
      }
    } else break;
  }

  //Bottom file
  for (let i = 1; i < 8; i++) {
    const bottomFileSquare = FILE_LETTER[initialX - 1] + (initialY - i);

    if (table[bottomFileSquare]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: bottomFileSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: bottomFileSquare });
      }
    } else break;
  }

  //Top-right diagonal
  for (let i = 1; i < 8; i++) {
    const topRightDiagonalSquare = FILE_LETTER[initialX + i - 1] + (initialY + i);

    if (table[topRightDiagonalSquare]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: topRightDiagonalSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: topRightDiagonalSquare });
      }
    } else break;
  }

  //Bottom-right diagonal
  for (let i = 1; i < 8; i++) {
    const bottomRightDiagonalSquare = FILE_LETTER[initialX + i - 1] + (initialY - i);

    if (table[bottomRightDiagonalSquare]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: bottomRightDiagonalSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: bottomRightDiagonalSquare });
      }
    } else break;
  }

  //Top-left diagonal
  for (let i = 1; i < 8; i++) {
    const topLeftDiagonalSquare = FILE_LETTER[initialX - i - 1] + (initialY + i);

    if (table[topLeftDiagonalSquare]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: topLeftDiagonalSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: topLeftDiagonalSquare });
      }
    } else break;
  }

  //Bottom-left diagonal
  for (let i = 1; i < 8; i++) {
    const bottomLeftDiagonalSquare = FILE_LETTER[initialX - i - 1] + (initialY - i);

    if (table[bottomLeftDiagonalSquare]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: bottomLeftDiagonalSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: bottomLeftDiagonalSquare });
      }
    } else break;
  }
  return possibleMoves;
};

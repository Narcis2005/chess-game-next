import { FILE_LETTER } from "./constants";
import { willBeCheck } from "./generalFunctions";
import { Color, FileNumber, IMove, ITableState } from "./interfaces";

interface IGetBishopMoves {
  table: ITableState;
  file: string;
  row: number;
  color: Color | null;
  enPassantSquare: string | null;
}
export const getBishopAttackingMovesWithoutCheckingForCheck = ({ table, file, row, color }: IGetBishopMoves): string[] | null => {
  const possibleMoves: string[] | null = [];
  if (color === undefined || color === null) return possibleMoves;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;

  // Up-right diagonal
  for (let i = 1; i < 8; i++) {
    const upperRightDiagonalSquare = FILE_LETTER[initialX + i - 1] + (initialY + i);
    if (
      table[upperRightDiagonalSquare] &&
      table[upperRightDiagonalSquare]?.color !== color &&
      table[upperRightDiagonalSquare]?.type !== null
    ) {
      possibleMoves.push(upperRightDiagonalSquare);

      break;
    } else if (table[upperRightDiagonalSquare]?.color === color) break;
  }

  // Down-right diagonal
  for (let i = 1; i < 8; i++) {
    const lowerRightDiagonalSquare = FILE_LETTER[initialX + i - 1] + (initialY - i);
    if (
      table[lowerRightDiagonalSquare] &&
      table[lowerRightDiagonalSquare]?.color !== color &&
      table[lowerRightDiagonalSquare]?.type !== null
    ) {
      possibleMoves.push(lowerRightDiagonalSquare);

      break;
    } else if (table[lowerRightDiagonalSquare]?.color === color) break;
  }

  // Down-left diagonal
  for (let i = 1; i < 8; i++) {
    const lowerLeftDiagonalSquare = FILE_LETTER[initialX - i - 1] + (initialY - i);
    if (
      table[lowerLeftDiagonalSquare] &&
      table[lowerLeftDiagonalSquare]?.color !== color &&
      table[lowerLeftDiagonalSquare]?.type !== null
    ) {
      possibleMoves.push(lowerLeftDiagonalSquare);

      break;
    } else if (table[lowerLeftDiagonalSquare]?.color) break;
  }

  // Up-left diagonal
  for (let i = 1; i < 8; i++) {
    const upperLeftDiagonalSquare = FILE_LETTER[initialX - i - 1] + (initialY + i);
    if (
      table[upperLeftDiagonalSquare] &&
      table[upperLeftDiagonalSquare]?.color !== color &&
      table[upperLeftDiagonalSquare]?.type !== null
    ) {
      possibleMoves.push(upperLeftDiagonalSquare);

      break;
    } else if (table[upperLeftDiagonalSquare]?.color === color) break;
  }
  return possibleMoves;
};
export const getBishopAttackingMoves = ({ table, file, row, color, enPassantSquare }: IGetBishopMoves): IMove[] | null => {
  const possibleMoves: IMove[] | null = [];
  if (color === undefined || color === null) return null;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;

  // Up-right diagonal
  for (let i = 1; i < 8; i++) {
    const upperRightDiagonalSquare = FILE_LETTER[initialX + i - 1] + (initialY + i);
    if (
      table[upperRightDiagonalSquare] &&
      table[upperRightDiagonalSquare]?.color !== color &&
      table[upperRightDiagonalSquare]?.type !== null
    ) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: upperRightDiagonalSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: upperRightDiagonalSquare });
      }
      break;
    } else if (table[upperRightDiagonalSquare]?.color === color) break;
  }

  // Down-right diagonal
  for (let i = 1; i < 8; i++) {
    const lowerRightDiagonalSquare = FILE_LETTER[initialX + i - 1] + (initialY - i);
    if (
      table[lowerRightDiagonalSquare] &&
      table[lowerRightDiagonalSquare]?.color !== color &&
      table[lowerRightDiagonalSquare]?.type !== null
    ) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: lowerRightDiagonalSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: lowerRightDiagonalSquare });
      }
      break;
    } else if (table[lowerRightDiagonalSquare]?.color === color) break;
  }

  // Down-left diagonal
  for (let i = 1; i < 8; i++) {
    const lowerLeftDiagonalSquare = FILE_LETTER[initialX - i - 1] + (initialY - i);
    if (
      table[lowerLeftDiagonalSquare] &&
      table[lowerLeftDiagonalSquare]?.color !== color &&
      table[lowerLeftDiagonalSquare]?.type !== null
    ) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: lowerLeftDiagonalSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: lowerLeftDiagonalSquare });
      }
      break;
    } else if (table[lowerLeftDiagonalSquare]?.color) break;
  }

  // Up-left diagonal
  for (let i = 1; i < 8; i++) {
    const upperLeftDiagonalSquare = FILE_LETTER[initialX - i - 1] + (initialY + i);
    if (
      table[upperLeftDiagonalSquare] &&
      table[upperLeftDiagonalSquare]?.color !== color &&
      table[upperLeftDiagonalSquare]?.type !== null
    ) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: upperLeftDiagonalSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: upperLeftDiagonalSquare });
      }
      break;
    } else if (table[upperLeftDiagonalSquare]?.color === color) break;
  }
  return possibleMoves;
};
export const getBishopMoves = ({ table, file, row, color, enPassantSquare }: IGetBishopMoves): IMove[] | null => {
  const possibleMoves: IMove[] | null = [];
  if (color === undefined || color === null) return null;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;

  // Up-right diagonal
  for (let i = 1; i < 8; i++) {
    const upperRightDiagonalSquare = FILE_LETTER[initialX + i - 1] + (initialY + i);
    if (table[upperRightDiagonalSquare]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: upperRightDiagonalSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: upperRightDiagonalSquare });
      }
    } else break;
  }

  // Down-left diagonal
  for (let i = 1; i < 8; i++) {
    const lowerLeftDiagonalSquare = FILE_LETTER[initialX + i - 1] + (initialY - i);
    if (table[lowerLeftDiagonalSquare]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: lowerLeftDiagonalSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: lowerLeftDiagonalSquare });
      }
    } else break;
  }

  // Down-left diagonal
  for (let i = 1; i < 8; i++) {
    const lowerLeftDiagonalSquare = FILE_LETTER[initialX - i - 1] + (initialY - i);
    if (table[lowerLeftDiagonalSquare]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: lowerLeftDiagonalSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: lowerLeftDiagonalSquare });
      }
    } else break;
  }

  // Up-left diagonal
  for (let i = 1; i < 8; i++) {
    const upperLeftDiagonalSquare = FILE_LETTER[initialX - i - 1] + (initialY + i);
    if (table[upperLeftDiagonalSquare]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: upperLeftDiagonalSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: upperLeftDiagonalSquare });
      }
    } else break;
  }
  return possibleMoves;
};

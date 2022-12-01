import { FILE_LETTER } from "./constants";
import { willBeCheck } from "./generalFunctions";
import { Color, FileNumber, IMove, ITableState } from "./interfaces";

interface IGetRookMoves {
  table: ITableState;
  file: string;
  row: number;
  color: Color | null;
  enPassantSquare: string | null;
}
export const getRookAttackingMovesWithoutCheckingForCheck = ({ table, file, row, color }: IGetRookMoves): string[] | null => {
  const possibleMoves: string[] | null = [];
  if (color === undefined || color === null) return possibleMoves;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;

  // Bottom file
  for (let i = 1; i < 8; i++) {
    const bottomSquare = FILE_LETTER[initialX - i - 1] + initialY;
    if (table[bottomSquare] && table[bottomSquare]?.type !== null && table[bottomSquare]?.color !== color) {
      possibleMoves.push(bottomSquare);

      break;
    } else if (table[bottomSquare]?.color === color) break;
  }

  // Top file
  for (let i = 1; i < 8; i++) {
    const topSquare = FILE_LETTER[initialX + i - 1] + initialY;
    if (table[topSquare] && table[topSquare]?.type !== null && table[topSquare]?.color !== color) {
      possibleMoves.push(topSquare);

      break;
    } else if (table[topSquare]?.color === color) break;
  }

  // Right row
  for (let i = 1; i < 8; i++) {
    const rightSquare = FILE_LETTER[initialX - 1] + (initialY + i);
    if (table[rightSquare] && table[rightSquare]?.type !== null && table[rightSquare]?.color !== color) {
      possibleMoves.push(rightSquare);

      break;
    } else if (table[rightSquare]?.color === color) break;
  }

  // Left row
  for (let i = 1; i < 8; i++) {
    const leftSquare = FILE_LETTER[initialX - 1] + (initialY - i);
    if (table[leftSquare] && table[leftSquare]?.type !== null && table[leftSquare]?.color !== color) {
      possibleMoves.push(leftSquare);

      break;
    } else if (table[leftSquare]?.color === color) break;
  }
  return possibleMoves;
};
export const getRookAttackingMoves = ({ table, file, row, color, enPassantSquare }: IGetRookMoves): IMove[] | null => {
  const possibleMoves: IMove[] | null = [];
  if (color === undefined || color === null) return null;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;

  // Top file
  for (let i = 1; i < 8; i++) {
    const topSquare = FILE_LETTER[initialX - i - 1] + initialY;
    if (table[topSquare] && table[topSquare]?.type !== null && table[topSquare]?.color !== color) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: topSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: topSquare });
      }
      break;
    } else if (table[topSquare]?.color === color) break;
  }

  // Bottom file
  for (let i = 1; i < 8; i++) {
    const bottomSquare = FILE_LETTER[initialX + i - 1] + initialY;
    if (table[bottomSquare] && table[bottomSquare]?.type !== null && table[bottomSquare]?.color !== color) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: bottomSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: bottomSquare });
      }
      break;
    } else if (table[bottomSquare]?.color === color) break;
  }

  // Right row
  for (let i = 1; i < 8; i++) {
    const rightSquare = FILE_LETTER[initialX - 1] + (initialY + i);
    if (table[rightSquare] && table[rightSquare]?.type !== null && table[rightSquare]?.color !== color) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: rightSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: rightSquare });
      }
      break;
    } else if (table[rightSquare]?.color === color) break;
  }

  // Left row
  for (let i = 1; i < 8; i++) {
    const leftSquare = FILE_LETTER[initialX - 1] + (initialY - i);
    if (table[leftSquare] && table[leftSquare]?.type !== null && table[leftSquare]?.color !== color) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: leftSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: leftSquare });
      }
      break;
    } else if (table[leftSquare]?.color === color) break;
  }
  return possibleMoves;
};

export const getRookMoves = ({ table, file, row, color, enPassantSquare }: IGetRookMoves): IMove[] | null => {
  const possibleMoves: IMove[] | null = [];
  if (color === undefined || color === null) return null;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;

  // Top file
  for (let i = 1; i < 8; i++) {
    const topSquare = FILE_LETTER[initialX - i - 1] + initialY;
    if (table[topSquare]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: topSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: topSquare });
      }
    } else break;
  }

  // Bottom file
  for (let i = 1; i < 8; i++) {
    const bottomSquare = FILE_LETTER[initialX + i - 1] + initialY;
    if (table[bottomSquare]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: bottomSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: bottomSquare });
      }
    } else break;
  }

  // Right row
  for (let i = 1; i < 8; i++) {
    const rightSquare = FILE_LETTER[initialX - 1] + (initialY + i);
    if (table[rightSquare]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: rightSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: rightSquare });
      }
    } else break;
  }

  // Left Row
  for (let i = 1; i < 8; i++) {
    const leftSquare = FILE_LETTER[initialX - 1] + (initialY - i);
    if (table[leftSquare]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          color: color,
          square: leftSquare,
          row,
          file,
          enPassantSquare,
        })
      ) {
        possibleMoves.push({ initialSquare: file + row, targetSquare: leftSquare });
      }
    } else break;
  }
  return possibleMoves;
};

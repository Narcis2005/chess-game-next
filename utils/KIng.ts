import { FILE_LETTER } from "./constants";
import { willBeCheck } from "./generalFunctions";
import { Color, FileNumber, ITableState, Piece } from "./interfaces";

interface IGetKingMoves {
  table: ITableState;
  file: string;
  row: number;
  color: Color | null;
  enPassantSquare: string | null;
}
export const getKingAttackingMovesWithoutCheckingForCheck = ({ table, file, row, color }: IGetKingMoves): string[] | null => {
  const possibleMoves: string[] | null = [];
  if (color === undefined || color === null) return possibleMoves;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  const squareAboveKing = FILE_LETTER[initialX - 1] + (initialY + 1);
  if (table[squareAboveKing] && table[squareAboveKing]?.type !== null && table[squareAboveKing]?.color !== color) {
    possibleMoves.push(squareAboveKing);
  }
  const rightSquareAboveKing = FILE_LETTER[initialX] + (initialY + 1);
  if (table[rightSquareAboveKing] && table[rightSquareAboveKing]?.type !== null && table[rightSquareAboveKing]?.color !== color) {
    possibleMoves.push(rightSquareAboveKing);
  }
  const leftSquareAboveKing = FILE_LETTER[initialX - 2] + (initialY + 1);
  if (table[leftSquareAboveKing] && table[leftSquareAboveKing]?.type !== null && table[leftSquareAboveKing]?.color !== color) {
    possibleMoves.push(leftSquareAboveKing);
  }
  const leftSquareNextToKing = FILE_LETTER[initialX - 2] + initialY;
  if (table[leftSquareNextToKing] && table[leftSquareNextToKing]?.type !== null && table[leftSquareNextToKing]?.color !== color) {
    possibleMoves.push(leftSquareNextToKing);
  }
  const rightSquareNextToKing = FILE_LETTER[initialX] + initialY;
  if (table[rightSquareNextToKing] && table[rightSquareNextToKing]?.type !== null && table[rightSquareNextToKing]?.color !== color) {
    possibleMoves.push(rightSquareNextToKing);
  }
  const leftSquareBelowKing = FILE_LETTER[initialX - 2] + (initialY - 1);
  if (table[leftSquareBelowKing] && table[leftSquareBelowKing]?.type !== null && table[leftSquareBelowKing]?.color !== color) {
    possibleMoves.push(leftSquareBelowKing);
  }
  const squareBelowKing = FILE_LETTER[initialX - 1] + (initialY - 1);
  if (table[squareBelowKing] && table[squareBelowKing]?.type !== null && table[squareBelowKing]?.color !== color) {
    possibleMoves.push(squareBelowKing);
  }
  const rightSquareBelowKing = FILE_LETTER[initialX] + (initialY - 1);
  if (table[rightSquareBelowKing] && table[rightSquareBelowKing]?.type !== null && table[rightSquareBelowKing]?.color !== color) {
    possibleMoves.push(rightSquareBelowKing);
  }
  return possibleMoves;
};
export const getKingAttackingMoves = ({ table, file, row, color, enPassantSquare }: IGetKingMoves): string[] | null => {
  const possibleMoves: string[] | null = [];
  if (color === undefined || color === null) return possibleMoves;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  const squareAboveKing = FILE_LETTER[initialX - 1] + (initialY + 1);
  if (table[squareAboveKing] && table[squareAboveKing]?.type !== null && table[squareAboveKing]?.color !== color) {
    if (
      !willBeCheck({
        table: table,
        color: color,
        square: squareAboveKing,
        row,
        file,
        enPassantSquare,
      })
    ) {
      possibleMoves.push(squareAboveKing);
    }
  }
  const rightSquareAboveKing = FILE_LETTER[initialX] + (initialY + 1);
  if (table[rightSquareAboveKing] && table[rightSquareAboveKing]?.type !== null && table[rightSquareAboveKing]?.color !== color) {
    if (
      !willBeCheck({
        table: table,
        color: color,
        square: rightSquareAboveKing,
        row,
        file,
        enPassantSquare,
      })
    ) {
      possibleMoves.push(rightSquareAboveKing);
    }
  }
  const leftSquareAboveKing = FILE_LETTER[initialX - 2] + (initialY + 1);
  if (table[leftSquareAboveKing] && table[leftSquareAboveKing]?.type !== null && table[leftSquareAboveKing]?.color !== color) {
    if (
      !willBeCheck({
        table: table,
        color: color,
        square: leftSquareAboveKing,
        row,
        enPassantSquare,
        file,
      })
    ) {
      possibleMoves.push(leftSquareAboveKing);
    }
  }
  const leftSquareNextToKing = FILE_LETTER[initialX - 2] + initialY;
  if (table[leftSquareNextToKing] && table[leftSquareNextToKing]?.type !== null && table[leftSquareNextToKing]?.color !== color) {
    if (
      !willBeCheck({
        table: table,
        color: color,
        square: leftSquareNextToKing,
        row,
        file,
        enPassantSquare,
      })
    ) {
      possibleMoves.push(leftSquareNextToKing);
    }
  }
  const rightSquareNextToKing = FILE_LETTER[initialX] + initialY;
  if (table[rightSquareNextToKing] && table[rightSquareNextToKing]?.type !== null && table[rightSquareNextToKing]?.color !== color) {
    if (
      !willBeCheck({
        table: table,
        color: color,
        square: rightSquareNextToKing,
        row,
        file,
        enPassantSquare,
      })
    ) {
      possibleMoves.push(rightSquareNextToKing);
    }
  }
  const leftSquareBelowKing = FILE_LETTER[initialX - 2] + (initialY - 1);
  if (table[leftSquareBelowKing] && table[leftSquareBelowKing]?.type !== null && table[leftSquareBelowKing]?.color !== color) {
    if (
      !willBeCheck({
        table: table,
        color: color,
        square: leftSquareBelowKing,
        row,
        file,
        enPassantSquare,
      })
    ) {
      possibleMoves.push(leftSquareBelowKing);
    }
  }
  const squareBelowKing = FILE_LETTER[initialX - 1] + (initialY - 1);
  if (table[squareBelowKing] && table[squareBelowKing]?.type !== null && table[squareBelowKing]?.color !== color) {
    if (
      !willBeCheck({
        table: table,
        color: color,
        square: squareBelowKing,
        row,
        file,
        enPassantSquare,
      })
    ) {
      possibleMoves.push(squareBelowKing);
    }
  }
  const rightSquareBelowKing = FILE_LETTER[initialX] + (initialY - 1);
  if (table[rightSquareBelowKing] && table[rightSquareBelowKing]?.type !== null && table[rightSquareBelowKing]?.color !== color) {
    if (
      !willBeCheck({
        table: table,
        color: color,
        square: rightSquareBelowKing,
        row,
        file,
        enPassantSquare,
      })
    ) {
      possibleMoves.push(rightSquareBelowKing);
    }
  }
  return possibleMoves;
};
interface IGetKingMovesReturn {
  moves: string[];
  kingSideCastling: boolean;
  queenSideCastling: boolean;
}
export const getKingMoves = ({ table, file, row, color, enPassantSquare }: IGetKingMoves): null | IGetKingMovesReturn => {
  const possibleMoves: string[] | null = [];
  if (color === undefined || color === null) return null;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  const squareAboveKing = FILE_LETTER[initialX - 1] + (initialY + 1);
  if (table[squareAboveKing]?.type === null) {
    if (
      !willBeCheck({
        table: table,
        color: color,
        square: squareAboveKing,
        row,
        file,
        enPassantSquare,
      })
    ) {
      possibleMoves.push(squareAboveKing);
    }
  }
  const rightSquareAboveKing = FILE_LETTER[initialX] + (initialY + 1);
  if (table[rightSquareAboveKing]?.type === null) {
    if (
      !willBeCheck({
        table: table,
        color: color,
        square: rightSquareAboveKing,
        row,
        file,
        enPassantSquare,
      })
    ) {
      possibleMoves.push(rightSquareAboveKing);
    }
  }
  const leftSquareAboveKing = FILE_LETTER[initialX - 2] + (initialY + 1);
  if (table[leftSquareAboveKing]?.type === null) {
    if (
      !willBeCheck({
        table: table,
        color: color,
        square: leftSquareAboveKing,
        row,
        file,
        enPassantSquare,
      })
    ) {
      possibleMoves.push(leftSquareAboveKing);
    }
  }
  const leftSquareNextToKing = FILE_LETTER[initialX - 2] + initialY;
  if (table[leftSquareNextToKing]?.type === null) {
    if (
      !willBeCheck({
        table: table,
        color: color,
        square: leftSquareNextToKing,
        row,
        file,
        enPassantSquare,
      })
    ) {
      possibleMoves.push(leftSquareNextToKing);
    }
  }
  const rightSquareNextToKing = FILE_LETTER[initialX] + initialY;
  if (table[rightSquareNextToKing]?.type === null) {
    if (
      !willBeCheck({
        table: table,
        color: color,
        square: rightSquareNextToKing,
        row,
        file,
        enPassantSquare,
      })
    ) {
      possibleMoves.push(rightSquareNextToKing);
    }
  }
  const leftSquareBelowKing = FILE_LETTER[initialX - 2] + (initialY - 1);
  if (table[leftSquareBelowKing]?.type === null) {
    if (
      !willBeCheck({
        table: table,
        color: color,
        square: leftSquareBelowKing,
        row,
        file,
        enPassantSquare,
      })
    ) {
      possibleMoves.push(leftSquareBelowKing);
    }
  }
  const squareBelowKing = FILE_LETTER[initialX - 1] + (initialY - 1);
  if (table[squareBelowKing]?.type === null) {
    if (
      !willBeCheck({
        table: table,
        color: color,
        square: squareBelowKing,
        row,
        file,
        enPassantSquare,
      })
    ) {
      possibleMoves.push(squareBelowKing);
    }
  }
  const rightSquareBelowKing = FILE_LETTER[initialX] + (initialY - 1);
  if (table[rightSquareBelowKing]?.type === null) {
    if (
      !willBeCheck({
        table: table,
        color: color,
        square: rightSquareBelowKing,
        row,
        enPassantSquare,
        file,
      })
    ) {
      possibleMoves.push(rightSquareBelowKing);
    }
  }
  let kingSideCastling = false;
  let queenSideCastling = false;
  if (
    table[FILE_LETTER[initialX] + initialY]?.type === null && // check if the first right square is empty
    table[FILE_LETTER[initialX + 1] + initialY]?.type === null && // check if the second right square is empty
    table[FILE_LETTER[initialX + 2] + initialY] && //check if the the third right square exists (to prevent errors)
    table[FILE_LETTER[initialX + 2] + initialY]?.type === Piece.rook && //check if the fourth right square is rook
    table[FILE_LETTER[initialX + 2] + initialY]?.color === color && //check if the fourth right square is the right color
    table[FILE_LETTER[initialX + 2] + initialY]?.hasMoved === false && // check if the rook has ever moved
    table[FILE_LETTER[initialX - 1] + initialY]?.hasMoved === false && // check if the king has ever moved
    !willBeCheck({
      table: table,
      color: color,
      square: FILE_LETTER[initialX - 1] + initialY,
      row,
      file,
      enPassantSquare,
    }) && //check if the king is in check
    !willBeCheck({
      table: table,
      color: color,
      square: FILE_LETTER[initialX] + initialY,
      row,
      file,
      enPassantSquare,
    }) && //check if the king will be in check when it passes through the first right square
    !willBeCheck({
      table: table,
      color: color,
      square: FILE_LETTER[initialX + 1] + initialY,
      row,
      file,
      enPassantSquare,
    }) //check if the king will be in check when it passes through the second right square
  ) {
    kingSideCastling = true;
  }
  if (
    table[FILE_LETTER[initialX - 2] + initialY]?.type === null && // check if the first left square is empty
    table[FILE_LETTER[initialX - 3] + initialY]?.type === null && // check if the second left square is empty
    table[FILE_LETTER[initialX - 4] + initialY]?.type === null && // check if the third left square is empty
    table[FILE_LETTER[initialX - 5] + initialY] && //check if the the fourth left square exists (to prevent errors)
    table[FILE_LETTER[initialX - 5] + initialY]?.type === Piece.rook && //check if the fourth left square is rook
    table[FILE_LETTER[initialX - 5] + initialY]?.color === color && // check if the rook color is the good color
    table[FILE_LETTER[initialX - 5] + initialY]?.hasMoved === false && // check if the rook has ever moved
    table[FILE_LETTER[initialX - 1] + initialY]?.hasMoved === false && //check if the king has ever moved
    !willBeCheck({
      table: table,
      color: color,
      square: FILE_LETTER[initialX - 1] + initialY,
      row,
      file,
      enPassantSquare,
    }) && //check if the king is in check
    !willBeCheck({
      table: table,
      color: color,
      square: FILE_LETTER[initialX - 2] + initialY,
      row,
      file,
      enPassantSquare,
    }) && //check if the king will be in check when it passes through the first left square
    !willBeCheck({
      table: table,
      color: color,
      square: FILE_LETTER[initialX - 3] + initialY,
      row,
      file,
      enPassantSquare,
    }) && //check if the king will be in check when it passes through the second left square
    !willBeCheck({
      table: table,
      color: color,
      square: FILE_LETTER[initialX - 4] + initialY,
      row,
      file,
      enPassantSquare,
    }) //check if the king will be in check when it passes through the third left square
  ) {
    queenSideCastling = true;
  }
  return { moves: possibleMoves, kingSideCastling, queenSideCastling };
};

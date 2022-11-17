import { createSquare, FILE_LETTER, PAWN_STARTING_POSITIONS } from "./constants";
import { willBeCheck } from "./generalFunctions";
import { Color, FileNumber, ITableState } from "./interfaces";

interface IGetPawnMoves {
  table: ITableState;
  file: string;
  row: number;
  turnCoeficient: number;
  squareName: string;
  color: Color | null;
  enPassantSquare: string | null;
}
interface IGetAttackingMovesReturn {
  attackingPossibleMoves: string[];
  enPassantMoves: string[];
}
export const getPawnAttackingMovesWithoutCheckingForCheck = ({ table, file, row, turnCoeficient, color }: IGetPawnMoves): string[] | null => {
  const attackingPossibleMoves: string[] | null = [];
  if (color === undefined || color === null) return attackingPossibleMoves;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  const cornerRightSquare = FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient);
  if (table[cornerRightSquare] && table[cornerRightSquare]?.type !== null && table[cornerRightSquare]?.color !== color) {
    attackingPossibleMoves.push(cornerRightSquare);
  }
  const cornerLeftSquare = FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient);
  if (table[cornerLeftSquare] && table[cornerLeftSquare]?.type !== null && table[cornerLeftSquare]?.color !== color) {
    attackingPossibleMoves.push(cornerLeftSquare);
  }
  //add en passant here
  return attackingPossibleMoves;
};
export const getPawnAttackingMoves = ({ table, file, row, turnCoeficient, color, enPassantSquare }: IGetPawnMoves): IGetAttackingMovesReturn | null => {
  const attackingPossibleMoves: string[] | null = [];
  if (color === undefined || color === null) return null;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  let enPassantX;
  let enPassantY;
  if (enPassantSquare) {
    enPassantX = FileNumber[enPassantSquare.split("")[0] as keyof typeof FileNumber];
    enPassantY = +enPassantSquare.split("")[1];
  }
  const cornerRightSquare = FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient);

  if (table[cornerRightSquare] && table[cornerRightSquare]?.type !== null && table[cornerRightSquare]?.color !== color) {
    if (
      !willBeCheck({
        table: table,
        row,
        file,
        square: cornerRightSquare,
        color: color,
        enPassantSquare,
      })
    ) {
      attackingPossibleMoves.push(cornerRightSquare);
    }
  }
  const cornerLeftSquare = FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient);
  if (table[cornerLeftSquare] && table[cornerLeftSquare]?.type !== null && table[cornerLeftSquare]?.color !== color) {
    if (
      !willBeCheck({
        table: table,
        row,
        file,
        square: cornerLeftSquare,
        color: color,
        enPassantSquare,
      })
    ) {
      attackingPossibleMoves.push(cornerLeftSquare);
    }
  }
  const enPassantMoves: string[] | null = [];
  if (
    enPassantSquare &&
    table[cornerLeftSquare] &&
    table[cornerLeftSquare]?.type === null &&
    enPassantY &&
    enPassantX &&
    initialY + -1 * turnCoeficient === enPassantY + -1 * turnCoeficient &&
    enPassantX === initialX - 1
  ) {
    const tableWithoutCapturedEnPassantPawn = {
      ...table,
      [enPassantSquare]: createSquare({ color: null, type: null }),
    };
    if (
      !willBeCheck({
        table: tableWithoutCapturedEnPassantPawn,
        row,
        file,
        square: cornerLeftSquare,
        color: color,
        enPassantSquare,
      })
    ) {
      enPassantMoves.push(cornerLeftSquare);
    }
  }
  if (
    enPassantSquare &&
    table[cornerRightSquare] &&
    table[cornerRightSquare]?.type === null &&
    enPassantY &&
    enPassantX &&
    initialY + -1 * turnCoeficient === enPassantY + -1 * turnCoeficient &&
    enPassantX === initialX + 1
  ) {
    const tableWithoutCapturedEnPassantPawn = {
      ...table,
      [enPassantSquare]: createSquare({ color: null, type: null }),
    };
    if (
      !willBeCheck({
        table: tableWithoutCapturedEnPassantPawn,
        row,
        file,
        square: cornerRightSquare,
        color: color,
        enPassantSquare,
      })
    ) {
      enPassantMoves.push(cornerRightSquare);
    }
  }

  return { attackingPossibleMoves, enPassantMoves };
};
export const getPawnMoves = ({ table, file, row, turnCoeficient, squareName, color, enPassantSquare }: IGetPawnMoves): string[] | null => {
  if (color === undefined || color === null) return null;
  const firstFrontSquare = file + (row + -1 * turnCoeficient);
  const secondFrontSquare = file + (row + -2 * turnCoeficient);

  // If pawn moved from initial position, it can only move one square
  if (!PAWN_STARTING_POSITIONS.includes(squareName)) {
    if (table[firstFrontSquare].type === null) {
      if (
        !willBeCheck({
          table: table,
          row,
          file,
          square: firstFrontSquare,
          color: color,
          enPassantSquare,
        })
      ) {
        return [firstFrontSquare];
      }
    }
    return null;
  }

  if (table[secondFrontSquare]?.type === null) {
    if (
      !willBeCheck({
        table: table,
        row,
        file,
        square: secondFrontSquare,
        color: color,
        enPassantSquare,
      })
    ) {
      if (table[firstFrontSquare]?.type === null) {
        if (
          !willBeCheck({
            table: table,
            row,
            file,
            square: firstFrontSquare,
            color: color,
            enPassantSquare,
          })
        ) {
          return [firstFrontSquare, secondFrontSquare]; // both front squares can block the check (probably impossible)
        } else return [secondFrontSquare]; //second square can block check
      }
    } else if (table[firstFrontSquare]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          row,
          file,
          square: firstFrontSquare,
          color: color,
          enPassantSquare,
        })
      ) {
        return [firstFrontSquare]; // front square can block check and second square is not blocked
      }
    }
  } else if (table[firstFrontSquare].type === null) {
    if (
      !willBeCheck({
        table: table,
        row,
        file,
        square: firstFrontSquare,
        color: color,
        enPassantSquare,
      })
    )
      return [firstFrontSquare]; // front square can block check and second square is  blocked
  }
  return null;
};

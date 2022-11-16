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
export const getPawnAttackingMovesWithoutCheckingForCheck = ({
  table,
  file,
  row,
  turnCoeficient,
  color,
}: IGetPawnMoves): string[] | null => {
  const attackingPossibleMoves: string[] | null = [];
  if (color === undefined || color === null) return attackingPossibleMoves;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  if (
    table[FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient)] &&
    table[FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient)]?.type !== null &&
    table[FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient)]?.color !== color
  ) {
    attackingPossibleMoves.push(FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient));
  }
  if (
    table[FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient)] &&
    table[FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient)]?.type !== null &&
    table[FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient)]?.color !== color
  ) {
    attackingPossibleMoves.push(FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient));
  }
  //add en passant here
  return attackingPossibleMoves;
};
export const getPawnAttackingMoves = ({
  table,
  file,
  row,
  turnCoeficient,
  color,
  enPassantSquare,
}: IGetPawnMoves): IGetAttackingMovesReturn | null => {
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
  if (
    table[FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient)] &&
    table[FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient)]?.type !== null &&
    table[FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient)]?.color !== color
  ) {
    if (
      !willBeCheck({
        table: table,
        row,
        file,
        square: FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient),
        color: color,
        enPassantSquare,
      })
    ) {
      attackingPossibleMoves.push(FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient));
    }
  }
  if (
    table[FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient)] &&
    table[FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient)]?.type !== null &&
    table[FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient)]?.color !== color
  ) {
    if (
      !willBeCheck({
        table: table,
        row,
        file,
        square: FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient),
        color: color,
        enPassantSquare,
      })
    ) {
      attackingPossibleMoves.push(FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient));
    }
  }
  const enPassantMoves: string[] | null = [];
  if (
    enPassantSquare &&
    table[FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient)] &&
    table[FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient)]?.type === null &&
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
        square: FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient),
        color: color,
        enPassantSquare,
      })
    ) {
      enPassantMoves.push(FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient));
    }
  }
  if (
    enPassantSquare &&
    table[FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient)] &&
    table[FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient)]?.type === null &&
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
        square: FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient),
        color: color,
        enPassantSquare,
      })
    ) {
      enPassantMoves.push(FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient));
    }
  }

  return { attackingPossibleMoves, enPassantMoves };
};
export const getPawnMoves = ({ table, file, row, turnCoeficient, squareName, color, enPassantSquare }: IGetPawnMoves): string[] | null => {
  if (color === undefined || color === null) return null;

  if (!PAWN_STARTING_POSITIONS.includes(squareName)) {
    if (table[file + (row + -1 * turnCoeficient)].type === null) {
      if (
        !willBeCheck({
          table: table,
          row,
          file,
          square: file + (row + -1 * turnCoeficient),
          color: color,
          enPassantSquare,
        })
      ) {
        return [file + (row + -1 * turnCoeficient)];
      }
    }
    return null;
  }

  if (table[file + (row + -2 * turnCoeficient)]?.type === null) {
    if (
      !willBeCheck({
        table: table,
        row,
        file,
        square: file + (row + -2 * turnCoeficient),
        color: color,
        enPassantSquare,
      })
    ) {
      if (table[file + (row + -1 * turnCoeficient)]?.type === null) {
        if (
          !willBeCheck({
            table: table,
            row,
            file,
            square: file + (row + -1 * turnCoeficient),
            color: color,
            enPassantSquare,
          })
        ) {
          return [file + (row + -1 * turnCoeficient), file + (row + -2 * turnCoeficient)]; // both front squares can block the check (probably impossible)
        } else return [file + (row + -2 * turnCoeficient)]; //second square can block check
      }
    } else if (table[file + (row + -1 * turnCoeficient)]?.type === null) {
      if (
        !willBeCheck({
          table: table,
          row,
          file,
          square: file + (row + -1 * turnCoeficient),
          color: color,
          enPassantSquare,
        })
      ) {
        return [file + (row + -1 * turnCoeficient)]; // front square can block check and second square is not blocked
      }
    }
  } else if (table[file + (row + -1 * turnCoeficient)].type === null) {
    if (
      !willBeCheck({
        table: table,
        row,
        file,
        square: file + (row + -1 * turnCoeficient),
        color: color,
        enPassantSquare,
      })
    )
      return [file + (row + -1 * turnCoeficient)]; // front square can block check and second square is  blocked
  }
  return null;
};

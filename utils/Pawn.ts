import { FILE_LETTER, PAWN_STARTING_POSITIONS } from "./constants";
import { wouldItStillBeCheck } from "./generalFunctions";
import { Color, FileNumber, ITableState } from "./interfaces";

interface IGetPawnMoves {
  table: ITableState;
  file: string;
  row: number;
  turnCoeficient: number;
  squareName: string;
  color: Color | null;
}

export const getPawnAttackingMoves = ({ table, file, row, turnCoeficient, color }: IGetPawnMoves): string[] | null => {
  const attackingPossibleMoves: string[] | null = [];

  if (color === undefined || color === null) return attackingPossibleMoves;
  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  if (
    table[FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient)] &&
    table[FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient)]?.type !== null &&
    table[FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient)]?.color !== color
  ) {
    if (
      !wouldItStillBeCheck({
        table: table,
        row,
        file,
        square: FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient),
        color: color,
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
      !wouldItStillBeCheck({
        table: table,
        row,
        file,
        square: FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient),
        color: color,
      })
    ) {
      attackingPossibleMoves.push(FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient));
    }
  }

  return attackingPossibleMoves;
};
export const getPawnMoves = ({
  table,
  file,
  row,
  turnCoeficient,
  squareName,
  color,
}: IGetPawnMoves): string[] | null => {
  if (color === undefined || color === null) return null;

  if (!PAWN_STARTING_POSITIONS.includes(squareName)) {
    if (table[file + (row + -1 * turnCoeficient)].type === null) {
      if (
        !wouldItStillBeCheck({
          table: table,
          row,
          file,
          square: file + (row + -1 * turnCoeficient),
          color: color,
        })
      ) {
        return [file + (row + -1 * turnCoeficient)];
      }
    }
    return null;
  }

  if (table[file + (row + -2 * turnCoeficient)]?.type === null) {
    if (
      !wouldItStillBeCheck({
        table: table,
        row,
        file,
        square: file + (row + -2 * turnCoeficient),
        color: color,
      })
    ) {
      if (table[file + (row + -1 * turnCoeficient)]?.type === null) {
        if (
          !wouldItStillBeCheck({
            table: table,
            row,
            file,
            square: file + (row + -1 * turnCoeficient),
            color: color,
          })
        ) {
          return [file + (row + -1 * turnCoeficient), file + (row + -2 * turnCoeficient)]; // both front squares can block the check (probably impossible)
        } else return [file + (row + -2 * turnCoeficient)]; //second square can block check
      }
    } else if (table[file + (row + -1 * turnCoeficient)]?.type === null) {
      if (
        !wouldItStillBeCheck({
          table: table,
          row,
          file,
          square: file + (row + -1 * turnCoeficient),
          color: color,
        })
      ) {
        return [file + (row + -1 * turnCoeficient)]; // front square can block check and second square is not blocked
      }
    }
  } else if (table[file + (row + -1 * turnCoeficient)].type === null) {
    if (
      !wouldItStillBeCheck({
        table: table,
        row,
        file,
        square: file + (row + -1 * turnCoeficient),
        color: color,
      })
    )
      return [file + (row + -1 * turnCoeficient)]; // front square can block check and second square is  blocked
  }
  return null;
};

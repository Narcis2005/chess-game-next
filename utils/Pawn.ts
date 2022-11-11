import { FILE_LETTER, PAWN_STARTING_POSITIONS } from "./constants";
import { Color, FileNumber, ITableState } from "./interfaces";

interface IGetPawnMoves {
  table: ITableState;
  file: string;
  row: number;
  turnCoeficient: number;
  squareName: string;
}
interface IGetPawnAttackingMoves extends IGetPawnMoves {
  color: Color | null;
}
export const getPawnAttackingMoves = ({
  table,
  file,
  row,
  turnCoeficient,
  color,
}: IGetPawnAttackingMoves): string[] | null => {
  const attackingSquares = [];
  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  if (
    table[FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient)]?.type !== null &&
    table[FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient)]?.color !== color
  ) {
    attackingSquares.push(FILE_LETTER[initialX] + (initialY + -1 * turnCoeficient));
  }
  if (
    table[FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient)]?.type !== null &&
    table[FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient)]?.color !== color
  ) {
    attackingSquares.push(FILE_LETTER[initialX - 2] + (initialY + -1 * turnCoeficient));
  }

  return attackingSquares;
};
export const GetPawnMoves = ({ table, file, row, turnCoeficient, squareName }: IGetPawnMoves): string[] | null => {
  if (!PAWN_STARTING_POSITIONS.includes(squareName)) {
    if (table[file + (row + -1 * turnCoeficient)].type === null) {
      return [file + (row + -1 * turnCoeficient)];
    }
    return null;
  }

  if (table[file + (row + -2 * turnCoeficient)]?.type === null) {
    if (table[file + (row + -1 * turnCoeficient)]?.type === null) {
      return [file + (row + -1 * turnCoeficient), file + (row + -2 * turnCoeficient)];
    }
  } else if (table[file + (row + -1 * turnCoeficient)].type === null) return [file + (row + -1 * turnCoeficient)];
  return null;
};

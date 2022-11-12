import { FILE_LETTER } from "./constants";
import { wouldItStillBeCheck } from "./generalFunctions";
import { Color, FileNumber, ITableState } from "./interfaces";
interface IGetKnightMoves {
  table: ITableState;
  file: string;
  row: number;
  color: Color | null;
}
export const getKnightAttackingMovesWithoutCheckingForCheck = ({ table, file, row, color }: IGetKnightMoves): string[] | null => {
  const possibleMoves: string[] | null = [];
  if (color === undefined || color === null) return possibleMoves;

  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      const verticalMove = { x: FileNumber[file as keyof typeof FileNumber] + j, y: row + i * 2 };
      const horizontalMove = { x: FileNumber[file as keyof typeof FileNumber] + i * 2, y: row + j };

      if (table[FILE_LETTER[verticalMove.x - 1] + verticalMove.y] && table[FILE_LETTER[verticalMove.x - 1] + verticalMove.y]?.type !== null && table[FILE_LETTER[verticalMove.x - 1] + verticalMove.y]?.color !== color) {
        possibleMoves.push(FILE_LETTER[verticalMove.x - 1] + verticalMove.y);
      }

      if (table[FILE_LETTER[horizontalMove.x - 1] + horizontalMove.y] && table[FILE_LETTER[horizontalMove.x - 1] + horizontalMove.y]?.type !== null && table[FILE_LETTER[horizontalMove.x - 1] + horizontalMove.y]?.color !== color) {
        possibleMoves.push(FILE_LETTER[horizontalMove.x - 1] + horizontalMove.y);
      }
    }
  }
  return possibleMoves;
};
export const getKnightAttackingMoves = ({ table, file, row, color }: IGetKnightMoves): string[] | null => {
  const possibleMoves: string[] | null = [];
  if (color === undefined || color === null) return possibleMoves;

  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      const verticalMove = { x: FileNumber[file as keyof typeof FileNumber] + j, y: row + i * 2 };
      const horizontalMove = { x: FileNumber[file as keyof typeof FileNumber] + i * 2, y: row + j };

      if (table[FILE_LETTER[verticalMove.x - 1] + verticalMove.y] && table[FILE_LETTER[verticalMove.x - 1] + verticalMove.y]?.type !== null && table[FILE_LETTER[verticalMove.x - 1] + verticalMove.y]?.color !== color) {
        if (
          !wouldItStillBeCheck({
            table: table,
            color: color,
            square: FILE_LETTER[verticalMove.x - 1] + verticalMove.y,
            row,
            file,
          })
        ) {
          possibleMoves.push(FILE_LETTER[verticalMove.x - 1] + verticalMove.y);
        }
      }

      if (table[FILE_LETTER[horizontalMove.x - 1] + horizontalMove.y] && table[FILE_LETTER[horizontalMove.x - 1] + horizontalMove.y]?.type !== null && table[FILE_LETTER[horizontalMove.x - 1] + horizontalMove.y]?.color !== color) {
        if (
          !wouldItStillBeCheck({
            table: table,
            square: FILE_LETTER[horizontalMove.x - 1] + horizontalMove.y,
            row,
            file,
            color: color,
          })
        ) {
          possibleMoves.push(FILE_LETTER[horizontalMove.x - 1] + horizontalMove.y);
        }
      }
    }
  }
  return possibleMoves;
};

export const getKnightMoves = ({ table, file, row, color }: IGetKnightMoves): string[] | null => {
  const possibleMoves: string[] | null = [];

  if (color === undefined || color === null) return possibleMoves;

  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      const verticalMove = { x: FileNumber[file as keyof typeof FileNumber] + j, y: row + i * 2 };
      const horizontalMove = { x: FileNumber[file as keyof typeof FileNumber] + i * 2, y: row + j };
      if (table[FILE_LETTER[verticalMove.x - 1] + verticalMove.y]?.type === null) {
        if (
          !wouldItStillBeCheck({
            table: table,
            row,
            file,
            square: FILE_LETTER[verticalMove.x - 1] + verticalMove.y,
            color: color,
          })
        ) {
          possibleMoves.push(FILE_LETTER[verticalMove.x - 1] + verticalMove.y);
        }
      }

      if (table[FILE_LETTER[horizontalMove.x - 1] + horizontalMove.y]?.type === null) {
        if (
          !wouldItStillBeCheck({
            table: table,
            row,
            file,
            square: FILE_LETTER[horizontalMove.x - 1] + horizontalMove.y,
            color: color,
          })
        ) {
          possibleMoves.push(FILE_LETTER[horizontalMove.x - 1] + horizontalMove.y);
        }
      }
    }
  }
  return possibleMoves;
};

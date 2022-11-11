import { FILE_LETTER } from "./constants";
import { Color, FileNumber, ITableState } from "./interfaces";

interface IGetKnightMoves {
  table: ITableState;
  file: string;
  row: number;
}
interface IGetKnightAttackingMoves extends IGetKnightMoves {
  color: Color | null;
}
export const getKnightAttackingMoves = ({ table, file, row, color }: IGetKnightAttackingMoves): string[] | null => {
  const possibleMoves = [];
  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      const verticalMove = { x: FileNumber[file as keyof typeof FileNumber] + j, y: row + i * 2 };
      const horizontalMove = { x: FileNumber[file as keyof typeof FileNumber] + i * 2, y: row + j };

      if (
        table[FILE_LETTER[verticalMove.x - 1] + verticalMove.y]?.type !== null &&
        table[FILE_LETTER[verticalMove.x - 1] + verticalMove.y]?.color !== color
      ) {
        possibleMoves.push(FILE_LETTER[verticalMove.x - 1] + verticalMove.y);
      }

      if (
        table[FILE_LETTER[horizontalMove.x - 1] + horizontalMove.y]?.type !== null &&
        table[FILE_LETTER[horizontalMove.x - 1] + horizontalMove.y]?.color !== color
      ) {
        console.log(table[FILE_LETTER[verticalMove.x - 1] + verticalMove.y]);

        possibleMoves.push(FILE_LETTER[horizontalMove.x - 1] + horizontalMove.y);
      }
    }
  }
  return possibleMoves;
};

export const getKnightMoves = ({ table, file, row }: IGetKnightMoves): string[] | null => {
  const possibleMoves = [];

  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      const verticalMove = { x: FileNumber[file as keyof typeof FileNumber] + j, y: row + i * 2 };
      const horizontalMove = { x: FileNumber[file as keyof typeof FileNumber] + i * 2, y: row + j };

      if (table[FILE_LETTER[verticalMove.x - 1] + verticalMove.y]?.type === null) {
        possibleMoves.push(FILE_LETTER[verticalMove.x - 1] + verticalMove.y);
      }

      if (table[FILE_LETTER[horizontalMove.x - 1] + horizontalMove.y]?.type === null) {
        possibleMoves.push(FILE_LETTER[horizontalMove.x - 1] + horizontalMove.y);
      }
    }
  }
  return possibleMoves;
};

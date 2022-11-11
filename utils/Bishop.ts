import { FILE_LETTER } from "./constants";
import { Color, FileNumber, ITableState } from "./interfaces";

interface IGetBishopMoves {
  table: ITableState;
  file: string;
  row: number;
}
interface IGetBishopAttackingMoves extends IGetBishopMoves {
  color: Color | null;
}
export const getBishopAttackingMoves = ({ table, file, row, color }: IGetBishopAttackingMoves): string[] | null => {
  const possibleMoves = [];
  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.color !== color &&
      table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.type !== null
    ) {
      possibleMoves.push(FILE_LETTER[initialX + i - 1] + (initialY + i));
      break;
    } else if (table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.color !== color &&
      table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.type !== null
    ) {
      possibleMoves.push(FILE_LETTER[initialX + i - 1] + (initialY - i));
      break;
    } else if (table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.color !== color &&
      table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.type !== null
    ) {
      possibleMoves.push(FILE_LETTER[initialX - i - 1] + (initialY - i));
      break;
    } else if (table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.color !== color &&
      table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.type !== null
    ) {
      possibleMoves.push(FILE_LETTER[initialX - i - 1] + (initialY + i));
      break;
    } else if (table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.color === color) break;
  }
  return possibleMoves;
};
export const getBishopMoves = ({ table, file, row }: IGetBishopMoves): string[] | null => {
  const possibleMoves = [];
  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  for (let i = 1; i < 8; i++) {
    if (table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.type === null) {
      possibleMoves.push(FILE_LETTER[initialX + i - 1] + (initialY + i));
    } else break;
  }
  for (let i = 1; i < 8; i++) {
    if (table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.type === null) {
      possibleMoves.push(FILE_LETTER[initialX + i - 1] + (initialY - i));
    } else break;
  }
  for (let i = 1; i < 8; i++) {
    if (table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.type === null) {
      possibleMoves.push(FILE_LETTER[initialX - i - 1] + (initialY - i));
    } else break;
  }
  for (let i = 1; i < 8; i++) {
    if (table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.type === null) {
      possibleMoves.push(FILE_LETTER[initialX - i - 1] + (initialY + i));
    } else break;
  }
  return possibleMoves;
};

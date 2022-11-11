import { FILE_LETTER } from "./constants";
import { Color, FileNumber, ITableState } from "./interfaces";

interface IGetQueenMoves {
  table: ITableState;
  file: string;
  row: number;
}
interface IGetQueenAttackingMoves extends IGetQueenMoves {
  color: Color | null;
}
export const getQueenAttackingMoves = ({ table, file, row, color }: IGetQueenAttackingMoves): string[] | null => {
  const possibleMoves = [];
  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - i - 1] + initialY]?.type !== null &&
      table[FILE_LETTER[initialX - i - 1] + initialY]?.color !== color
    ) {
      possibleMoves.push(FILE_LETTER[initialX - i - 1] + initialY);
      break;
    } else if (table[FILE_LETTER[initialX - i - 1] + initialY]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX + i - 1] + initialY]?.type !== null &&
      table[FILE_LETTER[initialX + i - 1] + initialY]?.color !== color
    ) {
      possibleMoves.push(FILE_LETTER[initialX + i - 1] + initialY);
      break;
    } else if (table[FILE_LETTER[initialX + i - 1] + initialY]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - 1] + (initialY + i)]?.type !== null &&
      table[FILE_LETTER[initialX - 1] + (initialY + i)]?.color !== color
    ) {
      possibleMoves.push(FILE_LETTER[initialX - 1] + (initialY + i));
      break;
    } else if (table[FILE_LETTER[initialX - 1] + (initialY + i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - 1] + (initialY - i)]?.type !== null &&
      table[FILE_LETTER[initialX - 1] + (initialY - i)]?.color !== color
    ) {
      possibleMoves.push(FILE_LETTER[initialX - 1] + (initialY - i));
      break;
    } else if (table[FILE_LETTER[initialX - 1] + (initialY - i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.type !== null &&
      table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.color !== color
    ) {
      possibleMoves.push(FILE_LETTER[initialX + i - 1] + (initialY + i));
      break;
    } else if (table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.type !== null &&
      table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.color !== color
    ) {
      possibleMoves.push(FILE_LETTER[initialX + i - 1] + (initialY - i));
      break;
    } else if (table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.type !== null &&
      table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.color !== color
    ) {
      possibleMoves.push(FILE_LETTER[initialX - i - 1] + (initialY - i));
      break;
    } else if (table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.type !== null &&
      table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.color !== color
    ) {
      possibleMoves.push(FILE_LETTER[initialX - i - 1] + (initialY + i));
      break;
    } else if (table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.color === color) break;
  }
  return possibleMoves;
};

export const getQueenMoves = ({ table, file, row }: IGetQueenMoves): string[] | null => {
  const possibleMoves = [];
  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  for (let i = 1; i < 8; i++) {
    if (table[FILE_LETTER[initialX - i - 1] + initialY]?.type === null) {
      possibleMoves.push(FILE_LETTER[initialX - i - 1] + initialY);
    } else break;
  }
  for (let i = 1; i < 8; i++) {
    if (table[FILE_LETTER[initialX + i - 1] + initialY]?.type === null) {
      possibleMoves.push(FILE_LETTER[initialX + i - 1] + initialY);
    } else break;
  }
  for (let i = 1; i < 8; i++) {
    if (table[FILE_LETTER[initialX - 1] + (initialY + i)]?.type === null) {
      possibleMoves.push(FILE_LETTER[initialX - 1] + (initialY + i));
    } else break;
  }
  for (let i = 1; i < 8; i++) {
    if (table[FILE_LETTER[initialX - 1] + (initialY - i)]?.type === null) {
      possibleMoves.push(FILE_LETTER[initialX - 1] + (initialY - i));
    } else break;
  }
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

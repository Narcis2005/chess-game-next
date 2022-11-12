import { FILE_LETTER } from "./constants";
import { wouldItStillBeCheck } from "./generalFunctions";
import { Color, FileNumber, ITableState } from "./interfaces";

interface IGetBishopMoves {
  table: ITableState;
  file: string;
  row: number;
  color: Color | null;
}
export const getBishopAttackingMovesWithoutCheckingForCheck = ({
  table,
  file,
  row,
  color,
}: IGetBishopMoves): string[] | null => {
  const possibleMoves: string[] | null = [];
  if (color === undefined || color === null) return possibleMoves;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX + i - 1] + (initialY + i)] &&
      table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.color !== color &&
      table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.type !== null
    ) {
      possibleMoves.push(FILE_LETTER[initialX + i - 1] + (initialY + i));

      break;
    } else if (table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX + i - 1] + (initialY - i)] &&
      table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.color !== color &&
      table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.type !== null
    ) {
      possibleMoves.push(FILE_LETTER[initialX + i - 1] + (initialY - i));

      break;
    } else if (table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - i - 1] + (initialY - i)] &&
      table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.color !== color &&
      table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.type !== null
    ) {
      possibleMoves.push(FILE_LETTER[initialX - i - 1] + (initialY - i));

      break;
    } else if (table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - i - 1] + (initialY + i)] &&
      table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.color !== color &&
      table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.type !== null
    ) {
      possibleMoves.push(FILE_LETTER[initialX - i - 1] + (initialY + i));

      break;
    } else if (table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.color === color) break;
  }
  return possibleMoves;
};
export const getBishopAttackingMoves = ({ table, file, row, color }: IGetBishopMoves): string[] | null => {
  const possibleMoves: string[] | null = [];
  if (color === undefined || color === null) return possibleMoves;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX + i - 1] + (initialY + i)] &&
      table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.color !== color &&
      table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.type !== null
    ) {
      if (
        !wouldItStillBeCheck({
          table: table,
          color: color,
          square: FILE_LETTER[initialX + i - 1] + (initialY + i),
          row,
          file,
        })
      ) {
        possibleMoves.push(FILE_LETTER[initialX + i - 1] + (initialY + i));
      }
      break;
    } else if (table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX + i - 1] + (initialY - i)] &&
      table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.color !== color &&
      table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.type !== null
    ) {
      if (
        !wouldItStillBeCheck({
          table: table,
          color: color,
          square: FILE_LETTER[initialX + i - 1] + (initialY - i),
          row,
          file,
        })
      ) {
        possibleMoves.push(FILE_LETTER[initialX + i - 1] + (initialY - i));
      }
      break;
    } else if (table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - i - 1] + (initialY - i)] &&
      table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.color !== color &&
      table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.type !== null
    ) {
      if (
        !wouldItStillBeCheck({
          table: table,
          color: color,
          square: FILE_LETTER[initialX - i - 1] + (initialY - i),
          row,
          file,
        })
      ) {
        possibleMoves.push(FILE_LETTER[initialX - i - 1] + (initialY - i));
      }
      break;
    } else if (table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - i - 1] + (initialY + i)] &&
      table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.color !== color &&
      table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.type !== null
    ) {
      if (
        !wouldItStillBeCheck({
          table: table,
          color: color,
          square: FILE_LETTER[initialX - i - 1] + (initialY + i),
          row,
          file,
        })
      ) {
        possibleMoves.push(FILE_LETTER[initialX - i - 1] + (initialY + i));
      }
      break;
    } else if (table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.color === color) break;
  }
  return possibleMoves;
};
export const getBishopMoves = ({ table, file, row, color }: IGetBishopMoves): string[] | null => {
  const possibleMoves: string[] | null = [];
  if (color === undefined || color === null) return possibleMoves;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  for (let i = 1; i < 8; i++) {
    if (table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.type === null) {
      if (
        !wouldItStillBeCheck({
          table: table,
          color: color,
          square: FILE_LETTER[initialX + i - 1] + (initialY + i),
          row,
          file,
        })
      ) {
        possibleMoves.push(FILE_LETTER[initialX + i - 1] + (initialY + i));
      }
    } else break;
  }
  for (let i = 1; i < 8; i++) {
    if (table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.type === null) {
      if (
        !wouldItStillBeCheck({
          table: table,
          color: color,
          square: FILE_LETTER[initialX + i - 1] + (initialY - i),
          row,
          file,
        })
      ) {
        possibleMoves.push(FILE_LETTER[initialX + i - 1] + (initialY - i));
      }
    } else break;
  }
  for (let i = 1; i < 8; i++) {
    if (table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.type === null) {
      if (
        !wouldItStillBeCheck({
          table: table,
          color: color,
          square: FILE_LETTER[initialX - i - 1] + (initialY - i),
          row,
          file,
        })
      ) {
        possibleMoves.push(FILE_LETTER[initialX - i - 1] + (initialY - i));
      }
    } else break;
  }
  for (let i = 1; i < 8; i++) {
    if (table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.type === null) {
      if (
        !wouldItStillBeCheck({
          table: table,
          color: color,
          square: FILE_LETTER[initialX - i - 1] + (initialY + i),
          row,
          file,
        })
      ) {
        possibleMoves.push(FILE_LETTER[initialX - i - 1] + (initialY + i));
      }
    } else break;
  }
  return possibleMoves;
};

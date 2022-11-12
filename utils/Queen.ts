import { FILE_LETTER } from "./constants";
import { wouldItStillBeCheck } from "./generalFunctions";
import { Color, FileNumber, ITableState } from "./interfaces";

interface IGetQueenMoves {
  table: ITableState;
  file: string;
  row: number;
  color: Color | null;
}

export const getQueenAttackingMovesWithoutCheckingForCheck = ({
  table,
  file,
  row,
  color,
}: IGetQueenMoves): string[] | null => {
  const possibleMoves = [];
  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  //   const oppositeColor = color === Color.white ? Color.black
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - i - 1] + initialY] &&
      table[FILE_LETTER[initialX - i - 1] + initialY]?.type !== null &&
      table[FILE_LETTER[initialX - i - 1] + initialY]?.color !== color
    ) {
      possibleMoves.push(FILE_LETTER[initialX - i - 1] + initialY);
      break;
    } else if (table[FILE_LETTER[initialX - i - 1] + initialY]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX + i - 1] + initialY] &&
      table[FILE_LETTER[initialX + i - 1] + initialY]?.type !== null &&
      table[FILE_LETTER[initialX + i - 1] + initialY]?.color !== color
    ) {
      possibleMoves.push(FILE_LETTER[initialX + i - 1] + initialY);
      break;
    } else if (table[FILE_LETTER[initialX + i - 1] + initialY]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - 1] + (initialY + i)] &&
      table[FILE_LETTER[initialX - 1] + (initialY + i)]?.type !== null &&
      table[FILE_LETTER[initialX - 1] + (initialY + i)]?.color !== color
    ) {
      possibleMoves.push(FILE_LETTER[initialX - 1] + (initialY + i));
      break;
    } else if (table[FILE_LETTER[initialX - 1] + (initialY + i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - 1] + (initialY - i)] &&
      table[FILE_LETTER[initialX - 1] + (initialY - i)]?.type !== null &&
      table[FILE_LETTER[initialX - 1] + (initialY - i)]?.color !== color
    ) {
      possibleMoves.push(FILE_LETTER[initialX - 1] + (initialY - i));
      break;
    } else if (table[FILE_LETTER[initialX - 1] + (initialY - i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX + i - 1] + (initialY + i)] &&
      table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.type !== null &&
      table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.color !== color
    ) {
      possibleMoves.push(FILE_LETTER[initialX + i - 1] + (initialY + i));
      break;
    } else if (table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX + i - 1] + (initialY - i)] &&
      table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.type !== null &&
      table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.color !== color
    ) {
      possibleMoves.push(FILE_LETTER[initialX + i - 1] + (initialY - i));
      break;
    } else if (table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - i - 1] + (initialY - i)] &&
      table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.type !== null &&
      table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.color !== color
    ) {
      possibleMoves.push(FILE_LETTER[initialX - i - 1] + (initialY - i));
      break;
    } else if (table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - i - 1] + (initialY + i)] &&
      table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.type !== null &&
      table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.color !== color
    ) {
      possibleMoves.push(FILE_LETTER[initialX - i - 1] + (initialY + i));
      break;
    } else if (table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.color === color) break;
  }
  return possibleMoves;
};
export const getQueenAttackingMoves = ({ table, file, row, color }: IGetQueenMoves): string[] | null => {
  const possibleMoves: string[] | null = [];
  if (color === undefined || color === null) return possibleMoves;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  //   const oppositeColor = color === Color.white ? Color.black
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - i - 1] + initialY] &&
      table[FILE_LETTER[initialX - i - 1] + initialY]?.type !== null &&
      table[FILE_LETTER[initialX - i - 1] + initialY]?.color !== color
    ) {
      if (
        !wouldItStillBeCheck({
          table: table,
          color: color,
          square: FILE_LETTER[initialX - i - 1] + initialY,
          row,
          file,
        })
      ) {
        possibleMoves.push(FILE_LETTER[initialX - i - 1] + initialY);
      }
      break;
    } else if (table[FILE_LETTER[initialX - i - 1] + initialY]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX + i - 1] + initialY] &&
      table[FILE_LETTER[initialX + i - 1] + initialY]?.type !== null &&
      table[FILE_LETTER[initialX + i - 1] + initialY]?.color !== color
    ) {
      if (
        !wouldItStillBeCheck({
          table: table,
          color: color,
          square: FILE_LETTER[initialX + i - 1] + initialY,
          row,
          file,
        })
      ) {
        possibleMoves.push(FILE_LETTER[initialX + i - 1] + initialY);
      }
      break;
    } else if (table[FILE_LETTER[initialX + i - 1] + initialY]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - 1] + (initialY + i)] &&
      table[FILE_LETTER[initialX - 1] + (initialY + i)]?.type !== null &&
      table[FILE_LETTER[initialX - 1] + (initialY + i)]?.color !== color
    ) {
      if (
        !wouldItStillBeCheck({
          table: table,
          color: color,
          square: FILE_LETTER[initialX - 1] + (initialY + i),
          row,
          file,
        })
      ) {
        possibleMoves.push(FILE_LETTER[initialX - 1] + (initialY + i));
      }
      break;
    } else if (table[FILE_LETTER[initialX - 1] + (initialY + i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - 1] + (initialY - i)] &&
      table[FILE_LETTER[initialX - 1] + (initialY - i)]?.type !== null &&
      table[FILE_LETTER[initialX - 1] + (initialY - i)]?.color !== color
    ) {
      if (
        !wouldItStillBeCheck({
          table: table,
          color: color,
          square: FILE_LETTER[initialX - 1] + (initialY - i),
          row,
          file,
        })
      ) {
        possibleMoves.push(FILE_LETTER[initialX - 1] + (initialY - i));
      }
      break;
    } else if (table[FILE_LETTER[initialX - 1] + (initialY - i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX + i - 1] + (initialY + i)] &&
      table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.type !== null &&
      table[FILE_LETTER[initialX + i - 1] + (initialY + i)]?.color !== color
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
      table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.type !== null &&
      table[FILE_LETTER[initialX + i - 1] + (initialY - i)]?.color !== color
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
      table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.type !== null &&
      table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.color !== color
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
    } else if (table[FILE_LETTER[initialX - i - 1] + (initialY - i)]?.color === color) break;
  }
  for (let i = 1; i < 8; i++) {
    if (
      table[FILE_LETTER[initialX - i - 1] + (initialY + i)] &&
      table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.type !== null &&
      table[FILE_LETTER[initialX - i - 1] + (initialY + i)]?.color !== color
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
export const getQueenMoves = ({ table, file, row, color }: IGetQueenMoves): string[] | null => {
  const possibleMoves: string[] | null = [];
  if (color === undefined || color === null) return possibleMoves;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  for (let i = 1; i < 8; i++) {
    if (table[FILE_LETTER[initialX - i - 1] + initialY]?.type === null) {
      if (
        !wouldItStillBeCheck({
          table: table,
          color: color,
          square: FILE_LETTER[initialX - i - 1] + initialY,
          row,
          file,
        })
      ) {
        possibleMoves.push(FILE_LETTER[initialX - i - 1] + initialY);
      }
    } else break;
  }
  for (let i = 1; i < 8; i++) {
    if (table[FILE_LETTER[initialX + i - 1] + initialY]?.type === null) {
      if (
        !wouldItStillBeCheck({
          table: table,
          color: color,
          square: FILE_LETTER[initialX + i - 1] + initialY,
          row,
          file,
        })
      ) {
        possibleMoves.push(FILE_LETTER[initialX + i - 1] + initialY);
      }
    } else break;
  }
  for (let i = 1; i < 8; i++) {
    if (table[FILE_LETTER[initialX - 1] + (initialY + i)]?.type === null) {
      if (
        !wouldItStillBeCheck({
          table: table,
          color: color,
          square: FILE_LETTER[initialX - 1] + (initialY + i),
          row,
          file,
        })
      ) {
        possibleMoves.push(FILE_LETTER[initialX - 1] + (initialY + i));
      }
    } else break;
  }
  for (let i = 1; i < 8; i++) {
    if (table[FILE_LETTER[initialX - 1] + (initialY - i)]?.type === null) {
      if (
        !wouldItStillBeCheck({
          table: table,
          color: color,
          square: FILE_LETTER[initialX - 1] + (initialY - i),
          row,
          file,
        })
      ) {
        possibleMoves.push(FILE_LETTER[initialX - 1] + (initialY - i));
      }
    } else break;
  }
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

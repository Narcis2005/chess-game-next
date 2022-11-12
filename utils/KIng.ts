import { FILE_LETTER } from "./constants";
import { wouldItStillBeCheck } from "./generalFunctions";
import { Color, FileNumber, ITableState } from "./interfaces";

interface IGetKingMoves {
  table: ITableState;
  file: string;
  row: number;
  color: Color | null;
}
export const getKingAttackingMovesWithoutCheckingForCheck = ({
  table,
  file,
  row,
  color,
}: IGetKingMoves): string[] | null => {
  const possibleMoves: string[] | null = [];
  if (color === undefined || color === null) return possibleMoves;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  if (
    table[FILE_LETTER[initialX - 1] + (initialY + 1)] &&
    table[FILE_LETTER[initialX - 1] + (initialY + 1)]?.type !== null &&
    table[FILE_LETTER[initialX - 1] + (initialY + 1)]?.color !== color
  ) {
    possibleMoves.push(FILE_LETTER[initialX - 1] + (initialY + 1));
  }

  if (
    table[FILE_LETTER[initialX] + (initialY + 1)] &&
    table[FILE_LETTER[initialX] + (initialY + 1)]?.type !== null &&
    table[FILE_LETTER[initialX] + (initialY + 1)]?.color !== color
  ) {
    possibleMoves.push(FILE_LETTER[initialX] + (initialY + 1));
  }
  if (
    table[FILE_LETTER[initialX - 2] + (initialY + 1)] &&
    table[FILE_LETTER[initialX - 2] + (initialY + 1)]?.type !== null &&
    table[FILE_LETTER[initialX - 2] + (initialY + 1)]?.color !== color
  ) {
    possibleMoves.push(FILE_LETTER[initialX - 2] + (initialY + 1));
  }
  if (
    table[FILE_LETTER[initialX - 2] + initialY] &&
    table[FILE_LETTER[initialX - 2] + initialY]?.type !== null &&
    table[FILE_LETTER[initialX - 2] + initialY]?.color !== color
  ) {
    possibleMoves.push(FILE_LETTER[initialX - 2] + initialY);
  }
  if (
    table[FILE_LETTER[initialX] + initialY] &&
    table[FILE_LETTER[initialX] + initialY]?.type !== null &&
    table[FILE_LETTER[initialX] + initialY]?.color !== color
  ) {
    possibleMoves.push(FILE_LETTER[initialX] + initialY);
  }
  if (
    table[FILE_LETTER[initialX - 2] + (initialY - 1)] &&
    table[FILE_LETTER[initialX - 2] + (initialY - 1)]?.type !== null &&
    table[FILE_LETTER[initialX - 2] + (initialY - 1)]?.color !== color
  ) {
    possibleMoves.push(FILE_LETTER[initialX - 2] + (initialY - 1));
  }
  if (
    table[FILE_LETTER[initialX - 1] + (initialY - 1)] &&
    table[FILE_LETTER[initialX - 1] + (initialY - 1)]?.type !== null &&
    table[FILE_LETTER[initialX - 1] + (initialY - 1)]?.color !== color
  ) {
    possibleMoves.push(FILE_LETTER[initialX - 1] + (initialY - 1));
  }
  if (
    table[FILE_LETTER[initialX] + (initialY - 1)] &&
    table[FILE_LETTER[initialX] + (initialY - 1)]?.type !== null &&
    table[FILE_LETTER[initialX] + (initialY - 1)]?.color !== color
  ) {
    possibleMoves.push(FILE_LETTER[initialX] + (initialY - 1));
  }
  return possibleMoves;
};
export const getKingAttackingMoves = ({ table, file, row, color }: IGetKingMoves): string[] | null => {
  const possibleMoves: string[] | null = [];
  if (color === undefined || color === null) return possibleMoves;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  if (
    table[FILE_LETTER[initialX - 1] + (initialY + 1)] &&
    table[FILE_LETTER[initialX - 1] + (initialY + 1)]?.type !== null &&
    table[FILE_LETTER[initialX - 1] + (initialY + 1)]?.color !== color
  ) {
    if (
      !wouldItStillBeCheck({
        table: table,
        color: color,
        square: FILE_LETTER[initialX - 1] + (initialY + 1),
        row,
        file,
      })
    ) {
      possibleMoves.push(FILE_LETTER[initialX - 1] + (initialY + 1));
    }
  }

  if (
    table[FILE_LETTER[initialX] + (initialY + 1)] &&
    table[FILE_LETTER[initialX] + (initialY + 1)]?.type !== null &&
    table[FILE_LETTER[initialX] + (initialY + 1)]?.color !== color
  ) {
    if (
      !wouldItStillBeCheck({
        table: table,
        color: color,
        square: FILE_LETTER[initialX] + (initialY + 1),
        row,
        file,
      })
    ) {
      possibleMoves.push(FILE_LETTER[initialX] + (initialY + 1));
    }
  }
  if (
    table[FILE_LETTER[initialX - 2] + (initialY + 1)] &&
    table[FILE_LETTER[initialX - 2] + (initialY + 1)]?.type !== null &&
    table[FILE_LETTER[initialX - 2] + (initialY + 1)]?.color !== color
  ) {
    if (
      !wouldItStillBeCheck({
        table: table,
        color: color,
        square: FILE_LETTER[initialX - 2] + (initialY + 1),
        row,
        file,
      })
    ) {
      possibleMoves.push(FILE_LETTER[initialX - 2] + (initialY + 1));
    }
  }
  if (
    table[FILE_LETTER[initialX - 2] + initialY] &&
    table[FILE_LETTER[initialX - 2] + initialY]?.type !== null &&
    table[FILE_LETTER[initialX - 2] + initialY]?.color !== color
  ) {
    if (
      !wouldItStillBeCheck({
        table: table,
        color: color,
        square: FILE_LETTER[initialX - 2] + initialY,
        row,
        file,
      })
    ) {
      possibleMoves.push(FILE_LETTER[initialX - 2] + initialY);
    }
  }
  if (
    table[FILE_LETTER[initialX] + initialY] &&
    table[FILE_LETTER[initialX] + initialY]?.type !== null &&
    table[FILE_LETTER[initialX] + initialY]?.color !== color
  ) {
    if (
      !wouldItStillBeCheck({
        table: table,
        color: color,
        square: FILE_LETTER[initialX] + initialY,
        row,
        file,
      })
    ) {
      possibleMoves.push(FILE_LETTER[initialX] + initialY);
    }
  }
  if (
    table[FILE_LETTER[initialX - 2] + (initialY - 1)] &&
    table[FILE_LETTER[initialX - 2] + (initialY - 1)]?.type !== null &&
    table[FILE_LETTER[initialX - 2] + (initialY - 1)]?.color !== color
  ) {
    if (
      !wouldItStillBeCheck({
        table: table,
        color: color,
        square: FILE_LETTER[initialX - 2] + (initialY - 1),
        row,
        file,
      })
    ) {
      possibleMoves.push(FILE_LETTER[initialX - 2] + (initialY - 1));
    }
  }
  if (
    table[FILE_LETTER[initialX - 1] + (initialY - 1)] &&
    table[FILE_LETTER[initialX - 1] + (initialY - 1)]?.type !== null &&
    table[FILE_LETTER[initialX - 1] + (initialY - 1)]?.color !== color
  ) {
    if (
      !wouldItStillBeCheck({
        table: table,
        color: color,
        square: FILE_LETTER[initialX - 1] + (initialY - 1),
        row,
        file,
      })
    ) {
      possibleMoves.push(FILE_LETTER[initialX - 1] + (initialY - 1));
    }
  }
  if (
    table[FILE_LETTER[initialX] + (initialY - 1)] &&
    table[FILE_LETTER[initialX] + (initialY - 1)]?.type !== null &&
    table[FILE_LETTER[initialX] + (initialY - 1)]?.color !== color
  ) {
    if (
      !wouldItStillBeCheck({
        table: table,
        color: color,
        square: FILE_LETTER[initialX] + (initialY - 1),
        row,
        file,
      })
    ) {
      possibleMoves.push(FILE_LETTER[initialX] + (initialY - 1));
    }
  }
  return possibleMoves;
};
export const getKingMoves = ({ table, file, row, color }: IGetKingMoves): string[] | null => {
  const possibleMoves: string[] | null = [];
  if (color === undefined || color === null) return possibleMoves;

  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  if (table[FILE_LETTER[initialX - 1] + (initialY + 1)]?.type === null) {
    if (
      !wouldItStillBeCheck({
        table: table,
        color: color,
        square: FILE_LETTER[initialX - 1] + (initialY + 1),
        row,
        file,
      })
    ) {
      possibleMoves.push(FILE_LETTER[initialX - 1] + (initialY + 1));
    }
  }

  if (table[FILE_LETTER[initialX] + (initialY + 1)]?.type === null) {
    if (
      !wouldItStillBeCheck({
        table: table,
        color: color,
        square: FILE_LETTER[initialX] + (initialY + 1),
        row,
        file,
      })
    ) {
      possibleMoves.push(FILE_LETTER[initialX] + (initialY + 1));
    }
  }
  if (table[FILE_LETTER[initialX - 2] + (initialY + 1)]?.type === null) {
    if (
      !wouldItStillBeCheck({
        table: table,
        color: color,
        square: FILE_LETTER[initialX - 2] + (initialY + 1),
        row,
        file,
      })
    ) {
      possibleMoves.push(FILE_LETTER[initialX - 2] + (initialY + 1));
    }
  }
  if (table[FILE_LETTER[initialX - 2] + initialY]?.type === null) {
    if (
      !wouldItStillBeCheck({
        table: table,
        color: color,
        square: FILE_LETTER[initialX - 2] + initialY,
        row,
        file,
      })
    ) {
      possibleMoves.push(FILE_LETTER[initialX - 2] + initialY);
    }
  }
  if (table[FILE_LETTER[initialX] + initialY]?.type === null) {
    if (
      !wouldItStillBeCheck({
        table: table,
        color: color,
        square: FILE_LETTER[initialX] + initialY,
        row,
        file,
      })
    ) {
      possibleMoves.push(FILE_LETTER[initialX] + initialY);
    }
  }
  if (table[FILE_LETTER[initialX - 2] + (initialY - 1)]?.type === null) {
    if (
      !wouldItStillBeCheck({
        table: table,
        color: color,
        square: FILE_LETTER[initialX - 2] + (initialY - 1),
        row,
        file,
      })
    ) {
      possibleMoves.push(FILE_LETTER[initialX - 2] + (initialY - 1));
    }
  }
  if (table[FILE_LETTER[initialX - 1] + (initialY - 1)]?.type === null) {
    if (
      !wouldItStillBeCheck({
        table: table,
        color: color,
        square: FILE_LETTER[initialX - 1] + (initialY - 1),
        row,
        file,
      })
    ) {
      possibleMoves.push(FILE_LETTER[initialX - 1] + (initialY - 1));
    }
  }
  if (table[FILE_LETTER[initialX] + (initialY - 1)]?.type === null) {
    if (
      !wouldItStillBeCheck({
        table: table,
        color: color,
        square: FILE_LETTER[initialX] + (initialY - 1),
        row,
        file,
      })
    ) {
      possibleMoves.push(FILE_LETTER[initialX] + (initialY - 1));
    }
  }
  return possibleMoves;
};

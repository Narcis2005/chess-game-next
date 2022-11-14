import { FILE_LETTER } from "./constants";
import { wouldItStillBeCheck } from "./generalFunctions";
import { Color, FileNumber, ITableState, Piece } from "./interfaces";

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
interface IGetKingMovesReturn {
  moves: string[];
  kingSideCastling: boolean;
  queenSideCastling: boolean;
}
export const getKingMoves = ({ table, file, row, color }: IGetKingMoves): null | IGetKingMovesReturn => {
  const possibleMoves: string[] | null = [];
  if (color === undefined || color === null) return null;

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
  let kingSideCastling = false;
  let queenSideCastling = false;
  if (
    table[FILE_LETTER[initialX] + initialY]?.type === null && // check if the first right square is empty
    table[FILE_LETTER[initialX + 1] + initialY]?.type === null && // check if the second right square is empty
    table[FILE_LETTER[initialX + 2] + initialY] && //check if the the third right square exists (to prevent errors)
    table[FILE_LETTER[initialX + 2] + initialY]?.type === Piece.rook && //check if the fourth right square is rook
    table[FILE_LETTER[initialX + 2] + initialY]?.color === color && //check if the fourth right square is the right color
    table[FILE_LETTER[initialX + 2] + initialY]?.hasMoved === false && // check if the rook has ever moved
    table[FILE_LETTER[initialX - 1] + initialY]?.hasMoved === false && // check if the king has ever moved
    !wouldItStillBeCheck({
      table: table,
      color: color,
      square: FILE_LETTER[initialX - 1] + initialY,
      row,
      file,
    }) && //check if the king is in check
    !wouldItStillBeCheck({
      table: table,
      color: color,
      square: FILE_LETTER[initialX] + initialY,
      row,
      file,
    }) && //check if the king will be in check when it passes through the first right square
    !wouldItStillBeCheck({
      table: table,
      color: color,
      square: FILE_LETTER[initialX + 1] + initialY,
      row,
      file,
    }) //check if the king will be in check when it passes through the second right square
  ) {
    kingSideCastling = true;
  }
  if (
    table[FILE_LETTER[initialX - 2] + initialY]?.type === null && // check if the first left square is empty
    table[FILE_LETTER[initialX - 3] + initialY]?.type === null && // check if the second left square is empty
    table[FILE_LETTER[initialX - 4] + initialY]?.type === null && // check if the third left square is empty
    table[FILE_LETTER[initialX - 5] + initialY] && //check if the the fourth left square exists (to prevent errors)
    table[FILE_LETTER[initialX - 5] + initialY]?.type === Piece.rook && //check if the fourth left square is rook
    table[FILE_LETTER[initialX - 5] + initialY]?.color === color && // check if the rook color is the good color
    table[FILE_LETTER[initialX - 5] + initialY]?.hasMoved === false && // check if the rook has ever moved
    table[FILE_LETTER[initialX - 1] + initialY]?.hasMoved === false && //check if the king has ever moved
    !wouldItStillBeCheck({
      table: table,
      color: color,
      square: FILE_LETTER[initialX - 1] + initialY,
      row,
      file,
    }) && //check if the king is in check
    !wouldItStillBeCheck({
      table: table,
      color: color,
      square: FILE_LETTER[initialX - 2] + initialY,
      row,
      file,
    }) && //check if the king will be in check when it passes through the first left square
    !wouldItStillBeCheck({
      table: table,
      color: color,
      square: FILE_LETTER[initialX - 3] + initialY,
      row,
      file,
    }) && //check if the king will be in check when it passes through the second left square
    !wouldItStillBeCheck({
      table: table,
      color: color,
      square: FILE_LETTER[initialX - 4] + initialY,
      row,
      file,
    }) //check if the king will be in check when it passes through the third left square
  ) {
    queenSideCastling = true;
  }
  return { moves: possibleMoves, kingSideCastling, queenSideCastling };
};

import { getBishopAttackingMovesWithoutCheckingForCheck } from "./Bishop";
import { createSquare } from "./constants";
import { Color, ITableState, Piece } from "./interfaces";
import { getKingAttackingMovesWithoutCheckingForCheck } from "./KIng";
import { getKnightAttackingMovesWithoutCheckingForCheck } from "./Knight";
import { getPawnAttackingMovesWithoutCheckingForCheck } from "./Pawn";
import { getQueenAttackingMovesWithoutCheckingForCheck } from "./Queen";
import { getRookAttackingMovesWithoutCheckingForCheck } from "./rook";

interface IGetAllAttackingMoves {
  color: Color;
  table: ITableState;
}

export const getAllAttackingMoves = ({ color, table }: IGetAllAttackingMoves): string[] | null => {
  const allAttackingMoves = [];
  const turnCoeficient = color === Color.black ? 1 : -1;
  for (const square in table) {
    if (table[square].type !== null && table[square].color === color) {
      const file = square.split("")[0];
      const row = +square.split("")[1];
      switch (table[square].type) {
        case Piece.pawn:
          const pawnAttackingMoves = getPawnAttackingMovesWithoutCheckingForCheck({
            file,
            row,
            table,
            color: color,
            turnCoeficient,
            squareName: square,
          });
          if (pawnAttackingMoves) allAttackingMoves.push(...pawnAttackingMoves);
          break;
        case Piece.bishop:
          const bishopAttackingMoves = getBishopAttackingMovesWithoutCheckingForCheck({ file, row, table, color });
          if (bishopAttackingMoves) allAttackingMoves.push(...bishopAttackingMoves);
          break;
        case Piece.knight:
          const knightAttackingMoves = getKnightAttackingMovesWithoutCheckingForCheck({ file, row, table, color });
          if (knightAttackingMoves) allAttackingMoves.push(...knightAttackingMoves);
          break;
        case Piece.rook:
          const rookAttackingMoves = getRookAttackingMovesWithoutCheckingForCheck({ file, row, table, color });
          if (rookAttackingMoves) allAttackingMoves.push(...rookAttackingMoves);
          break;
        case Piece.queen:
          const queenAttackingMoves = getQueenAttackingMovesWithoutCheckingForCheck({ file, row, table, color });
          if (queenAttackingMoves) allAttackingMoves.push(...queenAttackingMoves);
          break;
        case Piece.king:
          const kingAttackingMoves = getKingAttackingMovesWithoutCheckingForCheck({ file, row, table, color });
          if (kingAttackingMoves) allAttackingMoves.push(...kingAttackingMoves);
          break;
      }
    }
  }
  return allAttackingMoves;
};
const getKingSquare = ({ table, color }: { table: ITableState; color: Color }) => {
  for (const square in table) {
    if (table[square].type === Piece.king && table[square].color === color) return square;
  }
};
export const checkIfCheck = ({ table, color }: { table: ITableState; color: Color }) => {
  const allAttackingMoves = getAllAttackingMoves({
    table: table,
    color: color == Color.white ? Color.black : Color.white,
  });
  const kingSquare = getKingSquare({ table: table, color: color });

  if (!kingSquare) return; //Well, it would be weird for this to happen :||
  if (allAttackingMoves?.includes(kingSquare)) {
    return true;
  }
  return false;
};
export const wouldItStillBeCheck = ({
  table,
  color,
  square,
  file,
  row,
}: {
  table: ITableState;
  color: Color;
  square: string;
  file: string;
  row: number;
}) => {
  const oldSquare = {
    [`${file}${row}`]: createSquare({
      piece: null,
      type: null,
      isHighlighted: false,
      isAttacked: false,
      color: null,
    }),
  };
  const newSquare = { [square]: { ...table[`${file}${row}`] } };
  const newTable = { ...table, ...newSquare, ...oldSquare };
  const response = checkIfCheck({ table: newTable, color });

  return response;
};

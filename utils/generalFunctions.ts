import { getBishopAttackingMoves } from "./Bishop";
import { createSquare, FILE_LETTER } from "./constants";
import { Color, ITableState, Piece } from "./interfaces";
import { getKnightAttackingMoves } from "./Knight";
import { getPawnAttackingMoves } from "./Pawn";
import { getQueenAttackingMoves } from "./Queen";
import { getRookAttackingMoves } from "./rook";

interface IGetAllAttackingMoves {
  color: Color;
  table: ITableState;
  isCheck: boolean;
}

export const getAllAttackingMoves = ({ color, table, isCheck }: IGetAllAttackingMoves): string[] | null => {
  const allAttackingMoves = [];
  const turnCoeficient = color === Color.black ? 1 : -1;
  for (let square in table) {
    if (table[square].type !== null && table[square].color === color) {
      const file = square.split("")[0];
      const row = +square.split("")[1];
      switch (table[square].type) {
        case Piece.pawn:
          const pawnAttackingMoves = getPawnAttackingMoves({
            file,
            row,
            table,
            color: color,
            turnCoeficient,
            squareName: square,
          });
          //   if (pawnAttackingMoves && pawnAttackingMoves?.length > 0) {
          //     console.log("pioni");
          //     console.log(pawnAttackingMoves);
          //     console.log(square);
          //   }

          if (pawnAttackingMoves) allAttackingMoves.push(...pawnAttackingMoves);
          break;
        case Piece.bishop:
          const bishopAttackingMoves = getBishopAttackingMoves({ file, row, table, color });
          if (bishopAttackingMoves) allAttackingMoves.push(...bishopAttackingMoves);
          //   if (bishopAttackingMoves && bishopAttackingMoves.length > 0) {
          //     console.log("nebuni");
          //     console.log(bishopAttackingMoves);
          //     console.log(square);
          //   }

          break;
        case Piece.knight:
          const knightAttackingMoves = getKnightAttackingMoves({ file, row, table, color });
          if (knightAttackingMoves) allAttackingMoves.push(...knightAttackingMoves);
          //   if (knightAttackingMoves && knightAttackingMoves.length > 0) {
          //     console.log("cai");
          //     console.log(knightAttackingMoves);
          //     console.log(square);
          //   }

          break;
        case Piece.rook:
          const rookAttackingMoves = getRookAttackingMoves({ file, row, table, color });
          if (rookAttackingMoves) allAttackingMoves.push(...rookAttackingMoves);
          //   if (rookAttackingMoves && rookAttackingMoves.length > 0) {
          //     console.log("ture");
          //     console.log(rookAttackingMoves);
          //     console.log(square);
          //   }

          break;
        case Piece.queen:
          //   console.log(file, row);
          const queenAttackingMoves = getQueenAttackingMoves({ file, row, table, color });
          if (queenAttackingMoves) allAttackingMoves.push(...queenAttackingMoves);
          //   if (queenAttackingMoves && queenAttackingMoves.length > 0) {
          //     console.log("regina");
          //     console.log(queenAttackingMoves);
          //     console.log(square);
          //   }

          break;
      }
    }
  }
  return allAttackingMoves;
};
const getKingSquare = ({ table, color }: { table: ITableState; color: Color }) => {
  for (let square in table) {
    if (table[square].type === Piece.king && table[square].color === color) return square;
  }
};
export const checkIfCheck = ({ table, color }: { table: ITableState; color: Color }) => {
  const allAttackingMoves = getAllAttackingMoves({
    table: table,
    color: color == Color.white ? Color.black : Color.white,
    isCheck: false,
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
    [file + row]: createSquare({
      piece: null,
      type: null,
      isHighlighted: false,
      isAttacked: false,
      color: null,
    }),
  };
  const newSquare = { [square]: { ...table[file + row] } };
  const newTable = { ...table, ...newSquare, ...oldSquare };
  return checkIfCheck({ table: newTable, color });
};

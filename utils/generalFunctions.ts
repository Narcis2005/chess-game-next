import { getBishopAttackingMoves, getBishopAttackingMovesWithoutCheckingForCheck, getBishopMoves } from "./Bishop";
import { createSquare, FILE_LETTER } from "./constants";
import { Color, ITableState, Piece } from "./interfaces";
import { getKingAttackingMoves, getKingAttackingMovesWithoutCheckingForCheck, getKingMoves } from "./KIng";
import { getKnightAttackingMoves, getKnightAttackingMovesWithoutCheckingForCheck, getKnightMoves } from "./Knight";
import { getPawnAttackingMoves, getPawnAttackingMovesWithoutCheckingForCheck, getPawnMoves } from "./Pawn";
import { getQueenAttackingMoves, getQueenAttackingMovesWithoutCheckingForCheck, getQueenMoves } from "./Queen";
import { getRookAttackingMoves, getRookAttackingMovesWithoutCheckingForCheck, getRookMoves } from "./rook";

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
export const getAllLegalMoves = ({ color, table }: IGetAllAttackingMoves): string[] | null => {
  const allLegalMoves = [];
  const turnCoeficient = color === Color.black ? 1 : -1;
  for (const square in table) {
    if (table[square].type !== null && table[square].color === color) {
      const file = square.split("")[0];
      const row = +square.split("")[1];
      switch (table[square].type) {
        case Piece.pawn:
          const pawnLegalMoves = getPawnMoves({
            file,
            row,
            table,
            color: color,
            turnCoeficient,
            squareName: square,
          });
          const pawnLegalAttackingMoves = getPawnAttackingMoves({
            file,
            row,
            table,
            color: color,
            turnCoeficient,
            squareName: square,
          });
          if (pawnLegalMoves) allLegalMoves.push(...pawnLegalMoves);
          if (pawnLegalAttackingMoves) allLegalMoves.push(...pawnLegalAttackingMoves);
          break;
        case Piece.bishop:
          const bishopLegalMoves = getBishopMoves({ file, row, table, color });
          const bishopLegalAttackingMoves = getBishopAttackingMoves({ file, row, table, color });
          if (bishopLegalMoves) allLegalMoves.push(...bishopLegalMoves);
          if (bishopLegalAttackingMoves) allLegalMoves.push(...bishopLegalAttackingMoves);
          break;
        case Piece.knight:
          const knightLegalMoves = getKnightMoves({ file, row, table, color });
          const knightLegalAttackingMoves = getKnightAttackingMoves({ file, row, table, color });
          if (knightLegalMoves) allLegalMoves.push(...knightLegalMoves);
          if (knightLegalAttackingMoves) allLegalMoves.push(...knightLegalAttackingMoves);
          break;
        case Piece.rook:
          const rookLegalMoves = getRookMoves({ file, row, table, color });
          const rookLegalAttackingMoves = getRookAttackingMoves({ file, row, table, color });
          if (rookLegalMoves) allLegalMoves.push(...rookLegalMoves);
          if (rookLegalAttackingMoves) allLegalMoves.push(...rookLegalAttackingMoves);
          break;
        case Piece.queen:
          const queenLegalMoves = getQueenMoves({ file, row, table, color });
          const queenLegalAttackingMoves = getQueenAttackingMoves({ file, row, table, color });
          if (queenLegalMoves) allLegalMoves.push(...queenLegalMoves);
          if (queenLegalAttackingMoves) allLegalMoves.push(...queenLegalAttackingMoves);
          break;
        case Piece.king:
          const kingLegalMoves = getKingMoves({ file, row, table, color });
          const kingLegalAttackingMoves = getKingAttackingMoves({ file, row, table, color });
          if (kingLegalMoves) allLegalMoves.push(...kingLegalMoves.moves);
          if (kingLegalAttackingMoves) allLegalMoves.push(...kingLegalAttackingMoves);
          break;
      }
    }
  }
  return allLegalMoves;
};
export const createFENFromTable = (table: ITableState, turn: Color) => {
  let FEN = "";
  for (let i = 8; i >= 1; i--) {
    let emptySquares = 0;
    let hasAnythingBeenAdded = false;
    for (let j = 0; j < 8; j++) {
      if (table[FILE_LETTER[j] + i]?.type === Piece.pawn) {
        hasAnythingBeenAdded = true;
        if (emptySquares > 0) {
          FEN += emptySquares;
          emptySquares = 0;
        }
        if (table[FILE_LETTER[j] + i]?.color === Color.black) {
          FEN += "p";
        } else FEN += "P";
      } else if (table[FILE_LETTER[j] + i]?.type === Piece.knight) {
        hasAnythingBeenAdded = true;
        if (emptySquares > 0) {
          FEN += emptySquares;
          emptySquares = 0;
        }
        if (table[FILE_LETTER[j] + i]?.color === Color.black) {
          FEN += "n";
        } else FEN += "N";
      } else if (table[FILE_LETTER[j] + i]?.type === Piece.bishop) {
        hasAnythingBeenAdded = true;
        if (emptySquares > 0) {
          FEN += emptySquares;
          emptySquares = 0;
        }
        if (table[FILE_LETTER[j] + i]?.color === Color.black) {
          FEN += "b";
        } else FEN += "B";
      } else if (table[FILE_LETTER[j] + i]?.type === Piece.rook) {
        hasAnythingBeenAdded = true;
        if (emptySquares > 0) {
          FEN += emptySquares;
          emptySquares = 0;
        }
        if (table[FILE_LETTER[j] + i]?.color === Color.black) {
          FEN += "r";
        } else FEN += "R";
      } else if (table[FILE_LETTER[j] + i]?.type === Piece.queen) {
        hasAnythingBeenAdded = true;
        if (emptySquares > 0) {
          FEN += emptySquares;
          emptySquares = 0;
        }
        if (table[FILE_LETTER[j] + i]?.color === Color.black) {
          FEN += "q";
        } else FEN += "Q";
      } else if (table[FILE_LETTER[j] + i]?.type === Piece.king) {
        hasAnythingBeenAdded = true;
        if (emptySquares > 0) {
          FEN += emptySquares;
          emptySquares = 0;
        }
        if (table[FILE_LETTER[j] + i]?.color === Color.black) {
          FEN += "k";
        } else FEN += "K";
      }

      if (!hasAnythingBeenAdded) emptySquares++;
      hasAnythingBeenAdded = false;
    }
    if (emptySquares > 0) {
      FEN += emptySquares;
      emptySquares = 0;
    }
    hasAnythingBeenAdded = false;
    FEN += "/";
  }
  FEN = FEN.slice(0, -1);
  if (turn === Color.white) {
    FEN += " w ";
  } else {
    FEN += " b ";
  }
  const whiteKingSquare = getKingSquare({ table: table, color: Color.white });
  const blackKingSquare = getKingSquare({ table: table, color: Color.black });
  let whiteKingFile = "";
  let whiteKingRow = -1;
  let blackKingFile = "";
  let blackKingRow = -1;
  if (whiteKingSquare) {
    whiteKingFile = whiteKingSquare.split("")[0];
    whiteKingRow = +whiteKingSquare.split("")[1];
  }
  if (blackKingSquare) {
    blackKingFile = blackKingSquare.split("")[0];
    blackKingRow = +blackKingSquare.split("")[1];
  }
  const whiteKingInfo = getKingMoves({ table, color: Color.white, file: whiteKingFile, row: whiteKingRow });
  const blackKingInfo = getKingMoves({ table, color: Color.black, file: blackKingFile, row: blackKingRow });
  let isAnyCastlingAvalaible = false;
  if (whiteKingInfo?.queenSideCastling) {
    FEN += "Q";
    isAnyCastlingAvalaible = true;
  }
  if (whiteKingInfo?.kingSideCastling) {
    FEN += "K";
    isAnyCastlingAvalaible = true;
  }
  if (blackKingInfo?.queenSideCastling) {
    FEN += "q";
    isAnyCastlingAvalaible = true;
  }
  if (blackKingInfo?.kingSideCastling) {
    FEN += "k";
    isAnyCastlingAvalaible = true;
  }
  if (isAnyCastlingAvalaible === false) {
    FEN += "-";
  }
  return FEN;
};

import { getBishopAttackingMoves, getBishopAttackingMovesWithoutCheckingForCheck, getBishopMoves } from "./Bishop";
import { BLACK_PAWNS_PROMOTING_POSITIONS, createSquare, FILE_LETTER, WHITE_PAWNS_PROMOTING_POSITIONS } from "./constants";
import { Color, IGetAllAttackingMoves, IHandleMovePieceToSquareWhenHighlighted, IMove, ITableState, Piece } from "./interfaces";
import { getKingAttackingMoves, getKingAttackingMovesWithoutCheckingForCheck, getKingMoves } from "./KIng";
import { getKnightAttackingMoves, getKnightAttackingMovesWithoutCheckingForCheck, getKnightMoves } from "./Knight";
import { getPawnAttackingMoves, getPawnAttackingMovesWithoutCheckingForCheck, getPawnMoves } from "./Pawn";
import { getQueenAttackingMoves, getQueenAttackingMovesWithoutCheckingForCheck, getQueenMoves } from "./Queen";
import { getRookAttackingMoves, getRookAttackingMovesWithoutCheckingForCheck, getRookMoves } from "./rook";

export const getAllAttackingMoves = ({ color, table, enPassantSquare }: IGetAllAttackingMoves): string[] | null => {
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
            enPassantSquare,
          });
          if (pawnAttackingMoves) allAttackingMoves.push(...pawnAttackingMoves);
          break;
        case Piece.bishop:
          const bishopAttackingMoves = getBishopAttackingMovesWithoutCheckingForCheck({
            file,
            row,
            table,
            color,
            enPassantSquare,
          });
          if (bishopAttackingMoves) allAttackingMoves.push(...bishopAttackingMoves);
          break;
        case Piece.knight:
          const knightAttackingMoves = getKnightAttackingMovesWithoutCheckingForCheck({
            file,
            row,
            table,
            color,
            enPassantSquare,
          });
          if (knightAttackingMoves) allAttackingMoves.push(...knightAttackingMoves);
          break;
        case Piece.rook:
          const rookAttackingMoves = getRookAttackingMovesWithoutCheckingForCheck({
            file,
            row,
            table,
            color,
            enPassantSquare,
          });
          if (rookAttackingMoves) allAttackingMoves.push(...rookAttackingMoves);
          break;
        case Piece.queen:
          const queenAttackingMoves = getQueenAttackingMovesWithoutCheckingForCheck({
            file,
            row,
            table,
            color,
            enPassantSquare,
          });
          if (queenAttackingMoves) allAttackingMoves.push(...queenAttackingMoves);
          break;
        case Piece.king:
          const kingAttackingMoves = getKingAttackingMovesWithoutCheckingForCheck({
            file,
            row,
            table,
            color,
            enPassantSquare,
          });
          if (kingAttackingMoves) allAttackingMoves.push(...kingAttackingMoves);
          break;
      }
    }
  }

  return allAttackingMoves;
};
const getKingSquare = ({ table, color }: { table: ITableState; color: Color }) => {
  for (const square in table) {
    if (table[square].type === Piece.king && table[square].color === color) {
      return square;
    }
  }
};
export const checkIfCheck = ({
  table,
  color,
  enPassantSquare,
}: {
  table: ITableState;
  color: Color;
  enPassantSquare: string | null;
}): boolean => {
  const allAttackingMoves = getAllAttackingMoves({
    table: table,
    color: color == Color.white ? Color.black : Color.white,
    enPassantSquare,
  });
  const kingSquare = getKingSquare({ table: table, color: color });
  if (!kingSquare) return true; //Well, it would be weird for this to happen :||
  if (allAttackingMoves?.includes(kingSquare)) {
    return true;
  }
  return false;
};
export const willBeCheck = ({
  table,
  color,
  square,
  file,
  row,
  enPassantSquare,
}: {
  table: ITableState;
  color: Color;
  square: string;
  file: string;
  enPassantSquare: string | null;
  row: number;
}): boolean => {
  const oldSquare = {
    [`${file}${row}`]: createSquare({
      type: null,
      color: null,
    }),
  };
  const newSquare = { [square]: { ...table[`${file}${row}`] } };
  const newTable = { ...table, ...newSquare, ...oldSquare }; //An imaginary table, where the piece has been moved
  const response = checkIfCheck({ table: newTable, color, enPassantSquare });

  return response;
};
export const getAllLegalMoves = ({ color, table, enPassantSquare }: IGetAllAttackingMoves): IMove[] | null => {
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
            enPassantSquare,
          });
          const pawnLegalAttackingMoves = getPawnAttackingMoves({
            file,
            row,
            table,
            color: color,
            turnCoeficient,
            squareName: square,
            enPassantSquare,
          });
          if (pawnLegalMoves) allLegalMoves.push(...pawnLegalMoves);
          if (pawnLegalAttackingMoves && pawnLegalAttackingMoves.attackingPossibleMoves)
            allLegalMoves.push(...pawnLegalAttackingMoves.attackingPossibleMoves);
          if (pawnLegalAttackingMoves && pawnLegalAttackingMoves.enPassantMoves)
            allLegalMoves.push(...pawnLegalAttackingMoves.enPassantMoves);
          break;
        case Piece.bishop:
          const bishopLegalMoves = getBishopMoves({ file, row, table, color, enPassantSquare });
          const bishopLegalAttackingMoves = getBishopAttackingMoves({ file, row, table, color, enPassantSquare });
          if (bishopLegalMoves) allLegalMoves.push(...bishopLegalMoves);
          if (bishopLegalAttackingMoves) allLegalMoves.push(...bishopLegalAttackingMoves);
          break;
        case Piece.knight:
          const knightLegalMoves = getKnightMoves({ file, row, table, color, enPassantSquare });
          const knightLegalAttackingMoves = getKnightAttackingMoves({ file, row, table, color, enPassantSquare });
          if (knightLegalMoves) allLegalMoves.push(...knightLegalMoves);
          if (knightLegalAttackingMoves) allLegalMoves.push(...knightLegalAttackingMoves);
          break;
        case Piece.rook:
          const rookLegalMoves = getRookMoves({ file, row, table, color, enPassantSquare });
          const rookLegalAttackingMoves = getRookAttackingMoves({ file, row, table, color, enPassantSquare });
          if (rookLegalMoves) allLegalMoves.push(...rookLegalMoves);
          if (rookLegalAttackingMoves) allLegalMoves.push(...rookLegalAttackingMoves);
          break;
        case Piece.queen:
          const queenLegalMoves = getQueenMoves({ file, row, table, color, enPassantSquare });
          const queenLegalAttackingMoves = getQueenAttackingMoves({ file, row, table, color, enPassantSquare });
          if (queenLegalMoves) allLegalMoves.push(...queenLegalMoves);
          if (queenLegalAttackingMoves) allLegalMoves.push(...queenLegalAttackingMoves);
          break;
        case Piece.king:
          const kingLegalMoves = getKingMoves({ file, row, table, color, enPassantSquare });
          const kingLegalAttackingMoves = getKingAttackingMoves({ file, row, table, color, enPassantSquare });
          if (kingLegalMoves) allLegalMoves.push(...kingLegalMoves.moves);
          if (kingLegalAttackingMoves) allLegalMoves.push(...kingLegalAttackingMoves);
          break;
      }
    }
  }
  return allLegalMoves;
};

export const createFENFromTable = (
  table: ITableState,
  turn: Color,
  enPassantSquare: string | null,
  halfMoves: number,
  fullMoves: number,
) => {
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
  const whiteKingSquare = table["e1"];
  const blackKingSquare = table["e8"];

  const whiteQueenSideRook = table["a1"];
  const whiteKingSideRook = table["h1"];
  const blackQueenSideRook = table["a8"];
  const blackKingSideRook = table["h8"];

  const isWhiteQueenSideCastlingAvalaible =
    whiteKingSquare &&
    whiteKingSquare.type === Piece.king &&
    whiteKingSquare.color === Color.white &&
    whiteKingSquare.hasMoved === false &&
    whiteQueenSideRook &&
    whiteQueenSideRook.color === Color.white &&
    whiteQueenSideRook.type === Piece.rook &&
    whiteQueenSideRook.hasMoved === false;

  const isWhiteKingSideCastlingAvalaible =
    whiteKingSquare &&
    whiteKingSquare.type === Piece.king &&
    whiteKingSquare.color === Color.white &&
    whiteKingSquare.hasMoved === false &&
    whiteKingSideRook &&
    whiteKingSideRook.color === Color.white &&
    whiteKingSideRook.type === Piece.rook &&
    whiteKingSideRook.hasMoved === false;

  const isBlackQueenSideCastlingAvalaible =
    blackKingSquare &&
    blackKingSquare.type === Piece.king &&
    blackKingSquare.color === Color.black &&
    blackKingSquare.hasMoved === false &&
    blackQueenSideRook &&
    blackQueenSideRook.color === Color.black &&
    blackQueenSideRook.type === Piece.rook &&
    blackQueenSideRook.hasMoved === false;

  const isBlackKingSideCastlingAvalaible =
    blackKingSquare &&
    blackKingSquare.type === Piece.king &&
    blackKingSquare.color === Color.black &&
    blackKingSquare.hasMoved === false &&
    blackKingSideRook &&
    blackKingSideRook.color === Color.black &&
    blackKingSideRook.type === Piece.rook &&
    blackKingSideRook.hasMoved === false;

  let isAnyCastlingAvalaible = false;
  if (isWhiteKingSideCastlingAvalaible) {
    FEN += "K";
    isAnyCastlingAvalaible = true;
  }
  if (isWhiteQueenSideCastlingAvalaible) {
    FEN += "Q";
    isAnyCastlingAvalaible = true;
  }
  if (isBlackKingSideCastlingAvalaible) {
    FEN += "k";
    isAnyCastlingAvalaible = true;
  }
  if (isBlackQueenSideCastlingAvalaible) {
    FEN += "q";
    isAnyCastlingAvalaible = true;
  }

  if (isAnyCastlingAvalaible === false) {
    FEN += "-";
  }
  if (enPassantSquare) {
    FEN += " " + enPassantSquare;
  } else FEN += " -";
  FEN += " ";
  FEN += halfMoves;
  FEN += " ";
  FEN += fullMoves;
  return FEN;
};
export const makeKingCastlingMove = (
  movePieceToSquare: (square: string, piece?: ITableState) => void,
  squareName: string,
  initialX: number,
  initialY: number,
  table: ITableState,
  turn: Color,
) => {
  if (turn === Color.white) {
    movePieceToSquare(squareName, { e1: table["e1"] });
  } else {
    movePieceToSquare(squareName, { e8: table["e8"] });
  }
  // move the king to the castling square
  movePieceToSquare(FILE_LETTER[initialX - 2] + initialY, {
    [FILE_LETTER[initialX] + initialY]: table[FILE_LETTER[initialX] + initialY], // move the rook to the left of the king
  });
};

export const makeQueenCastlingMove = (
  movePieceToSquare: (square: string, piece?: ITableState) => void,
  squareName: string,
  initialX: number,
  initialY: number,
  table: ITableState,
  turn: Color,
) => {
  if (turn === Color.white) {
    movePieceToSquare(squareName, { e1: table["e1"] });
  } else {
    movePieceToSquare(squareName, { e8: table["e8"] });
  } // move the king to the castling square
  movePieceToSquare(FILE_LETTER[initialX] + initialY, {
    [FILE_LETTER[initialX - 3] + initialY]: table[FILE_LETTER[initialX - 3] + initialY], // move the rook to the left of the king
  });
};
export const handleMovePieceToSquareWhenHighlighted = ({
  movePieceToSquare,
  square,
  squareName,
  selectedPiece,
  turnCoeficient,
  initialY,
  setEnPassantSquare,
  changeTurn,
  initialX,
  table,
  removePieceFromSquare,
  increaseFullMoves,
  increaseHalfMoves,
  resetHalfMoves,
  turn,
  setPromotingSquareFunction,
}: IHandleMovePieceToSquareWhenHighlighted) => {
  if (!selectedPiece[Object.keys(selectedPiece)[0]]) return false;
  if (square[squareName].isAttacked || selectedPiece[Object.keys(selectedPiece)[0]].type === Piece.pawn) {
    resetHalfMoves();
  }
  if (
    (square[squareName].isHighlighted && square[squareName].piece === null) || //if piece can go to square (because is highlighted)
    square[squareName].isAttacked //if piece can capture piece
  ) {
    if (
      selectedPiece[Object.keys(selectedPiece)[0]].type === Piece.pawn &&
      +Object.keys(selectedPiece)[0].split("")[1] - 2 * turnCoeficient === initialY
    ) {
      setEnPassantSquare(squareName);
    } else setEnPassantSquare(null);
    movePieceToSquare(squareName);
    if (
      selectedPiece[Object.keys(selectedPiece)[0]].type === Piece.pawn &&
      (WHITE_PAWNS_PROMOTING_POSITIONS.includes(squareName) || BLACK_PAWNS_PROMOTING_POSITIONS.includes(squareName))
    ) {
      setPromotingSquareFunction(squareName);
    }
    increaseHalfMoves();
    if (turn === Color.black) increaseFullMoves();
    changeTurn();
    return true;
  }

  if (square[squareName].isKingCastlingSquare) {
    makeKingCastlingMove(movePieceToSquare, squareName, initialX, initialY, table, turn);
    changeTurn();
    return true;
  }
  if (square[squareName].isQueenCastlingSquare) {
    makeQueenCastlingMove(movePieceToSquare, squareName, initialX, initialY, table, turn);
    changeTurn();
    return true;
  }
  if (square[squareName].isEnPassantMovingSquare) {
    const capturedEnPassantPawn = squareName.split("")[0] + (+squareName.split("")[1] + 1 * turnCoeficient);
    movePieceToSquare(squareName);
    removePieceFromSquare(capturedEnPassantPawn);
    changeTurn();
    return true;
  }
  return false;
};

export const makeTableFromFEN = (FEN: string): ITableState => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tablePositions, turn, castlingRights, enPassant, halfMoves, fullMoves] = FEN.split(" ");
  const table: ITableState = {};
  // const [tablePositions] = FEN.split(" ");
  const rows = tablePositions.split("/");
  for (let i = 8; i >= 1; i--) {
    let rowIndex = 0;
    for (let j = 1; j <= 8; j++) {
      const fileLetter = FILE_LETTER[j - 1];
      const square = `${fileLetter}${i}`;
      const letter = rows[9 - i - 1][rowIndex];
      if (letter === "p") {
        table[square] = createSquare({
          type: Piece.pawn,
          color: Color.black,
        });
      } else if (letter === "P") {
        table[square] = createSquare({
          type: Piece.pawn,
          color: Color.white,
        });
      } else if (letter === "b") {
        table[square] = createSquare({
          type: Piece.bishop,
          color: Color.black,
        });
      } else if (letter === "B") {
        table[square] = createSquare({
          type: Piece.bishop,
          color: Color.white,
        });
      } else if (letter === "r") {
        table[square] = createSquare({
          type: Piece.rook,
          color: Color.black,
        });
      } else if (letter === "R") {
        table[square] = createSquare({
          type: Piece.rook,
          color: Color.white,
          hasMoved: true,
        });
      } else if (letter === "k") {
        table[square] = createSquare({
          type: Piece.king,
          color: Color.black,
        });
      } else if (letter === "K") {
        table[square] = createSquare({
          type: Piece.king,
          color: Color.white,
        });
      } else if (letter === "n") {
        table[square] = createSquare({
          type: Piece.knight,
          color: Color.black,
        });
      } else if (letter === "N") {
        table[square] = createSquare({
          type: Piece.knight,
          color: Color.white,
        });
      } else if (letter === "q") {
        table[square] = createSquare({
          type: Piece.queen,
          color: Color.black,
        });
      } else if (letter === "Q") {
        table[square] = createSquare({
          type: Piece.queen,
          color: Color.white,
        });
      } else if (!isNaN(Number(letter))) {
        for (let k = 0; k < Number(letter); k++) {
          const fileLetter = FILE_LETTER[j + k - 1];
          const square = `${fileLetter}${i}`;
          table[square] = createSquare({
            type: null,
            color: null,
          });
        }
        j += Number(letter) - 1;
      }
      rowIndex++;
    }
  }
  for (let i = 0; i < castlingRights.length; i++) {
    if (castlingRights[i] === "k") {
      table["h8"] = { ...table["h8"], hasMoved: false };
    } else if (castlingRights[i] === "K") {
      table["h1"] = { ...table["h1"], hasMoved: false };
    } else if (castlingRights[i] === "q") {
      table["a8"] = { ...table["a8"], hasMoved: false };
    } else if (castlingRights[i] === "Q") {
      table["a1"] = { ...table["a1"], hasMoved: false };
    }
  }
  return table;
};

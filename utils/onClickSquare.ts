import { getBishopAttackingMoves, getBishopMoves } from "./Bishop";
import { FILE_LETTER } from "./constants";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createFENFromTable } from "./generalFunctions";
import { Color, FileNumber, IOnClickSquare, Piece } from "./interfaces";
import { getKingAttackingMoves, getKingMoves } from "./KIng";
import { getKnightAttackingMoves, getKnightMoves } from "./Knight";
import { getPawnAttackingMoves, getPawnMoves } from "./Pawn";
import { getQueenAttackingMoves, getQueenMoves } from "./Queen";
import { getRookAttackingMoves, getRookMoves } from "./rook";

const onClickSquare = ({
  square,
  table,
  highlightAttackingSquares,
  unHilightAllSquares,
  highlightSquares,
  setSelectedPiece,
  movePieceToSquare,
  turn,
  highlightCastlingSquare,
  // selectedPiece,
  changeTurn,
}: IOnClickSquare) => {
  unHilightAllSquares();

  const squareName = Object.keys(square)[0];
  const file = squareName.split("")[0];
  const row = +squareName.split("")[1];
  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  if (
    (square[squareName].isHighlighted && square[squareName].piece === null) || //if piece can go to square (because is highlighted)
    (square[squareName].isAttacked && square[squareName].piece !== null && square[squareName].color !== turn) //if piece can capture piece
  ) {
    movePieceToSquare(squareName);
    changeTurn();
    return;
  }
  if (square[squareName].isKingCastlingSquare) {
    movePieceToSquare(squareName); // move the king to the castling square
    movePieceToSquare(FILE_LETTER[initialX - 2] + initialY, {
      [FILE_LETTER[initialX] + initialY]: table[FILE_LETTER[initialX] + initialY], // move the rook to the left of the king
    });
    changeTurn();
    return;
  }
  if (square[squareName].isQueenCastlingSquare) {
    movePieceToSquare(squareName); // move the king to the castling square
    movePieceToSquare(FILE_LETTER[initialX] + initialY, {
      [FILE_LETTER[initialX - 3] + initialY]: table[FILE_LETTER[initialX - 3] + initialY], // move the rook to the left of the king
    });
    changeTurn();
    return;
  }
  console.log(createFENFromTable(table, turn));

  setSelectedPiece(square);
  const turnCoeficient = turn === Color.black ? 1 : -1;

  if (square[squareName].type === Piece.pawn && square[squareName].color === turn) {
    const squares = getPawnMoves({
      table,
      file,
      row,
      turnCoeficient,
      squareName,
      color: square[squareName].color,
    });
    const attackingSquares = getPawnAttackingMoves({
      table,
      file,
      row,
      turnCoeficient,
      squareName,
      color: square[squareName].color,
    });
    highlightAttackingSquares(attackingSquares);
    highlightSquares(squares);
  } else if (square[squareName].type === Piece.knight && square[squareName].color === turn) {
    const squares = getKnightMoves({ table, file, row, color: square[squareName].color });
    const attackingSquares = getKnightAttackingMoves({ table, file, row, color: square[squareName].color });
    highlightAttackingSquares(attackingSquares);
    highlightSquares(squares);
  } else if (square[squareName].type === Piece.bishop && square[squareName].color === turn) {
    const squares = getBishopMoves({ table, file, row, color: square[squareName].color });
    const attackingSquares = getBishopAttackingMoves({ table, file, row, color: square[squareName].color });
    highlightAttackingSquares(attackingSquares);
    highlightSquares(squares);
  } else if (square[squareName].type === Piece.rook && square[squareName].color === turn) {
    const squares = getRookMoves({ table, file, row, color: square[squareName].color });
    const attackingSquares = getRookAttackingMoves({ table, file, row, color: square[squareName].color });
    highlightAttackingSquares(attackingSquares);
    highlightSquares(squares);
  } else if (square[squareName].type === Piece.queen && square[squareName].color === turn) {
    const squares = getQueenMoves({ table, file, row, color: square[squareName].color });
    const attackingSquares = getQueenAttackingMoves({ table, file, row, color: square[squareName].color });
    highlightAttackingSquares(attackingSquares);
    highlightSquares(squares);
  } else if (square[squareName].type === Piece.king && square[squareName].color === turn) {
    const kingMovesInfo = getKingMoves({ table, file, row, color: square[squareName].color });
    const attackingSquares = getKingAttackingMoves({ table, file, row, color: square[squareName].color });
    if (kingMovesInfo && kingMovesInfo.moves) highlightSquares(kingMovesInfo.moves);
    if (kingMovesInfo && kingMovesInfo.kingSideCastling)
      highlightCastlingSquare(FILE_LETTER[initialX + 1] + initialY, true);
    if (kingMovesInfo && kingMovesInfo.queenSideCastling)
      highlightCastlingSquare(FILE_LETTER[initialX - 3] + initialY, false);

    highlightAttackingSquares(attackingSquares);
  }
};
export default onClickSquare;

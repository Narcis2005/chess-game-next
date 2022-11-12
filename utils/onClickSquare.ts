import { getBishopAttackingMoves, getBishopMoves } from "./Bishop";
import { Color, IOnClickSquare, Piece } from "./interfaces";
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
  changeTurn,
}: IOnClickSquare) => {
  unHilightAllSquares();

  const squareName = Object.keys(square)[0];
  if (
    (square[squareName].isHighlighted && square[squareName].piece === null) || //if piece can go to square (because is highlighted)
    (square[squareName].isAttacked && square[squareName].piece !== null && square[squareName].color !== turn) //if piece can capture piece
  ) {
    movePieceToSquare(squareName);
    changeTurn();
    return;
  }
  setSelectedPiece(square);
  const turnCoeficient = turn === Color.black ? 1 : -1;
  const file = squareName.split("")[0];
  const row = +squareName.split("")[1];
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
  }
};
export default onClickSquare;

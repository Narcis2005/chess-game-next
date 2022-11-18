import { getBishopAttackingMoves, getBishopMoves } from "./Bishop";
import { FILE_LETTER } from "./constants";
import { createFENFromTable, handleMovePieceToSquareWhenHighlighted } from "./generalFunctions";
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
  selectedPiece,
  enPassantSquare,
  setEnPassantSquare,
  changeTurn,
  highlightEnPassantSquare,
  removePieceFromSquare,
}: IOnClickSquare) => {
  unHilightAllSquares();
  const squareName = Object.keys(square)[0];
  const file = squareName.split("")[0];
  const row = +squareName.split("")[1];
  const initialX = FileNumber[file as keyof typeof FileNumber];
  const initialY = row;
  const turnCoeficient = turn === Color.black ? 1 : -1;
  const hasPieceMoved = handleMovePieceToSquareWhenHighlighted({
    removePieceFromSquare,
    table,
    square,
    squareName,
    changeTurn,
    setEnPassantSquare,
    selectedPiece,
    movePieceToSquare,
    turnCoeficient,
    initialX,
    initialY,
  });
  if (hasPieceMoved) return;
  console.log(createFENFromTable(table, turn, enPassantSquare));
  setSelectedPiece(square);

  if (square[squareName].type === Piece.pawn && square[squareName].color === turn) {
    const squares = getPawnMoves({
      table,
      file,
      row,
      turnCoeficient,
      squareName,
      color: square[squareName].color,
      enPassantSquare,
    });
    const attackingPawnsInfo = getPawnAttackingMoves({
      table,
      file,
      row,
      turnCoeficient,
      squareName,
      color: square[squareName].color,
      enPassantSquare,
    });
    highlightSquares(squares);
    if (attackingPawnsInfo && attackingPawnsInfo.attackingPossibleMoves)
      highlightAttackingSquares(attackingPawnsInfo.attackingPossibleMoves);
    if (attackingPawnsInfo && attackingPawnsInfo.enPassantMoves) highlightEnPassantSquare(attackingPawnsInfo.enPassantMoves);
  } else if (square[squareName].type === Piece.knight && square[squareName].color === turn) {
    const squares = getKnightMoves({ table, file, row, color: square[squareName].color, enPassantSquare });
    const attackingSquares = getKnightAttackingMoves({
      table,
      file,
      row,
      color: square[squareName].color,
      enPassantSquare,
    });
    highlightAttackingSquares(attackingSquares);
    highlightSquares(squares);
  } else if (square[squareName].type === Piece.bishop && square[squareName].color === turn) {
    const squares = getBishopMoves({ table, file, row, color: square[squareName].color, enPassantSquare });
    const attackingSquares = getBishopAttackingMoves({
      table,
      file,
      row,
      color: square[squareName].color,
      enPassantSquare,
    });
    highlightAttackingSquares(attackingSquares);
    highlightSquares(squares);
  } else if (square[squareName].type === Piece.rook && square[squareName].color === turn) {
    const squares = getRookMoves({ table, file, row, color: square[squareName].color, enPassantSquare });
    const attackingSquares = getRookAttackingMoves({
      table,
      file,
      row,
      color: square[squareName].color,
      enPassantSquare,
    });
    highlightAttackingSquares(attackingSquares);
    highlightSquares(squares);
  } else if (square[squareName].type === Piece.queen && square[squareName].color === turn) {
    const squares = getQueenMoves({ table, file, row, color: square[squareName].color, enPassantSquare });
    const attackingSquares = getQueenAttackingMoves({
      table,
      file,
      row,
      color: square[squareName].color,
      enPassantSquare,
    });
    highlightAttackingSquares(attackingSquares);
    highlightSquares(squares);
  } else if (square[squareName].type === Piece.king && square[squareName].color === turn) {
    const kingMovesInfo = getKingMoves({ table, file, row, color: square[squareName].color, enPassantSquare });
    const attackingSquares = getKingAttackingMoves({
      table,
      file,
      row,
      color: square[squareName].color,
      enPassantSquare,
    });
    if (kingMovesInfo && kingMovesInfo.moves) highlightSquares(kingMovesInfo.moves);
    if (kingMovesInfo && kingMovesInfo.kingSideCastling) highlightCastlingSquare(FILE_LETTER[initialX + 1] + initialY, true);
    if (kingMovesInfo && kingMovesInfo.queenSideCastling) highlightCastlingSquare(FILE_LETTER[initialX - 3] + initialY, false);

    highlightAttackingSquares(attackingSquares);
  }
};
export default onClickSquare;

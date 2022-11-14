export enum Piece {
  pawn,
  knight,
  bishop,
  rook,
  queen,
  king,
}
export enum Color {
  white,
  black,
}
export enum FileNumber {
  a = 1,
  b = 2,
  c = 3,
  d = 4,
  e = 5,
  f = 6,
  g = 7,
  h = 8,
}

export interface ICreateSquare {
  piece: string | null;
  type: Piece | null;
  isHighlighted?: boolean;
  isAttacked?: boolean;
  color: Color | null;
  hasMoved?: boolean;
}
export interface ISquare {
  piece: string | null;
  type: Piece | null;
  isHighlighted: boolean;
  isAttacked: boolean;
  color: Color | null;
  hasMoved: boolean;
  isKingCastlingSquare: boolean;
  isQueenCastlingSquare: boolean;
}
export interface ITableState {
  [key: string]: ISquare;
}
export interface IOnClickSquare {
  square: ITableState;
  table: ITableState;
  highlightSquares: (squares: string[] | null) => void;
  unHilightAllSquares: () => void;
  setSelectedPiece: (square: ITableState) => void;
  movePieceToSquare: (square: string, piece?: ITableState) => void;
  turn: Color;
  selectedPiece: ITableState;
  changeTurn: () => void;
  highlightAttackingSquares: (squares: string[] | null) => void;
  highlightCastlingSquare: (square: string, king: boolean) => void;
}

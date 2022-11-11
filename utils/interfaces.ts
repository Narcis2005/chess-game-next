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
  highlighted?: boolean;
  canBeAttacked?: boolean;
  color: Color | null;
}
export interface ISquare {
  piece: string | null;
  type: Piece | null;
  highlighted: boolean;
  canBeAttacked: boolean;
  color: Color | null;
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
  selectedPiece: ITableState;
  movePieceToSquare: (square: string) => void;
  turn: Color;
  changeTurn: () => void;
  highlightAttackingSquares: (squares: string[] | null) => void;
}

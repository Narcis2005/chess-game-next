export enum Piece {
  pawn = "pawn",
  knight = "knight",
  bishop = "bishop",
  rook = "rook",
  queen = "queen",
  king = "king",
}
export enum Color {
  white = "White",
  black = "Black",
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
  type: Piece | null;
  color: Color | null;
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
  isEnPassantMovingSquare: boolean;
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
  enPassantSquare: string | null;
  setEnPassantSquare: (square: string | null) => void;
  highlightEnPassantSquare: (square: string[]) => void;
  removePieceFromSquare: (square: string) => void;
}
export interface IGetAllAttackingMoves {
  color: Color;
  table: ITableState;
  enPassantSquare: string | null;
}
export interface IHandleMovePieceToSquareWhenHighlighted {
  movePieceToSquare: (square: string, piece?: ITableState) => void;
  square: ITableState;
  squareName: string;
  selectedPiece: ITableState;
  turnCoeficient: number;
  initialY: number;
  setEnPassantSquare: (square: string | null) => void;
  changeTurn: () => void;
  initialX: number;
  table: ITableState;
  removePieceFromSquare: (square: string) => void;
}

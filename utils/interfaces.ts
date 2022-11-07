export interface ITableState {
  [key: string]: {
    piece: string | null;
    type: "rook" | "pawn" | "queen" | "bishop" | "king" | "knight" | null;
    highlighted: boolean;
    canBeAttacked: boolean;
    color: "white" | "black" | null;
  };
}
export interface IOnClickSquare {
  square: ITableState;
  table: ITableState;
  highliteSquares: ({ squares }: { squares: string[] }) => void;
  unhilightAllSquares: () => void;
  setSelectedPiece: (square: ITableState) => void;
  selectedPiece: ITableState;
  movePieceToSquare: (square: string) => void;
  turn: "black" | "white";
  changeTurn: () => void;
}

export type ITurnState = "white" | "black";

import { Color, ICreateSquare, ISquare, ITableState, Piece } from "./interfaces";
export const FILE_LETTER = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const PAWN_STARTING_POSITIONS = [
  "a2",
  "a7",
  "b2",
  "b7",
  "c2",
  "c7",
  "d2",
  "d7",
  "e2",
  "e7",
  "f2",
  "f7",
  "g2",
  "g7",
  "h2",
  "h7",
];

const CreateInitialState = (): ITableState => {
  const initialState: ITableState = {};
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
      const fileLetter = FILE_LETTER[i - 1];
      const square = `${fileLetter}${j}`;
      initialState[square] = createSquare({
        piece: null,
        type: null,
        isHighlighted: false,
        isAttacked: false,
        color: null,
      });
    }
  }
  return initialState;
};

export const createSquare = ({
  piece,
  type,
  isHighlighted,
  isAttacked,
  color,
  hasMoved = false,
}: ICreateSquare): ISquare => {
  return {
    piece: piece,
    type: type,
    color: color,
    isHighlighted: isHighlighted === true ? true : false, //because it can be null
    isAttacked: isAttacked === true ? true : false, //because it can be null
    hasMoved: hasMoved,
    isKingCastlingSquare: false,
    isQueenCastlingSquare: false,
  };
};
const initialTablePiecePositions: ITableState = {
  a1: createSquare({ piece: "rookWhite", type: Piece.rook, color: Color.white }),
  a2: createSquare({ piece: "pawnWhite", type: Piece.pawn, color: Color.white }),
  a7: createSquare({ piece: "pawnBlack", type: Piece.pawn, color: Color.black }),
  a8: createSquare({ piece: "rookBlack", type: Piece.rook, color: Color.black }),
  b1: createSquare({ piece: "knightWhite", type: Piece.knight, color: Color.white }),
  b2: createSquare({ piece: "pawnWhite", type: Piece.pawn, color: Color.white }),
  b7: createSquare({ piece: "pawnBlack", type: Piece.pawn, color: Color.black }),
  b8: createSquare({ piece: "knightBlack", type: Piece.knight, color: Color.black }),
  c1: createSquare({ piece: "bishopWhite", type: Piece.bishop, color: Color.white }),
  c2: createSquare({ piece: "pawnWhite", type: Piece.pawn, color: Color.white }),
  c7: createSquare({ piece: "pawnBlack", type: Piece.pawn, color: Color.black }),
  c8: createSquare({ piece: "bishopBlack", type: Piece.bishop, color: Color.black }),
  d1: createSquare({ piece: "queenWhite", type: Piece.queen, color: Color.white }),
  d2: createSquare({ piece: "pawnWhite", type: Piece.pawn, color: Color.white }),
  d7: createSquare({ piece: "pawnBlack", type: Piece.pawn, color: Color.black }),
  d8: createSquare({ piece: "queenBlack", type: Piece.queen, color: Color.black }),
  e1: createSquare({ piece: "kingWhite", type: Piece.king, color: Color.white }),
  e2: createSquare({ piece: "pawnWhite", type: Piece.pawn, color: Color.white }),
  // d4: createSquare({ piece: "kingWhite", type: Piece.king, color: Color.white }),

  // a5: createSquare({ piece: "rookBlack", type: Piece.rook, color: Color.black }),

  e7: createSquare({ piece: "pawnBlack", type: Piece.pawn, color: Color.black }),
  e8: createSquare({ piece: "kingBlack", type: Piece.king, color: Color.black }),
  f1: createSquare({ piece: "bishopWhite", type: Piece.bishop, color: Color.white }),
  f2: createSquare({ piece: "pawnWhite", type: Piece.pawn, color: Color.white }),
  f7: createSquare({ piece: "pawnBlack", type: Piece.pawn, color: Color.black }),
  f8: createSquare({ piece: "bishopBlack", type: Piece.bishop, color: Color.black }),
  g1: createSquare({ piece: "knightWhite", type: Piece.knight, color: Color.white }),
  g2: createSquare({ piece: "pawnWhite", type: Piece.pawn, color: Color.white }),
  g7: createSquare({ piece: "pawnBlack", type: Piece.pawn, color: Color.black }),
  g8: createSquare({ piece: "knightBlack", type: Piece.knight, color: Color.black }),
  h1: createSquare({ piece: "rookWhite", type: Piece.rook, color: Color.white }),
  h2: createSquare({ piece: "pawnWhite", type: Piece.pawn, color: Color.white }),
  h7: createSquare({ piece: "pawnBlack", type: Piece.pawn, color: Color.black }),
  h8: createSquare({ piece: "rookBlack", type: Piece.rook, color: Color.black }),
  // a8: createSquare({ piece: "kingBlack", type: Piece.king, color: Color.black }),

  // b5: createSquare({ piece: "queenWhite", type: Piece.queen, color: Color.white }),
  // c6: createSquare({ piece: "kingWhite", type: Piece.king, color: Color.white }),
};
export const InitialTableState: ITableState = {
  ...CreateInitialState(),
  ...initialTablePiecePositions,
};

import { Color, ICreateSquare, ISquare, ITableState, Piece } from "./interfaces";

//If you see anywhere in the project FILE_LETTER[index - 1] and you are confused about the -1, it's because this array is 0 indexed. FILE_LETTER[index - 1] will represent the current file
export const FILE_LETTER = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const PAWN_STARTING_POSITIONS = ["a2", "a7", "b2", "b7", "c2", "c7", "d2", "d7", "e2", "e7", "f2", "f7", "g2", "g7", "h2", "h7"];

const initializeTableWithEmptySquares = (): ITableState => {
  const initialState: ITableState = {};
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
      const fileLetter = FILE_LETTER[i - 1];
      const square = `${fileLetter}${j}`;
      initialState[square] = createSquare({
        type: null,
        color: null,
      });
    }
  }
  return initialState;
};

export const createSquare = ({ type, color }: ICreateSquare): ISquare => {
  let piece = null;
  if (type && color) {
    piece = type + color.charAt(0).toUpperCase() + color.slice(1);
  }
  return {
    piece: piece,
    type: type,
    color: color,
    isHighlighted: false, //because it can be null
    isAttacked: false, //because it can be null
    hasMoved: false,
    isKingCastlingSquare: false,
    isQueenCastlingSquare: false,
    isEnPassantMovingSquare: false,
  };
};
const initialPiecesPositions: ITableState = {
  a1: createSquare({ type: Piece.rook, color: Color.white }),
  a2: createSquare({ type: Piece.pawn, color: Color.white }),
  a7: createSquare({ type: Piece.pawn, color: Color.black }),
  a8: createSquare({ type: Piece.rook, color: Color.black }),
  b1: createSquare({ type: Piece.knight, color: Color.white }),
  b2: createSquare({ type: Piece.pawn, color: Color.white }),
  b7: createSquare({ type: Piece.pawn, color: Color.black }),
  b8: createSquare({ type: Piece.knight, color: Color.black }),
  c1: createSquare({ type: Piece.bishop, color: Color.white }),
  c2: createSquare({ type: Piece.pawn, color: Color.white }),
  c7: createSquare({ type: Piece.pawn, color: Color.black }),
  c8: createSquare({ type: Piece.bishop, color: Color.black }),
  d1: createSquare({ type: Piece.queen, color: Color.white }),
  d2: createSquare({ type: Piece.pawn, color: Color.white }),
  d7: createSquare({ type: Piece.pawn, color: Color.black }),
  d8: createSquare({ type: Piece.queen, color: Color.black }),
  e1: createSquare({ type: Piece.king, color: Color.white }),
  e2: createSquare({ type: Piece.pawn, color: Color.white }),
  e7: createSquare({ type: Piece.pawn, color: Color.black }),
  e8: createSquare({ type: Piece.king, color: Color.black }),
  f1: createSquare({ type: Piece.bishop, color: Color.white }),
  f2: createSquare({ type: Piece.pawn, color: Color.white }),
  f7: createSquare({ type: Piece.pawn, color: Color.black }),
  f8: createSquare({ type: Piece.bishop, color: Color.black }),
  g1: createSquare({ type: Piece.knight, color: Color.white }),
  g2: createSquare({ type: Piece.pawn, color: Color.white }),
  g7: createSquare({ type: Piece.pawn, color: Color.black }),
  g8: createSquare({ type: Piece.knight, color: Color.black }),
  h1: createSquare({ type: Piece.rook, color: Color.white }),
  h2: createSquare({ type: Piece.pawn, color: Color.white }),
  h7: createSquare({ type: Piece.pawn, color: Color.black }),
  h8: createSquare({ type: Piece.rook, color: Color.black }),
};
export const InitialTableState: ITableState = {
  ...initializeTableWithEmptySquares(),
  ...initialPiecesPositions,
};

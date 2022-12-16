import { ICreateSquare, ISquare } from "./interfaces";

//If you see anywhere in the project FILE_LETTER[index - 1] and you are confused about the -1, it's because this array is 0 indexed. FILE_LETTER[index - 1] will represent the current file
export const FILE_LETTER = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const PAWN_STARTING_POSITIONS = ["a2", "a7", "b2", "b7", "c2", "c7", "d2", "d7", "e2", "e7", "f2", "f7", "g2", "g7", "h2", "h7"];
export const WHITE_PAWNS_PROMOTING_POSITIONS = ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"];
export const BLACK_PAWNS_PROMOTING_POSITIONS = ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"];
export const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const createSquare = ({ type, color, hasMoved }: ICreateSquare): ISquare => {
  let piece = null;
  if (type && color) {
    piece = type + color.charAt(0).toUpperCase() + color.slice(1);
  }
  return {
    piece: piece,
    type: type,
    color: color,
    isHighlighted: false,
    isAttacked: false,
    hasMoved: hasMoved ? hasMoved : false,
    isKingCastlingSquare: false,
    isQueenCastlingSquare: false,
    isEnPassantMovingSquare: false,
  };
};

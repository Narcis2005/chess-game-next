import { Dispatch, SetStateAction } from "react";
import { createSquare } from "./constants";
import { ITableState, IMove, Color, Piece } from "./interfaces";

export const containerFunctionHighlightSquares = (table: ITableState, setTableState: Dispatch<SetStateAction<ITableState>>) => {
  const highlightSquares = (squares: IMove[] | null) => {
    if (squares === null) return;
    const highlitedSquares: ITableState = {};
    for (const i of squares) {
      highlitedSquares[i.targetSquare] = { ...table[i.targetSquare], isHighlighted: true };
    }
    setTableState((oldState) => {
      return { ...oldState, ...highlitedSquares };
    });
  };
  return highlightSquares;
};
export const containerFunctionHighlightAttackingSquares = (table: ITableState, setTableState: Dispatch<SetStateAction<ITableState>>) => {
  const highlightAttackingSquares = (squares: IMove[] | null) => {
    if (squares === null) return;
    const attackHighlitedSquares: ITableState = {};
    for (const i of squares) {
      attackHighlitedSquares[i.targetSquare] = { ...table[i.targetSquare], isAttacked: true };
    }
    setTableState((oldTable) => {
      return { ...oldTable, ...attackHighlitedSquares };
    });
  };
  return highlightAttackingSquares;
};

export const containerFunctionUnhighlightAllSquares = (table: ITableState, setTableState: Dispatch<SetStateAction<ITableState>>) => {
  const unHilightAllSquares = () => {
    const newState: ITableState = {};
    for (const i in table) {
      newState[i] = {
        ...table[i],
        isHighlighted: false,
        isAttacked: false,
        isKingCastlingSquare: false,
        isQueenCastlingSquare: false,
        isEnPassantMovingSquare: false,
      };
    }
    setTableState(newState);
  };
  return unHilightAllSquares;
};

export const containerFunctionMovePieceToSquare = (setTableState: Dispatch<SetStateAction<ITableState>>, selectedPiece: ITableState) => {
  const movePieceToSquare = (square: string, pieceToMove?: ITableState) => {
    const piece = pieceToMove ? pieceToMove : selectedPiece;
    const emptySquare = {
      [Object.keys(piece)[0]]: createSquare({ color: null, type: null }),
    };
    const newSquare = {
      [square]: {
        ...piece[Object.keys(piece)[0]],
        hasMoved: true,
      },
    };
    setTableState((oldState) => {
      return { ...oldState, ...emptySquare, ...newSquare };
    });
  };
  return movePieceToSquare;
};

export const containerFunctionHighlightCastlingSquare = (table: ITableState, setTableState: Dispatch<SetStateAction<ITableState>>) => {
  const highlightCastlingSquare = (square: string, king: boolean) => {
    const castlingSquares: ITableState = {};
    if (king) castlingSquares[square] = { ...table[square], isKingCastlingSquare: true };
    else castlingSquares[square] = { ...table[square], isQueenCastlingSquare: true };

    setTableState((oldTable) => {
      return { ...oldTable, ...castlingSquares };
    });
  };
  return highlightCastlingSquare;
};

export const containerFunctionHighlightEnPassantSquare = (table: ITableState, setTableState: Dispatch<SetStateAction<ITableState>>) => {
  const highlightEnPassantSquare = (squares: IMove[]) => {
    const castlingSquares: ITableState = {};
    for (const i of squares) {
      castlingSquares[i.targetSquare] = { ...table[i.targetSquare], isEnPassantMovingSquare: true };
    }
    setTableState((oldTable) => {
      return { ...oldTable, ...castlingSquares };
    });
  };
  return highlightEnPassantSquare;
};

export const containerFunctionRemovePieceFromSquare = (setTableState: Dispatch<SetStateAction<ITableState>>) => {
  const removePieceFromSquare = (square: string) => {
    const emptySquare = {
      [square]: createSquare({ color: null, type: null }),
    };
    setTableState((oldState) => {
      return { ...oldState, ...emptySquare };
    });
  };
  return removePieceFromSquare;
};

export const containerFunctionChangeTurn = (setTurn: Dispatch<SetStateAction<Color>>) => {
  const changeTurn = () => {
    setTurn((oldTurn) => {
      return oldTurn === Color.black ? Color.white : Color.black;
    });
  };
  return changeTurn;
};

export const containerFunctionHandlePromotingPiece = (
  turn: Color,
  promotingSquare: string | null,
  setTableState: Dispatch<SetStateAction<ITableState>>,
  setPromotingSquare: Dispatch<SetStateAction<string | null>>,
) => {
  const handlePromotingPiece = (e: React.MouseEvent, piece: Piece) => {
    e.preventDefault();
    const oppositeColor = turn === Color.black ? Color.white : Color.black;
    const newPiece = createSquare({ type: piece, color: oppositeColor, hasMoved: true });
    if (promotingSquare)
      setTableState((prevState) => {
        return { ...prevState, [promotingSquare]: { ...newPiece } };
      });
    setPromotingSquare("");
  };
  return handlePromotingPiece;
};

export const containerFunctionShowPreviousPosition = (FENHistoryIndex: number, setFENHistoryIndex: Dispatch<SetStateAction<number>>) => {
  const showPreviousPosition = (e: React.MouseEvent) => {
    e.preventDefault();
    if (FENHistoryIndex <= 0) return;
    setFENHistoryIndex((prevFENHistoryIndex) => prevFENHistoryIndex - 1);
  };
  return showPreviousPosition;
};

export const containerFunctionShowNextPosition = (
  FENHistoryIndex: number,
  setFENHistoryIndex: Dispatch<SetStateAction<number>>,
  FENHistoryLength: number,
) => {
  const showNextPosition = (e: React.MouseEvent) => {
    e.preventDefault();
    if (FENHistoryIndex >= FENHistoryLength - 1) return;
    setFENHistoryIndex((prevFENHistoryIndex) => prevFENHistoryIndex + 1);
  };
  return showNextPosition;
};

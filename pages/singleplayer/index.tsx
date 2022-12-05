/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextPage } from "next";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import Square from "../../components/Square";
import { createSquare, FILE_LETTER, InitialTableState } from "../../utils/constants";
import { Color, IMove, ITableState, Piece } from "../../utils/interfaces";
import File from "../../components/File";
import HomeButtonImage from "../../assets/home-button-svgrepo-com.svg";
import Link from "next/link";
import { useSetCheckAndFENHistory, useSetGameState, useSetPositionFromHistory } from "./hooks";
type TEnPassant = string | null;
// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const containerFunctionHighlightSquares = (table: ITableState, setTableState: Dispatch<SetStateAction<ITableState>>) => {
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
const Singleplayer: NextPage = () => {
  const [tableState, setTableState] = useState<ITableState>(InitialTableState);
  const [selectedPiece, setSelectedPiece] = useState<ITableState>({});
  const [turn, setTurn] = useState<Color>(Color.white);
  const setGameState = useSetGameState(turn);
  const enPassantSquare = useRef<TEnPassant>(null);

  const highlightSquares = containerFunctionHighlightSquares(tableState, setTableState);
  const {
    FENHistory,
    FENHistoryIndex,
    fullMoves,
    halfMoves,
    increaseFullMoves,
    increaseHalfMoves,
    setHalfMoves,
    setFullMoves,
    setFENHistoryIndex,
    resetHalfMoves,
  } = useSetCheckAndFENHistory(tableState, turn, enPassantSquare.current, setGameState);

  const [promotingSquare, setPromotingSquare] = useState<string | null>("");

  const setEnPassantSquare = useCallback((square: string | null) => {
    enPassantSquare.current = square;
  }, []);

  useSetPositionFromHistory(setTableState, setEnPassantSquare, setTurn, setHalfMoves, setFullMoves, FENHistory, FENHistoryIndex);
  const highlightAttackingSquares = (squares: IMove[] | null) => {
    if (squares === null) return;
    const attackHighlitedSquares: ITableState = {};
    for (const i of squares) {
      attackHighlitedSquares[i.targetSquare] = { ...tableState[i.targetSquare], isAttacked: true };
    }
    setTableState((oldTable) => {
      return { ...oldTable, ...attackHighlitedSquares };
    });
  };

  const functionSetSelectedPiece = (square: ITableState) => {
    setSelectedPiece(square);
  };

  const unHilightAllSquares = () => {
    const newState: ITableState = {};
    for (const i in tableState) {
      newState[i] = {
        ...tableState[i],
        isHighlighted: false,
        isAttacked: false,
        isKingCastlingSquare: false,
        isQueenCastlingSquare: false,
        isEnPassantMovingSquare: false,
      };
    }
    setTableState(newState);
  };

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
  const changeTurn = () => {
    setTurn((oldTurn) => {
      return oldTurn === Color.black ? Color.white : Color.black;
    });
  };
  const highlightCastlingSquare = (square: string, king: boolean) => {
    const castlingSquares: ITableState = {};
    if (king) castlingSquares[square] = { ...tableState[square], isKingCastlingSquare: true };
    else castlingSquares[square] = { ...tableState[square], isQueenCastlingSquare: true };

    setTableState((oldTable) => {
      return { ...oldTable, ...castlingSquares };
    });
  };

  const highlightEnPassantSquare = (squares: IMove[]) => {
    const castlingSquares: ITableState = {};
    for (const i of squares) {
      castlingSquares[i.targetSquare] = { ...tableState[i.targetSquare], isEnPassantMovingSquare: true };
    }
    setTableState((oldTable) => {
      return { ...oldTable, ...castlingSquares };
    });
  };
  const removePieceFromSquare = (square: string) => {
    const emptySquare = {
      [square]: createSquare({ color: null, type: null }),
    };
    setTableState((oldState) => {
      return { ...oldState, ...emptySquare };
    });
  };

  const setPromotingSquareFunction = (square: string | null) => {
    setPromotingSquare(square);
  };
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

  const showPreviousPosition = (e: React.MouseEvent) => {
    e.preventDefault();
    if (FENHistoryIndex <= 0) return;
    setFENHistoryIndex((prevFENHistoryIndex) => prevFENHistoryIndex - 1);
  };
  const showNextPosition = (e: React.MouseEvent) => {
    e.preventDefault();
    if (FENHistoryIndex >= FENHistory.length - 1) return;
    setFENHistoryIndex((prevFENHistoryIndex) => prevFENHistoryIndex + 1);
  };
  return (
    <>
      <div className="container">
        <div className="home-button-container">
          <Link href="/">
            <button>
              <Image src={HomeButtonImage} height={30} width={30} alt="home button" />
            </button>
          </Link>
        </div>
        <div className="table">
          {FILE_LETTER.map((letter, fileIndex) => {
            return (
              <File key={letter}>
                {new Array(8).fill(0).map((_, squareIndex) => {
                  return (
                    <Square
                      key={(fileIndex + 1) * (squareIndex + 1)}
                      YCoordonate={fileIndex + 1}
                      XCoordonate={squareIndex + 1}
                      isHighlited={tableState[letter + (8 - squareIndex)].isHighlighted}
                      isAttacked={tableState[letter + (8 - squareIndex)].isAttacked}
                      isEnPassantSquare={tableState[letter + (8 - squareIndex)].isEnPassantMovingSquare}
                      isCastlingSquare={
                        tableState[letter + (8 - squareIndex)].isKingCastlingSquare ||
                        tableState[letter + (8 - squareIndex)].isQueenCastlingSquare
                      }
                      onClickSquareProps={{
                        movePieceToSquare: movePieceToSquare,
                        square: { [letter + (8 - squareIndex)]: tableState[letter + (8 - squareIndex)] },
                        table: tableState,
                        setSelectedPiece: functionSetSelectedPiece,
                        highlightSquares: highlightSquares,
                        unHilightAllSquares: unHilightAllSquares,
                        turn: turn,
                        changeTurn: changeTurn,
                        highlightAttackingSquares: highlightAttackingSquares,
                        selectedPiece,
                        highlightCastlingSquare,
                        enPassantSquare: enPassantSquare.current,
                        setEnPassantSquare,
                        highlightEnPassantSquare,
                        removePieceFromSquare,
                        increaseFullMoves,
                        increaseHalfMoves,
                        resetHalfMoves,
                        halfMoves: halfMoves,
                        fullMoves: fullMoves,
                        setPromotingSquareFunction,
                        // addFENToHistory,
                        isNewestPosition: FENHistory.length - 1 === FENHistoryIndex,
                      }}
                    >
                      {tableState[letter + (8 - squareIndex)].piece !== null ? (
                        <Image src={"/" + tableState[letter + (8 - squareIndex)].piece + ".png"} alt="" width={80} height={80} />
                      ) : null}
                    </Square>
                  );
                })}
              </File>
            );
          })}
        </div>
        <div className="table-buttons">
          <button onClick={showPreviousPosition}>Before</button>
          <button onClick={showNextPosition}>After</button>
        </div>
      </div>
      {promotingSquare !== "" && (
        <div className="full-screen-overlay">
          <div className="promoting-pieces-container">
            <button onClick={(e) => handlePromotingPiece(e, Piece.knight)}>
              <Image
                src={
                  "/" +
                  "knight" +
                  (turn === Color.black ? Color.white : Color.black).charAt(0).toUpperCase() +
                  (turn === Color.black ? Color.white : Color.black).slice(1) +
                  ".png"
                }
                alt=""
                width={150}
                height={150}
              />
            </button>
            <button onClick={(e) => handlePromotingPiece(e, Piece.bishop)}>
              <Image
                src={
                  "/" +
                  "bishop" +
                  (turn === Color.black ? Color.white : Color.black).charAt(0).toUpperCase() +
                  (turn === Color.black ? Color.white : Color.black).slice(1) +
                  ".png"
                }
                alt=""
                width={150}
                height={150}
              />
            </button>
            <button onClick={(e) => handlePromotingPiece(e, Piece.queen)}>
              <Image
                src={
                  "/" +
                  "queen" +
                  (turn === Color.black ? Color.white : Color.black).charAt(0).toUpperCase() +
                  (turn === Color.black ? Color.white : Color.black).slice(1) +
                  ".png"
                }
                alt=""
                width={150}
                height={150}
              />
            </button>
            <button onClick={(e) => handlePromotingPiece(e, Piece.rook)}>
              <Image
                src={
                  "/" +
                  "rook" +
                  (turn === Color.black ? Color.white : Color.black).charAt(0).toUpperCase() +
                  (turn === Color.black ? Color.white : Color.black).slice(1) +
                  ".png"
                }
                alt=""
                width={150}
                height={150}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Singleplayer;

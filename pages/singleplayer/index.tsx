/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextPage } from "next";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import Square from "../../components/Square";
import { FILE_LETTER, InitialTableState } from "../../utils/constants";
import { Color, ITableState, Piece } from "../../utils/interfaces";
import File from "../../components/File";
import HomeButtonImage from "../../assets/home-button-svgrepo-com.svg";
import Link from "next/link";
import { useSetCheckAndFENHistory, useSetGameState, useSetPositionFromHistory } from "../../utils/hooks";
import {
  containerFunctionChangeTurn,
  containerFunctionHandlePromotingPiece,
  containerFunctionHighlightAttackingSquares,
  containerFunctionHighlightCastlingSquare,
  containerFunctionHighlightEnPassantSquare,
  containerFunctionHighlightSquares,
  containerFunctionMovePieceToSquare,
  containerFunctionRemovePieceFromSquare,
  containerFunctionShowNextPosition,
  containerFunctionShowPreviousPosition,
  containerFunctionUnhighlightAllSquares,
} from "../../utils/tableStateFunctions";
type TEnPassant = string | null;

const Singleplayer: NextPage = () => {
  const [tableState, setTableState] = useState<ITableState>(InitialTableState);
  const [selectedPiece, setSelectedPiece] = useState<ITableState>({});
  const [turn, setTurn] = useState<Color>(Color.white);
  const setGameState = useSetGameState(turn);
  const enPassantSquare = useRef<TEnPassant>(null);
  const [promotingSquare, setPromotingSquare] = useState<string | null>("");
  const setEnPassantSquare = useCallback((square: string | null) => {
    enPassantSquare.current = square;
  }, []);

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

  useSetPositionFromHistory(setTableState, setEnPassantSquare, setTurn, setHalfMoves, setFullMoves, FENHistory, FENHistoryIndex);

  const highlightSquares = containerFunctionHighlightSquares(tableState, setTableState);
  const highlightAttackingSquares = containerFunctionHighlightAttackingSquares(tableState, setTableState);
  const unHilightAllSquares = containerFunctionUnhighlightAllSquares(tableState, setTableState);
  const movePieceToSquare = containerFunctionMovePieceToSquare(setTableState, selectedPiece);
  const highlightCastlingSquare = containerFunctionHighlightCastlingSquare(tableState, setTableState);
  const highlightEnPassantSquare = containerFunctionHighlightEnPassantSquare(tableState, setTableState);
  const removePieceFromSquare = containerFunctionRemovePieceFromSquare(setTableState);
  const handlePromotingPiece = containerFunctionHandlePromotingPiece(turn, promotingSquare, setTableState, setPromotingSquare);
  const changeTurn = containerFunctionChangeTurn(setTurn);
  const showPreviousPosition = containerFunctionShowPreviousPosition(FENHistoryIndex, setFENHistoryIndex);
  const showNextPosition = containerFunctionShowNextPosition(FENHistoryIndex, setFENHistoryIndex, FENHistory.length);

  const functionSetSelectedPiece = (square: ITableState) => {
    setSelectedPiece(square);
  };

  const setPromotingSquareFunction = (square: string | null) => {
    setPromotingSquare(square);
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

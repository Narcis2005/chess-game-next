/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextPage } from "next";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import { Color, ITableState } from "../../utils/interfaces";
import HomeButtonImage from "../../assets/home-button-svgrepo-com.svg";
import Link from "next/link";
import { useSetCheckAndFENHistory, useSetGameState, useSetPositionFromHistory } from "../../utils/hooks";
import {
  containerFunctionChangeTurn,
  containerFunctionHandlePromotingPiece,
  containerFunctionMovePieceToSquare,
} from "../../utils/tableStateFunctions";
import PromotingOverlay from "../../components/PromotingOverlay";
import Table from "../../components/Table";
import { makeTableFromFEN } from "../../utils/generalFunctions";
import { INITIAL_FEN } from "../../utils/constants";
type TEnPassant = string | null;

const Singleplayer: NextPage = () => {
  const [tableState, setTableState] = useState<ITableState>(makeTableFromFEN(INITIAL_FEN));
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
  } = useSetCheckAndFENHistory(tableState, turn, enPassantSquare.current, setGameState, INITIAL_FEN);

  useSetPositionFromHistory(setTableState, setEnPassantSquare, setHalfMoves, setFullMoves, FENHistory, FENHistoryIndex);

  const handlePromotingPiece = containerFunctionHandlePromotingPiece(turn, promotingSquare, setTableState, setPromotingSquare);
  const changeTurn = containerFunctionChangeTurn(setTurn);
  const movePieceToSquare = containerFunctionMovePieceToSquare(setTableState, selectedPiece);

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
        <Table
          tableState={tableState}
          turn={turn}
          enPassantSquare={enPassantSquare.current}
          halfMoves={halfMoves}
          fullMoves={fullMoves}
          setFENHistoryIndex={setFENHistoryIndex}
          FENHistory={FENHistory}
          setSelectedPiece={setSelectedPiece}
          setPromotingSquareFunction={setPromotingSquare}
          isNewestPosition={FENHistoryIndex === FENHistory.length - 1}
          increaseFullMoves={increaseFullMoves}
          increaseHalfMoves={increaseHalfMoves}
          resetHalfMoves={resetHalfMoves}
          setTableState={setTableState}
          setEnPassantSquare={setEnPassantSquare}
          selectedPiece={selectedPiece}
          FENHistoryIndex={FENHistoryIndex}
          changeTurn={changeTurn}
          movePieceToSquare={movePieceToSquare}
        />
      </div>

      {promotingSquare !== "" && <PromotingOverlay turn={turn} handlePromotingPiece={handlePromotingPiece} />}
    </>
  );
};

export default Singleplayer;

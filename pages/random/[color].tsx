/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextPage } from "next";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { InitialTableState } from "../../utils/constants";
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
import { getAllLegalMoves } from "../../utils/generalFunctions";
import { useRouter } from "next/router";

type TEnPassant = string | null;

const Random: NextPage = () => {
  const [tableState, setTableState] = useState<ITableState>(InitialTableState);
  const [selectedPiece, setSelectedPiece] = useState<ITableState>({});
  const [turn, setTurn] = useState<Color>(Color.white);
  const setGameState = useSetGameState(turn);
  const enPassantSquare = useRef<TEnPassant>(null);
  const [promotingSquare, setPromotingSquare] = useState<string | null>("");
  const router = useRouter();
  const { color } = router.query;
  const [colorState, setColorState] = useState<Color>();
  useEffect(() => {
    if (!color) return;
    if (color === "random") {
      if (Math.random() < 0.5) {
        setColorState(Color.white);
      } else {
        setColorState(Color.black);
      }
    } else if (color === "white") {
      setColorState(Color.white);
    } else if (color === "black") {
      setColorState(Color.black);
    }
  }, [color]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

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
  const changeTurn = containerFunctionChangeTurn(setTurn);

  useSetPositionFromHistory(setTableState, setEnPassantSquare, setHalfMoves, setFullMoves, FENHistory, FENHistoryIndex);
  const movePieceToSquare = containerFunctionMovePieceToSquare(setTableState, selectedPiece);
  useEffect(() => {
    if (colorState != null && turn !== colorState && FENHistory.length - 1 === FENHistoryIndex) {
      const allMoves = getAllLegalMoves({ color: turn, table: tableState, enPassantSquare: enPassantSquare.current });
      if (!allMoves) return;
      const randomIndex = Math.floor(Math.random() * allMoves.length);
      if (!allMoves[randomIndex]) return;
      const piece = tableState[allMoves[randomIndex].initialSquare];
      movePieceToSquare(allMoves[randomIndex].targetSquare, {
        [allMoves[randomIndex].initialSquare]: { ...piece },
      });
      changeTurn();
    }
  }, [turn, colorState, FENHistoryIndex, FENHistory.length, tableState, movePieceToSquare, changeTurn]);

  const handlePromotingPiece = containerFunctionHandlePromotingPiece(turn, promotingSquare, setTableState, setPromotingSquare);

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
          colorState={colorState}
        />
      </div>

      {promotingSquare !== "" && <PromotingOverlay turn={turn} handlePromotingPiece={handlePromotingPiece} />}
    </>
  );
};

export default Random;

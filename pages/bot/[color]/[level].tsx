/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextPage } from "next";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { InitialTableState } from "../../../utils/constants";
import { Color, ITableState, Piece } from "../../../utils/interfaces";
import HomeButtonImage from "../../../assets/home-button-svgrepo-com.svg";
import Link from "next/link";
import { useSetCheckAndFENHistory, useSetGameState, useSetPositionFromHistory } from "../../../utils/hooks";
import {
  containerFunctionChangeTurn,
  containerFunctionHandlePromotingPiece,
  containerFunctionMovePieceToSquare,
} from "../../../utils/tableStateFunctions";
import PromotingOverlay from "../../../components/PromotingOverlay";
import Table from "../../../components/Table";
import { useRouter } from "next/router";
import { makeKingCastlingMove, makeQueenCastlingMove } from "../../../utils/generalFunctions";

type TEnPassant = string | null;

const Bot: NextPage = () => {
  const [tableState, setTableState] = useState<ITableState>(InitialTableState);
  const [selectedPiece, setSelectedPiece] = useState<ITableState>({});
  const [turn, setTurn] = useState<Color>(Color.white);
  const setGameState = useSetGameState(turn);
  const enPassantSquare = useRef<TEnPassant>(null);
  const [promotingSquare, setPromotingSquare] = useState<string | null>("");
  const router = useRouter();
  const { level, color } = router.query;
  const [levelState, setLevelState] = useState<number>();
  useEffect(() => {
    if (!level) return;
    if (!color) return;

    if (Number(level) !== Math.floor(Number(level))) return;
    if (Number(level) < 1 || Number(level) > 10) return;
    setLevelState(Number(level));
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
  }, [level, color]);
  const [colorState, setColorState] = useState<Color>();

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
    if (
      colorState != null &&
      turn !== colorState &&
      FENHistory.length - 1 === FENHistoryIndex &&
      (promotingSquare === "" || promotingSquare === null) &&
      levelState != null
    ) {
      const fetchBestMove = async () => {
        const res = await fetch("/api/stockfish?position=" + FENHistory[FENHistory.length - 1] + "&level=" + levelState * 2);
        const data = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        if (data.bestMove) return data.bestMove;
      };
      fetchBestMove()
        .then((data: string) => {
          const initialSquare = data.slice(0, 2);
          const destinationSquare = data.slice(2, 4);
          const piece = tableState[initialSquare];
          //Check for castling
          let isCastlingMove = false;
          if (piece.type === Piece.king) {
            if (initialSquare === "e1" && piece.color === Color.white) {
              if (destinationSquare === "g1") {
                makeKingCastlingMove(movePieceToSquare, "g1", 7, 1, tableState, turn);
                isCastlingMove = true;
              } else if (destinationSquare === "c1") {
                makeQueenCastlingMove(movePieceToSquare, "c1", 3, 1, tableState, turn);
                isCastlingMove = true;
              }
            } else if (initialSquare === "e8" && piece.color === Color.black) {
              if (destinationSquare === "g8") {
                makeKingCastlingMove(movePieceToSquare, "g8", 7, 8, tableState, turn);
                isCastlingMove = true;
              } else if (destinationSquare === "c8") {
                makeQueenCastlingMove(movePieceToSquare, "c8", 3, 8, tableState, turn);
                isCastlingMove = true;
              }
            }
          }
          if (!isCastlingMove) {
            console.log(isCastlingMove);
            movePieceToSquare(destinationSquare, {
              [initialSquare]: { ...piece },
            });
          }
          //Check for en passant
          //handle promoting
        })
        .catch((err) => {
          console.log(err);
        });
      changeTurn();
    }
  }, [
    turn,
    colorState,
    FENHistoryIndex,
    FENHistory.length,
    levelState,
    promotingSquare,
    FENHistory,
    tableState,
    movePieceToSquare,
    changeTurn,
  ]);

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

export default Bot;

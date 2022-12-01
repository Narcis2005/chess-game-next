import type { NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Square from "../components/Square";
import "../styles/home.module.css";
import { createSquare, FILE_LETTER, InitialTableState } from "../utils/constants";
import { Color, IMove, ITableState, Piece } from "../utils/interfaces";
import File from "../components/File";
import { checkIfCheck, getAllLegalMoves, makeTableFromFEN } from "../utils/generalFunctions";
type TGameState = "playing" | "checkmate" | "draw";
type TEnPassant = string | null;
// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const Home: NextPage = () => {
  const [tableState, setTableState] = useState<ITableState>(InitialTableState);
  const [selectedPiece, setSelectedPiece] = useState<ITableState>({});
  const [turn, setTurn] = useState<Color>(Color.white);
  const isCheck = useRef(false);
  const [gameState, setGameState] = useState<TGameState>("playing");
  const fullMoves = useRef(1);
  const halfMoves = useRef(0);
  const enPassantSquare = useRef<TEnPassant>(null);
  const [promotingSquare, setPromotingSquare] = useState<string | null>("");
  const highlightSquares = (squares: IMove[] | null) => {
    if (squares === null) return;
    const highlitedSquares: ITableState = {};
    for (const i of squares) {
      highlitedSquares[i.targetSquare] = { ...tableState[i.targetSquare], isHighlighted: true };
    }
    setTableState((oldTable) => {
      return { ...oldTable, ...highlitedSquares };
    });
  };
  useEffect(() => {
    if (gameState === "checkmate" && turn === Color.white) {
      alert("black won!");
    } else if (gameState === "checkmate" && turn === Color.black) {
      alert("white won");
    } else if (gameState === "draw") {
      alert("draw");
    }
  }, [gameState, turn]);

  useEffect(() => {
    const setCheck = () => {
      if (checkIfCheck({ table: tableState, color: turn, enPassantSquare: enPassantSquare.current })) isCheck.current = true;
      const allLegalMoves = getAllLegalMoves({
        table: tableState,
        color: turn,
        enPassantSquare: enPassantSquare.current,
      });
      if (allLegalMoves && allLegalMoves?.length > 0) return;
      if (isCheck.current) setGameState("checkmate");
      else setGameState("draw");
    };
    setCheck();
  }, [tableState, turn]);
  // useEffect(() => {
  //   let table = { ...tableState };
  //   const movePieceToSquareLocal = (square: string, pieceToMove: ITableState) => {
  //     const emptySquare = createSquare({ color: null, type: null });
  //     const newSquare = {
  //       ...pieceToMove[Object.keys(pieceToMove)[0]],
  //       hasMoved: true,
  //     };

  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     table[Object.keys(pieceToMove)[0]] = { ...emptySquare };
  //     table[square] = { ...newSquare };
  //   };
  //   const makeAllMoves = async (depth: number, color: Color) => {
  //     if (depth === 0) return 1;
  //     const allLegalMoves = getAllLegalMoves({ color: color, table: table, enPassantSquare: enPassantSquare.current });
  //     let numberOfCombinations = 0;
  //     const oppositeColor = color === Color.black ? Color.white : Color.black;
  //     // eslint-disable-next-line @typescript-eslint/no-misused-promises
  //     if (allLegalMoves?.length)
  //       for (let i = 0; i < allLegalMoves?.length; i++) {
  //         const piece = table[allLegalMoves[i].initialSquare];
  //         const tableBeforeMove = { ...table };
  //         movePieceToSquareLocal(allLegalMoves[i].targetSquare, {
  //           [allLegalMoves[i].initialSquare]: piece,
  //         });
  //         // setTableState({ ...table });
  //         numberOfCombinations += await makeAllMoves(depth - 1, oppositeColor);
  //         table = { ...tableBeforeMove };
  //         // setTableState({ ...table });
  //       }

  //     return numberOfCombinations;
  //   };
  //   console.time("function");
  //   makeAllMoves(4, Color.white)
  //     .then((data) => {
  //       // console.log(data);
  //       console.timeEnd("function");
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
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
  const setEnPassantSquare = (square: string | null) => {
    enPassantSquare.current = square;
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
  const increaseFullMoves = () => {
    fullMoves.current++;
  };
  const increaseHalfMoves = () => {
    halfMoves.current++;
  };
  const resetHalfMoves = () => {
    halfMoves.current = 0;
  };
  const initializePositionFromFEN = (FEN: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tablePositions, turn, castlingRights, enPassant, halfMovesFromFEN, fullMovesFromFEN] = FEN.split(" ");
    setTableState(makeTableFromFEN(FEN));
    if (turn === "b") setTurn(Color.black);
    else setTurn(Color.white);
    if (enPassant === "-") setEnPassantSquare(null);
    else setEnPassantSquare(enPassant);
    halfMoves.current = +halfMovesFromFEN;
    fullMoves.current = +fullMovesFromFEN;
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
  return (
    <>
      <div className="container">
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
                        halfMoves: halfMoves.current,
                        fullMoves: fullMoves.current,
                        setPromotingSquareFunction,
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
      <button onClick={() => initializePositionFromFEN("8/bQ3K1p/P5P1/1R2P2p/8/p5r1/2P1k3/B3R1q1 b - - 1 1")}>Change Position</button>
    </>
  );
};

export default Home;

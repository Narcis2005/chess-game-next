import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Square from "../components/Square";
import "../styles/home.module.css";
import { createSquare, FILE_LETTER, InitialTableState } from "../utils/constants";
import { Color, ITableState } from "../utils/interfaces";
import File from "../components/File";
import { checkIfCheck, getAllLegalMoves } from "../utils/generalFunctions";
type TGameState = "playing" | "checkmate" | "draw";
type TEnPassant = string | null;
const Home: NextPage = () => {
  const [tableState, setTableState] = useState<ITableState>(InitialTableState);
  const [selectedPiece, setSelectedPiece] = useState<ITableState>({});
  const [turn, setTurn] = useState<Color>(Color.white);
  const isCheck = useRef(false);
  const [gameState, setGameState] = useState<TGameState>("playing");
  const enPassantSquare = useRef<TEnPassant>(null);
  const highlightSquares = (squares: string[] | null) => {
    if (squares === null) return;
    const highlitedSquares: ITableState = {};
    for (const i of squares) {
      highlitedSquares[i] = { ...tableState[i], isHighlighted: true };
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

  const highlightAttackingSquares = (squares: string[] | null) => {
    if (squares === null) return;
    const attackHighlitedSquares: ITableState = {};
    for (const i of squares) {
      attackHighlitedSquares[i] = { ...tableState[i], isAttacked: true };
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
  const highlightEnPassantSquare = (squares: string[]) => {
    const castlingSquares: ITableState = {};
    for (const i of squares) {
      castlingSquares[i] = { ...tableState[i], isEnPassantMovingSquare: true };
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
    </>
  );
};

export default Home;

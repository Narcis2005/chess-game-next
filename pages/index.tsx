import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import Square from "../components/Square";
import "../styles/home.module.css";
import { FILE_LETTER, InitialTableState } from "../utils/constants";
import { Color, ITableState } from "../utils/interfaces";
import File from "../components/File";
import { checkIfCheck, getAllLegalMoves } from "../utils/generalFunctions";
type TGameState = "playing" | "checkmate" | "draw";
const Home: NextPage = () => {
  const [tableState, setTableState] = useState<ITableState>(InitialTableState);
  const [selectedPiece, setSelectedPiece] = useState<ITableState>({});
  const [turn, setTurn] = useState<Color>(Color.white);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCheck, setIsCheck] = useState(false);
  const [gameState, setGameState] = useState<TGameState>("playing");
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
      let check = false;
      if (checkIfCheck({ table: tableState, color: turn })) check = true;
      setIsCheck(check);
      const checkGameState = (check: boolean) => {
        const allLegalMoves = getAllLegalMoves({ table: tableState, color: turn });
        if (allLegalMoves && allLegalMoves?.length > 0) return;
        if (check) setGameState("checkmate");
        else setGameState("draw");
      };
      checkGameState(check);
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
      newState[i] = { ...tableState[i], isHighlighted: false, isAttacked: false };
    }
    setTableState(newState);
  };

  const movePieceToSquare = (square: string) => {
    const emptySquare = {
      [Object.keys(selectedPiece)[0]]: {
        piece: null,
        type: null,
        isHighlighted: false,
        isAttacked: false,
        color: null,
      },
    };
    const newSquare = {
      [square]: {
        ...selectedPiece[Object.keys(selectedPiece)[0]],
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
                      }}
                    >
                      {tableState[letter + (8 - squareIndex)].piece !== null ? (
                        <Image
                          src={"/" + tableState[letter + (8 - squareIndex)].piece + ".png"}
                          alt=""
                          width={80}
                          height={80}
                        />
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

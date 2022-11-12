import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import Square from "../components/Square";
import "../styles/home.module.css";
import { FILE_LETTER, InitialTableState } from "../utils/constants";
import { Color, ITableState, Piece } from "../utils/interfaces";
import File from "../components/File";
import { checkIfCheck, getAllAttackingMoves } from "../utils/generalFunctions";
const Home: NextPage = () => {
  const [tableState, setTableState] = useState<ITableState>(InitialTableState);
  const [selectedPiece, setSelectedPiece] = useState<ITableState>({});
  const [turn, setTurn] = useState<Color>(Color.white);
  const [isCheck, setIsCheck] = useState(false);
  const highlightSquares = (squares: string[] | null) => {
    if (squares === null) return;
    const highlitedSquares: ITableState = {};
    for (let i of squares) {
      highlitedSquares[i] = { ...tableState[i], isHighlighted: true };
    }
    setTableState((oldTable) => {
      return { ...oldTable, ...highlitedSquares };
    });
  };

  useEffect(() => {
    setCheck();
  }, [turn]);

  const setCheck = () => {
    if (checkIfCheck({ table: tableState, color: turn })) setIsCheck(true);
    else setIsCheck(false);
  };
  const highlightAttackingSquares = (squares: string[] | null) => {
    if (squares === null) return;
    const attackHighlitedSquares: ITableState = {};
    for (let i of squares) {
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
    for (let i in tableState) {
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
                      file={letter}
                      YCoordonate={fileIndex + 1}
                      XCoordonate={squareIndex + 1}
                      isHighlited={tableState[letter + (8 - squareIndex)].isHighlighted}
                      isAttacked={tableState[letter + (8 - squareIndex)].isAttacked}
                      onClickSquareProps={{
                        movePieceToSquare: movePieceToSquare,
                        square: { [letter + (8 - squareIndex)]: tableState[letter + (8 - squareIndex)] },
                        table: tableState,
                        setSelectedPiece: functionSetSelectedPiece,
                        selectedPiece: selectedPiece,
                        highlightSquares: highlightSquares,
                        unHilightAllSquares: unHilightAllSquares,
                        turn: turn,
                        changeTurn: changeTurn,
                        highlightAttackingSquares: highlightAttackingSquares,
                        isCheck: isCheck,
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

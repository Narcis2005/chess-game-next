import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import Square from "../components/Square";
import "../styles/home.module.css";
import { FILE_LETTER, InitialTableState } from "../utils/constants";
import { ITableState, ITurnState } from "../utils/interfaces";
import File from "../components/File";
const Home: NextPage = () => {
  const [tableState, setTableState] = useState<ITableState>(InitialTableState);
  const [selectedPiece, setSelectedPiece] = useState<ITableState>({});
  const [turn, setTurn] = useState<ITurnState>("white");

  const highliteSquares = ({ squares }: { squares: string[] }) => {
    const highlitedSquares: ITableState = {};
    for (let i of squares) {
      highlitedSquares[i] = { ...tableState[i], highlighted: true };
    }
    setTableState((oldTable) => {
      return { ...oldTable, ...highlitedSquares };
    });
  };

  const functionSetSelectedPiece = (square: ITableState) => {
    setSelectedPiece(square);
  };

  const unhilightAllSquares = () => {
    const newState: ITableState = {};
    for (let i in tableState) {
      newState[i] = { ...tableState[i], highlighted: false };
    }
    setTableState(newState);
  };

  const movePieceToSquare = (square: string) => {
    const emptySquare = {
      [Object.keys(selectedPiece)[0]]: {
        piece: null,
        type: null,
        highlighted: false,
        canBeAttacked: false,
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
      return oldTurn === "black" ? "white" : "black";
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
                      isHighlited={tableState[letter + (8 - squareIndex)].highlighted}
                      onClickSquareProps={{
                        movePieceToSquare: movePieceToSquare,
                        square: { [letter + (8 - squareIndex)]: tableState[letter + (8 - squareIndex)] },
                        table: tableState,
                        setSelectedPiece: functionSetSelectedPiece,
                        selectedPiece: selectedPiece,
                        highliteSquares: highliteSquares,
                        unhilightAllSquares: unhilightAllSquares,
                        turn: turn,
                        changeTurn: changeTurn,
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

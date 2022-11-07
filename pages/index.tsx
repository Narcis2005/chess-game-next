import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import "../styles/home.module.css";
interface ITableState {
  [key: string]: {
    piece: string | null;
    type: "rook" | "pawn" | "queen" | "bishop" | "king" | "knight" | null;
    highlighted: boolean;
    canBeAttacked: boolean;
    color: "white" | "black" | null;
  };
}
const Home: NextPage = () => {
  const FILE_LETTER = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const [tableState, setTableState] = useState<ITableState>({
    a1: { piece: "rookWhite", type: "rook", highlighted: false, canBeAttacked: false, color: "white" },
    a2: { piece: "pawnWhite", type: "pawn", highlighted: false, canBeAttacked: false, color: "white" },
    a3: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    a4: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    a5: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    a6: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    a7: { piece: "pawnBlack", type: "pawn", highlighted: false, canBeAttacked: false, color: "black" },
    a8: { piece: "rookBlack", type: "rook", highlighted: false, canBeAttacked: false, color: "black" },
    b1: { piece: "knightWhite", type: "knight", highlighted: false, canBeAttacked: false, color: "white" },
    b2: { piece: "pawnWhite", type: "pawn", highlighted: false, canBeAttacked: false, color: "white" },
    b3: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    b4: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    b5: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    b6: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    b7: { piece: "pawnBlack", type: "pawn", highlighted: false, canBeAttacked: false, color: "black" },
    b8: { piece: "knightBlack", type: "knight", highlighted: false, canBeAttacked: false, color: "black" },
    c1: { piece: "bishopWhite", type: "bishop", highlighted: false, canBeAttacked: false, color: "white" },
    c2: { piece: "pawnWhite", type: "pawn", highlighted: false, canBeAttacked: false, color: "white" },
    c3: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    c4: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    c5: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    c6: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    c7: { piece: "pawnBlack", type: "pawn", highlighted: false, canBeAttacked: false, color: "black" },
    c8: { piece: "bishopBlack", type: "bishop", highlighted: false, canBeAttacked: false, color: "black" },
    d1: { piece: "queenWhite", type: "queen", highlighted: false, canBeAttacked: false, color: "white" },
    d2: { piece: "pawnWhite", type: "pawn", highlighted: false, canBeAttacked: false, color: "white" },
    d3: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    d4: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    d5: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    d6: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    d7: { piece: "pawnBlack", type: "pawn", highlighted: false, canBeAttacked: false, color: "black" },
    d8: { piece: "queenBlack", type: "queen", highlighted: false, canBeAttacked: false, color: "black" },
    e1: { piece: "kingWhite", type: "king", highlighted: false, canBeAttacked: false, color: "white" },
    e2: { piece: "pawnWhite", type: "pawn", highlighted: false, canBeAttacked: false, color: "white" },
    e3: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    e4: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    e5: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    e6: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    e7: { piece: "pawnBlack", type: "pawn", highlighted: false, canBeAttacked: false, color: "black" },
    e8: { piece: "kingBlack", type: "king", highlighted: false, canBeAttacked: false, color: "black" },
    f1: { piece: "bishopWhite", type: "bishop", highlighted: false, canBeAttacked: false, color: "white" },
    f2: { piece: "pawnWhite", type: "pawn", highlighted: false, canBeAttacked: false, color: "white" },
    f3: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    f4: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    f5: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    f6: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    f7: { piece: "pawnBlack", type: "pawn", highlighted: false, canBeAttacked: false, color: "black" },
    f8: { piece: "bishopBlack", type: "bishop", highlighted: false, canBeAttacked: false, color: "black" },
    g1: { piece: "knightWhite", type: "knight", highlighted: false, canBeAttacked: false, color: "white" },
    g2: { piece: "pawnWhite", type: "pawn", highlighted: false, canBeAttacked: false, color: "white" },
    g3: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    g4: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    g5: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    g6: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    g7: { piece: "pawnBlack", type: "pawn", highlighted: false, canBeAttacked: false, color: "black" },
    g8: { piece: "knightBlack", type: "knight", highlighted: false, canBeAttacked: false, color: "black" },
    h1: { piece: "rookWhite", type: "rook", highlighted: false, canBeAttacked: false, color: "white" },
    h2: { piece: "pawnWhite", type: "pawn", highlighted: false, canBeAttacked: false, color: "white" },
    h3: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    h4: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    h5: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    h6: { piece: null, type: null, highlighted: false, canBeAttacked: false, color: null },
    h7: { piece: "pawnBlack", type: "pawn", highlighted: false, canBeAttacked: false, color: "black" },
    h8: { piece: "rookBlack", type: "rook", highlighted: false, canBeAttacked: false, color: "black" },
  });
  const [selectedPiece, setSelectedPiece] = useState<ITableState>({});
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
  return (
    <>
      <div className="container">
        <div className="table">
          {FILE_LETTER.map((letter, fileIndex) => {
            return (
              <File>
                {new Array(8).fill(0).map((_, squareIndex) => {
                  return (
                    <Square
                      file={letter}
                      YCoordonate={fileIndex + 1}
                      XCoordonate={squareIndex + 1}
                      piece={tableState[letter + (8 - squareIndex)].type}
                      onClick={onClickSquare}
                      state={tableState}
                      square={{ [letter + (8 - squareIndex)]: tableState[letter + (8 - squareIndex)] }}
                      unhilightAllSquares={unhilightAllSquares}
                      highliteSquares={highliteSquares}
                      isHighlited={tableState[letter + (8 - squareIndex)].highlighted}
                      setSelectedPiece={functionSetSelectedPiece}
                      selectedPiece={selectedPiece}
                      movePieceToSquare={movePieceToSquare}
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
interface IOnClickSquare {
  square: ITableState;
  table: ITableState;
  highliteSquares: ({ squares }: { squares: string[] }) => void;
  unhilightAllSquares: () => void;
  setSelectedPiece: (square: ITableState) => void;
  selectedPiece: ITableState;
  movePieceToSquare: (square: string) => void;
}
const onClickSquare = ({
  square,
  table,
  highliteSquares,
  unhilightAllSquares,
  setSelectedPiece,
  selectedPiece,
  movePieceToSquare,
}: IOnClickSquare) => {
  unhilightAllSquares();
  if (square[Object.keys(square)[0]].highlighted && square[Object.keys(square)[0]].piece === null) {
    movePieceToSquare(Object.keys(square)[0]);
    return;
  }
  if (square[Object.keys(square)[0]].type === "pawn") {
    setSelectedPiece(square);
    const PAWN_STARTING_POSITIONS = [
      "a2",
      "a7",
      "b2",
      "b7",
      "c2",
      "c7",
      "d2",
      "d7",
      "e2",
      "e7",
      "f2",
      "f7",
      "g2",
      "g7",
      "h2",
      "h7",
    ];
    const file = Object.keys(square)[0].split("")[0];
    const row = +Object.keys(square)[0].split("")[1];
    if (PAWN_STARTING_POSITIONS.includes(Object.keys(square)[0])) {
      if (square[Object.keys(square)[0]].color === "white") {
        if (table[file + (row + 2)].type === null) {
          if (table[file + (row + 1)].type === null) {
            highliteSquares({ squares: [file + (row + 1), file + (row + 2)] });
          }
        } else {
          highliteSquares({ squares: [file + (row + 1)] });
        }
      } else {
        if (table[file + (row - 2)].type === null) {
          if (table[file + (row - 1)].type === null) {
            highliteSquares({ squares: [file + (row - 1), file + (row - 2)] });
          }
        } else {
          highliteSquares({ squares: [file + (row - 1)] });
        }
      }
    } else {
      if (square[Object.keys(square)[0]].color === "white") {
        if (table[file + (row + 1)].type === null) {
          highliteSquares({ squares: [file + (row + 1)] });
        }
      } else {
        if (table[file + (row - 1)].type === null) {
          highliteSquares({ squares: [file + (row - 1)] });
        }
      }
    }
  }
};
const File = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="file">{children}</div>
    </>
  );
};
interface ISquareComponent {
  file: string;
  YCoordonate: number;
  XCoordonate: number;
  children?: React.ReactNode;
  piece: string | null;
  onClick: ({ square, table }: IOnClickSquare) => void;
  square: ITableState;
  state: ITableState;
  highliteSquares: ({ squares }: { squares: string[] }) => void;
  unhilightAllSquares: () => void;
  isHighlited: boolean;
  setSelectedPiece: (square: ITableState) => void;
  selectedPiece: ITableState;
  movePieceToSquare: (square: string) => void;
}
const Square = ({
  file,
  YCoordonate,
  XCoordonate,
  children,
  piece,
  onClick,
  square,
  state,
  highliteSquares,
  unhilightAllSquares,
  isHighlited,
  setSelectedPiece,
  selectedPiece,
  movePieceToSquare,
}: ISquareComponent) => {
  return (
    <>
      <div
        className={`square ${(YCoordonate + XCoordonate) % 2 === 0 ? "white" : "black"} ${
          isHighlited ? "highlight" : ""
        } `}
        onClick={() =>
          onClick({
            movePieceToSquare,
            selectedPiece,
            square,
            table: state,
            highliteSquares,
            unhilightAllSquares,
            setSelectedPiece,
          })
        }
      >
        {children}
      </div>
    </>
  );
};
export default Home;

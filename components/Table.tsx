import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FILE_LETTER } from "../utils/constants";
import { createFENFromTable } from "../utils/generalFunctions";
import { Color, ITableState } from "../utils/interfaces";
import Square from "./Square";
import File from "./File";
import Image from "next/image";
import {
  containerFunctionShowPreviousPosition,
  containerFunctionShowNextPosition,
  containerFunctionHighlightAttackingSquares,
  containerFunctionHighlightCastlingSquare,
  containerFunctionHighlightEnPassantSquare,
  containerFunctionHighlightSquares,
  containerFunctionRemovePieceFromSquare,
  containerFunctionUnhighlightAllSquares,
} from "../utils/tableStateFunctions";

interface ITableComponent {
  tableState: ITableState;
  turn: Color;
  enPassantSquare: string | null;
  halfMoves: number;
  fullMoves: number;
  setFENHistoryIndex: Dispatch<SetStateAction<number>>;
  FENHistory: string[];
  setSelectedPiece: (square: ITableState) => void;
  setPromotingSquareFunction: (square: string | null) => void;
  isNewestPosition: boolean;
  increaseHalfMoves: () => void;
  increaseFullMoves: () => void;
  resetHalfMoves: () => void;
  changeTurn: () => void;
  selectedPiece: ITableState;
  setEnPassantSquare: (square: string | null) => void;
  FENHistoryIndex: number;
  setTableState: Dispatch<SetStateAction<ITableState>>;
  movePieceToSquare: (square: string, pieceToMove?: ITableState) => void;
  isTableRotatedProps?: boolean;
  colorState?: Color;
}
const TableComponent = ({
  tableState,
  resetHalfMoves,
  increaseFullMoves,
  changeTurn,
  increaseHalfMoves,
  isNewestPosition,
  setPromotingSquareFunction,
  setSelectedPiece,
  turn,
  enPassantSquare,
  halfMoves,
  fullMoves,
  setFENHistoryIndex,
  FENHistory,
  selectedPiece,
  setEnPassantSquare,
  FENHistoryIndex,
  setTableState,
  movePieceToSquare,
  colorState,
}: ITableComponent) => {
  const [buttonFEN, setButtonFEN] = useState("");
  const [isTableRotated, setIsTableRotated] = useState<boolean>(colorState === turn);
  useEffect(() => {
    setIsTableRotated(colorState === Color.black);
  }, [colorState]);
  const copyFENToClipboard = async () => {
    const FEN = createFENFromTable(tableState, turn, enPassantSquare, halfMoves, fullMoves);
    setButtonFEN(FEN);
    await navigator.clipboard.writeText(FEN);
    setTimeout(() => {
      setButtonFEN("");
    }, 10000);
  };

  const closeFENContainer = (e: React.MouseEvent) => {
    e.preventDefault();
    setButtonFEN("");
  };
  const setCurrentPosition = (e: React.MouseEvent) => {
    e.preventDefault();
    setFENHistoryIndex(FENHistory.length - 1);
  };
  const rotateBoard = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTableRotated((prevState) => {
      if (!prevState) {
        return true;
      } else return false;
    });
  };
  const showPreviousPosition = containerFunctionShowPreviousPosition(FENHistoryIndex, setFENHistoryIndex);
  const showNextPosition = containerFunctionShowNextPosition(FENHistoryIndex, setFENHistoryIndex, FENHistory.length);
  const highlightSquares = containerFunctionHighlightSquares(tableState, setTableState);
  const highlightAttackingSquares = containerFunctionHighlightAttackingSquares(tableState, setTableState);
  const unHilightAllSquares = containerFunctionUnhighlightAllSquares(tableState, setTableState);
  const highlightCastlingSquare = containerFunctionHighlightCastlingSquare(tableState, setTableState);
  const highlightEnPassantSquare = containerFunctionHighlightEnPassantSquare(tableState, setTableState);
  const removePieceFromSquare = containerFunctionRemovePieceFromSquare(setTableState);
  return (
    <>
      <div className={`table ${isTableRotated ? "rotated" : ""}`}>
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
                    isRotated={isTableRotated}
                    onClickSquareProps={{
                      movePieceToSquare: movePieceToSquare,
                      square: { [letter + (8 - squareIndex)]: tableState[letter + (8 - squareIndex)] },
                      table: tableState,
                      setSelectedPiece: setSelectedPiece,
                      highlightSquares: highlightSquares,
                      unHilightAllSquares: unHilightAllSquares,
                      turn: turn,
                      changeTurn: changeTurn,
                      highlightAttackingSquares: highlightAttackingSquares,
                      selectedPiece,
                      highlightCastlingSquare,
                      enPassantSquare: enPassantSquare,
                      setEnPassantSquare,
                      highlightEnPassantSquare,
                      removePieceFromSquare,
                      increaseFullMoves,
                      increaseHalfMoves,
                      resetHalfMoves,
                      setPromotingSquareFunction,
                      isNewestPosition,
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
        <button onClick={rotateBoard}>Rotate board</button>
        <button onClick={showPreviousPosition}>Before</button>
        <button onClick={showNextPosition}>After</button>
        <button onClick={copyFENToClipboard}>Get FEN</button>
        {FENHistoryIndex !== FENHistory.length - 1 && <button onClick={setCurrentPosition}>Current position</button>}
      </div>
      {buttonFEN !== "" && (
        <div className="full-screen-overlay">
          <div className="fen-container">
            <div>
              <p>Copied to clipboard</p>
              <p>{buttonFEN}</p>
            </div>
            <button onClick={closeFENContainer}>X</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TableComponent;

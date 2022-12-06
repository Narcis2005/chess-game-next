import { useCallback, useEffect, useRef, useState } from "react";
import { createSquare } from "./constants";
import { checkIfCheck, createFENFromTable, getAllLegalMoves, makeTableFromFEN } from "./generalFunctions";
import { Color, ITableState } from "./interfaces";
type TGameState = "playing" | "checkmate" | "draw";
export const useSetGameState = (turn: Color) => {
  const [gameState, setGameState] = useState<TGameState>("playing");

  useEffect(() => {
    if (gameState === "checkmate" && turn === Color.white) {
      alert("black won!");
    } else if (gameState === "checkmate" && turn === Color.black) {
      alert("white won");
    } else if (gameState === "draw") {
      alert("draw");
    }
  }, [gameState, turn]);

  return setGameState;
};

export const useSetCheckAndFENHistory = (
  tableState: ITableState,
  turn: Color,
  enPassantSquare: string | null,
  setGameState: (state: TGameState) => void,
) => {
  const isCheck = useRef(false);
  const FENHistory = useRef<string[]>(["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"]);
  const [FENHistoryIndex, setFENHistoryIndex] = useState(0);
  const fullMoves = useRef(1);
  const halfMoves = useRef(0);
  const increaseFullMoves = useCallback(() => {
    fullMoves.current++;
  }, []);
  const increaseHalfMoves = useCallback(() => {
    halfMoves.current++;
  }, []);
  const setHalfMoves = useCallback((n: number) => {
    halfMoves.current = n;
  }, []);
  const setFullMoves = useCallback((n: number) => {
    fullMoves.current = n;
  }, []);
  const resetHalfMoves = () => {
    halfMoves.current = 0;
  };
  useEffect(() => {
    const setCheck = () => {
      if (checkIfCheck({ table: tableState, color: turn, enPassantSquare: enPassantSquare })) isCheck.current = true;
      const allLegalMoves = getAllLegalMoves({
        table: tableState,
        color: turn,
        enPassantSquare: enPassantSquare,
      });
      if (allLegalMoves && allLegalMoves?.length > 0) return;
      if (isCheck.current) setGameState("checkmate");
      else setGameState("draw");
    };
    setCheck();
    const addFENToHistory = (FEN: string) => {
      FENHistory.current.push(FEN);
      setFENHistoryIndex((lastFENIndex) => lastFENIndex + 1);
    };
    const currentFEN = createFENFromTable(tableState, turn, enPassantSquare, halfMoves.current, fullMoves.current);
    if (FENHistory.current[FENHistoryIndex].split(" ")[0] !== currentFEN.split(" ")[0]) addFENToHistory(currentFEN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enPassantSquare, setGameState, tableState, turn]);

  return {
    ischeck: isCheck.current,
    FENHistory: FENHistory.current,
    FENHistoryIndex,
    fullMoves: fullMoves.current,
    halfMoves: halfMoves.current,
    increaseFullMoves,
    increaseHalfMoves,
    setHalfMoves,
    setFullMoves,
    setFENHistoryIndex,
    resetHalfMoves,
  };
};

export const useSetPositionFromHistory = (
  setTableState: (state: ITableState) => void,
  setEnPassantSquare: (square: string | null) => void,
  setTurn: (turn: Color) => void,
  setHalfMoves: (n: number) => void,
  setFullMoves: (n: number) => void,
  FENHistory: string[],
  FENHistoryIndex: number,
) => {
  useEffect(() => {
    const initializePositionFromFEN = (FEN: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [tablePositions, turn, castlingRights, enPassant, halfMovesFromFEN, fullMovesFromFEN] = FEN.split(" ");
      setTableState(makeTableFromFEN(FEN));
      if (turn === "b") setTurn(Color.black);
      else setTurn(Color.white);
      if (enPassant === "-") setEnPassantSquare(null);
      else setEnPassantSquare(enPassant);
      setHalfMoves(Number(halfMovesFromFEN));
      setFullMoves(Number(fullMovesFromFEN));
    };

    initializePositionFromFEN(FENHistory[FENHistoryIndex]);
  }, [FENHistory, FENHistoryIndex, setEnPassantSquare, setFullMoves, setHalfMoves, setTableState, setTurn]);
};

export const useCheckAllMoves = (tableState: ITableState, enPassantSquare: string) => {
  useEffect(() => {
    let table = { ...tableState };
    const movePieceToSquareLocal = (square: string, pieceToMove: ITableState) => {
      const emptySquare = createSquare({ color: null, type: null });
      const newSquare = {
        ...pieceToMove[Object.keys(pieceToMove)[0]],
        hasMoved: true,
      };
      table[Object.keys(pieceToMove)[0]] = { ...emptySquare };
      table[square] = { ...newSquare };
    };
    const makeAllMoves = async (depth: number, color: Color) => {
      if (depth === 0) return 1;
      const allLegalMoves = getAllLegalMoves({ color: color, table: table, enPassantSquare: enPassantSquare });
      let numberOfCombinations = 0;
      const oppositeColor = color === Color.black ? Color.white : Color.black;
      if (allLegalMoves?.length)
        for (let i = 0; i < allLegalMoves?.length; i++) {
          const piece = table[allLegalMoves[i].initialSquare];
          const tableBeforeMove = { ...table };
          movePieceToSquareLocal(allLegalMoves[i].targetSquare, {
            [allLegalMoves[i].initialSquare]: piece,
          });
          // setTableState({ ...table });
          numberOfCombinations += await makeAllMoves(depth - 1, oppositeColor);
          table = { ...tableBeforeMove };
          // setTableState({ ...table });
        }

      return numberOfCombinations;
    };
    makeAllMoves(4, Color.white)
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

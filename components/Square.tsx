import React from "react";
import { IOnClickSquare } from "../utils/interfaces";
import onClickSquare from "../utils/onClickSquare";
interface ISquareComponent {
  YCoordonate: number;
  XCoordonate: number;
  children?: React.ReactNode;
  isHighlited: boolean;
  onClickSquareProps: IOnClickSquare;
  isAttacked: boolean;
  isCastlingSquare: boolean;
  isEnPassantSquare: boolean;
}
const Square = ({
  YCoordonate,
  XCoordonate,
  children,
  onClickSquareProps,
  isHighlited,
  isAttacked,
  isCastlingSquare,
  isEnPassantSquare,
}: ISquareComponent) => {
  return (
    <>
      <div
        className={`square ${(YCoordonate + XCoordonate) % 2 === 0 ? "white" : "black"} ${isHighlited ? "highlight" : ""} ${
          isAttacked ? "attacked" : ""
        } ${isCastlingSquare ? "highlight" : ""} ${isEnPassantSquare ? "attacked" : ""}`}
        onClick={() =>
          onClickSquare({
            ...onClickSquareProps,
          })
        }
      >
        {children}
      </div>
    </>
  );
};

export default React.memo(Square);

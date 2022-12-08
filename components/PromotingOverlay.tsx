import Image from "next/image";
import React from "react";
import { Color, Piece } from "../utils/interfaces";

interface IPromotingOVerlay {
  turn: Color;
  handlePromotingPiece: (e: React.MouseEvent, piece: Piece) => void;
}
const PromotingOverlay = ({ turn, handlePromotingPiece }: IPromotingOVerlay) => {
  return (
    <>
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
    </>
  );
};

export default PromotingOverlay;

import { IOnClickSquare } from "../utils/interfaces";
import onClickSquare from "../utils/onClickSquare";
interface ISquareComponent {
  YCoordonate: number;
  XCoordonate: number;
  children?: React.ReactNode;
  isHighlited: boolean;
  onClickSquareProps: IOnClickSquare;
  isAttacked: boolean;
}
const Square = ({
  YCoordonate,
  XCoordonate,
  children,
  onClickSquareProps,
  isHighlited,
  isAttacked,
}: ISquareComponent) => {
  return (
    <>
      <div
        className={`square ${(YCoordonate + XCoordonate) % 2 === 0 ? "white" : "black"} ${
          isHighlited ? "highlight" : ""
        } ${isAttacked ? "attacked" : ""}`}
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

export default Square;

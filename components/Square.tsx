import { IOnClickSquare } from "../utils/interfaces";
import onClickSquare from "../utils/onClickSquare";
interface ISquareComponent {
  file: string;
  YCoordonate: number;
  XCoordonate: number;
  children?: React.ReactNode;
  isHighlited: boolean;
  onClickSquareProps: IOnClickSquare;
}
const Square = ({ file, YCoordonate, XCoordonate, children, onClickSquareProps, isHighlited }: ISquareComponent) => {
  return (
    <>
      <div
        className={`square ${(YCoordonate + XCoordonate) % 2 === 0 ? "white" : "black"} ${
          isHighlited ? "highlight" : ""
        } `}
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

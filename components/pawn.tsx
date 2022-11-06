import Image from "next/image";

interface IPawnComponent {
  pieceName: string;
  square: string;
}
const Pawn = ({ pieceName, square }: IPawnComponent) => {
  return <Image src={"/" + pieceName + ".png"} alt="" width={80} height={80} />;
};
export default Pawn;

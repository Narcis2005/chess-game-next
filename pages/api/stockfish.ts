import type { NextApiRequest, NextApiResponse } from "next";
import Stockfish from "stockfish-native";
type Data = {
  bestMove: string;
  level: number;
  depth: number;
  fromPosition: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    query: { position },
  } = req;
  let {
    query: { level, depth },
  } = req;
  if (!position || typeof position !== "string") {
    res.status(401);
    return;
  }
  if (!level) {
    level = "20";
  }
  if (!depth) {
    depth = "15";
  }
  const engine = new Stockfish("./stockfish", { "Skill Level": Number(level) });
  await engine.position({ start: position });
  //After looking into the library code, options are not used :||
  const bestMove = await engine.search({ depth: Number(depth), infinite: false });
  engine.kill();
  res.send({ bestMove: bestMove, depth: Number(depth), level: Number(level), fromPosition: position });
}

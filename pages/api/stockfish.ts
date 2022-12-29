import type { NextApiRequest, NextApiResponse } from "next";
import Stockfish from "stockfish-native";
import PQueue from "p-queue";
type Data = {
  bestMove: string;
  level: number;
  depth: number;
  fromPosition: string;
};
const queue = new PQueue({ concurrency: 4 });
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
  if (level > "20") {
    level = "20";
  }
  if (depth > "23") {
    level = "23";
  }
  const response = await queue.add(async () => {
    const engine = new Stockfish("./stockfish.exe", { "Skill Level": Number(level) });
    await engine.position({ start: position });
    const bestMove = await engine.search({ depth: Number(depth), infinite: false });
    engine.kill();
    const result = { bestMove: bestMove, depth: Number(depth), level: Number(level), fromPosition: position };
    return result;
  });
  res.send(response);
}

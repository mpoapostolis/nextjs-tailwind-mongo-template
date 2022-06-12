import myDb from "../../helpers/mongo";
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { getIdFromToken } from "../../helpers/token";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await myDb();
  const collection = await db.collection("example");
  const tokenId = getIdFromToken(req?.headers?.authorization);
  const id = req.query.id?.toString();

  switch (req.method) {
    case "GET":
      if (!tokenId) return res.status(401).send("Unauthorized");
      const items = await collection
        .find({ items: new ObjectId(id) })
        .toArray();
      return res.status(200).json(items);

    case "POST":
    case "PUT":
    case "DELETE":
      return res.status(405).send("Method not allowed");
  }
};

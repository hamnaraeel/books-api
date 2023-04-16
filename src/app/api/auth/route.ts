import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const KEY = "hgfdhjfjkdsbfjgdsjgfdjhsgffdsfdsfd";
// eslint-disable-next-line import/no-anonymous-default-export
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }

  const clientName = "req.body.clientName";
  const clientEmail = "req.body.clientEmail";
  const query =
    "INSERT INTO api_clients (clientName, clientEmail) VALUES ($1, $2)";
  const values = [clientName, clientEmail];

  res.json({
    token: jwt.sign(
      {
        clientName,
        clientEmail,
      },
      KEY
    ),
  });
}

import { NextApiRequest, NextApiResponse } from "next";
// import jwt from "jsonwebtoken";

const KEY = "hgfdhjfjkdsbfjgdsjgfdjhsgffdsfdsfd";
export default function (req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }
  const { clientName, clientEmail } = req.body;

  //   res.json({
  //     token: jwt.sign(
  //       {
  //         clientName,
  //         clientEmail,
  //       },
  //       KEY
  //     ),
  //   });
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;

  if (req.method === "PUT") {
    let { name, username, jobTitle, email, tel, adress, entered_in } = req.body;

    tel = Number(tel);
    console.log("entered_in value", entered_in);
    if (entered_in !== "web") entered_in = "mobile";

    try {
      await prisma.client.update({
        where: { id: String(id) },
        data: {
          name,
          username,
          jobTitle,
          email,
          tel,
          adress,
        },
      });
      res.status(200).json({ message: "data" }); // this line is must have
    } catch (error) {
      console.log(error);
      console.log("failure");
    }
  }
  if (req.method === "DELETE") {
    try {
      await prisma.client.delete({
        where: { id: String(id) },
      });
      res.status(200).json({ message: "data oye oye" });
      //res.json(post);
    } catch (error) {
      console.log(error);
    }
  }
}

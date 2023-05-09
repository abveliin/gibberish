// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "../../../../lib/prisma";

type Data = {
  name_fr: string;
  name_en: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  //res: NextApiResponse<Data>
) {
  let { name, username, jobTitle, email, tel, adress, entered_in } = req.body;

  //const order: number = 0;
  tel = Number(tel);

  try {
    const newClient = await prisma.client.create({
      data: {
        name,
        username,
        jobTitle,
        email,
        tel,
        adress,
        entered_in,
      },
    });
    res.status(200).json({ message: newClient }); // this line is required in order to refresh the database successfully
  } catch (error) {
    console.log("failure");
    console.log(error);
  }
}

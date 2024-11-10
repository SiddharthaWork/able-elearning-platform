import { NextApiRequest, NextApiResponse } from "next";
import { verifyKhaltiPayment } from "@/lib/verifykhalti";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, amount, courseId, customerId } = req.body;

  const result = await verifyKhaltiPayment(token, amount);

  if (result.success) {
    // Handle success, e.g., update database to mark purchase
    // await prisma.purchase.create({ ... });

    return res.status(200).json({ message: "Payment successful", data: result.data });
  } else {
    return res.status(400).json({ message: result.message, data: result.data });
  }
}

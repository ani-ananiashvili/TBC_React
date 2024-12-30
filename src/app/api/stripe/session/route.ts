import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../../../../lib/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sessionId } = req.query;

  if (req.method === "GET") {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId as string);

      res.status(200).json(session);
    } catch (error) {
      console.error("Error fetching Stripe session:", error);
      res.status(500).json({ error: "Failed to fetch session details." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

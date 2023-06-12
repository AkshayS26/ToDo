import { asyncError, errorHandler } from "@/middlewares/error";
import { cookieSetter } from "@/utils/feature";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET") return errorHandler(res, 400, "only GET method");

  cookieSetter(res, null, false);

  res.status(200).json({
    success: true,
    message: "Logged out succesfully",
  });
});

export default handler;

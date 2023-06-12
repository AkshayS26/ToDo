import { asyncError, errorHandler } from "../../../middlewares/error";

import { checkAuth } from "../../../utils/feature";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET") return errorHandler(res, 401, "only GET method");

  const user = await checkAuth(req);
  {
    /* have not passed (req) so i was getting error  also didnt use await*/
  }
  if (!user) return errorHandler(res, 401, "Login First");
  res.status(200).json({
    success: true,
    user,
  });
});

export default handler;

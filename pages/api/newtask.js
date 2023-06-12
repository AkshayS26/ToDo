import { ConnectDB, checkAuth } from "../../utils/feature";
import { Task } from "../../models/task";
import { asyncError, errorHandler } from "@/middlewares/error";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST") return errorHandler(res, 400, "only post method");

  await ConnectDB();
  const { title, description } = req.body;

  if (!title || !description)
    return errorHandler(res, 400, "please enter all fields");

  const user = await checkAuth(req);

  if (!user) return errorHandler(res, 401, "Login First");

  await Task.create({
    title,
    description,
    user: user._id,
  });
  res.json({
    success: "true",
    message: "Task created",
  });
});

export default handler;

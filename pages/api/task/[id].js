import { ConnectDB, checkAuth } from "../../../utils/feature";
import { Task } from "../../../models/task";
import { asyncError, errorHandler } from "../../../middlewares/error";

const handler = asyncError(async (req, res) => {
  await ConnectDB();
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Login First");

  const taskID = req.query.id;

  const task = await Task.findById(taskID);

  if (!task) return errorHandler(res, 404, "Task not found");

  if (req.method === "PUT") {
    task.isCompleted = !task.isCompleted;
    task.save();

    res.status(200).json({
      success: "true",
      message: "Task updated succesfully",
    });
  } else if (req.method === "DELETE") {
    await task.deleteOne(); //was passing taskID so was getting error

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } else {
    errorHandler(res, 400, "This Method is not allowed");
  }
});

export default handler;

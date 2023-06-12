import { asyncError, errorHandler } from "../../../middlewares/error";
import { User } from "../../../models/user";
import { ConnectDB, cookieSetter, generateToken } from "../../../utils/feature";
import bcrypt from "bcrypt";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST") return errorHandler(res, 400, "only post method");

  const { email, password } = req.body;

  if (!email || !password)
    return errorHandler(res, 400, "Please Enter all fields");

  await ConnectDB();

  const user = await User.findOne({ email }).select("+password");

  if (!user) return errorHandler(res, 400, "Invalid email or password");

  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) return errorHandler(res, 400, "Invalid email or password");

  const token = generateToken(user._id);

  cookieSetter(res, token, true);

  res.status(200).json({
    success: true,
    message: `welcome back ${user.name}`,
    user,
  });
});

export default handler;

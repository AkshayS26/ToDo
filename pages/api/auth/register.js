import { asyncError, errorHandler } from "../../../middlewares/error";
import { User } from "../../../models/user";
import { ConnectDB, cookieSetter, generateToken } from "../../../utils/feature";
import bcrypt from "bcrypt";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST") return errorHandler(res, 400, "only post method");

  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return errorHandler(res, 400, "Please Enter all fields");

  await ConnectDB();

  let user = await User.findOne({ email });

  if (user) return errorHandler(res, 400, "User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashedPassword });

  const token = generateToken(user._id);

  cookieSetter(res, token, true);

  res.status(201).json({
    success: true,
    message: "Registered Successfully",
    user,
  });
});

export default handler;

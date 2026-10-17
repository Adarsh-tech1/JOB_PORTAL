export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  const sanitizedUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Set httpOnly to true
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user: sanitizedUser,
    message,
    token,
  });
};

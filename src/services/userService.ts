import User from '@models/User';

export const getCurrentUserService = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    const err: any = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }
  return user;
};

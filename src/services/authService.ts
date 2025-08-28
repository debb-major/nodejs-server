import User from '@models/User';
import bcrypt from "bcrypt";
import { hashPassword } from '@utils/hashPassword'; 

// business logic for authentication - authControllers use this

export const registerUserService = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  // check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const err: any = new Error("User already exists");
    err.statusCode = 400;
    throw err;
  }

  // hash password
  const hashed = await hashPassword(password);

  // create user
  const newUser = new User({
    firstName,
    lastName,
    email: email.toLowerCase(), // always lowercase
    password: hashed,
  });

  await newUser.save(); // don’t forget to save, otherwise it stays in memory only

  return newUser;
};

export const loginUserService = async (email: string, password: string) => {
  // find user by email
  const user = await User.findOne({ email });
  if (!user) {
    const err: any = new Error("Invalid email or password");
    err.statusCode = 400;
    throw err;
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err: any = new Error("Invalid email or password");
    err.statusCode = 400;
    throw err;
  }

  return user;
};

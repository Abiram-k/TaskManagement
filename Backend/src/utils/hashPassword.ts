import bcrypt from "bcrypt";

export const hashPassword = async (password: string)=> {
  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("Failed to hash password", error);
  }
};

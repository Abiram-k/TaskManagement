import bcrypt from "bcrypt";

export const comparePassword = async (
  enteredPassword: string,
  existingPassword: string
) => {
  try {
    return await bcrypt.compare(enteredPassword, existingPassword);
  } catch (error) {
    console.log("Failed to compare password", error);
  }
};

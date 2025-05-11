import bcrypt from "bcrypt";
export const comparePassword = async (enteredPassword, existingPassword) => {
    try {
        return await bcrypt.compare(enteredPassword, existingPassword);
    }
    catch (error) {
        console.log("Failed to compare password", error);
    }
};

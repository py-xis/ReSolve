import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import zod from 'zod';

export const getUserDetails = async (req, res) => {
    console.log("Inside getUserDetails")
    try {
        const user = req.user;
        const userDetails = {
            name : user.name,
            email : user.email,
            profilePicture : user.picture
        }

        res.status(200).json({"userDetails" : userDetails})
    } catch (error) {
        res.status(500).json({ message: "Error fetching user details", error: error.message });
    }
}
//  Route to Update User (Name and/or Password)
const nameSchema = zod.string().min(3);
const passwordSchema = zod.string().min(6);

export const updateUser = async (req, res) => {
    try {
        const { fullName, passwordd } = req.body;
        const updates = {};

        //  Update fullName if provided
        const name = nameSchema.safeParse(fullName);
        const password = passwordSchema.safeParse(passwordd);

        if (name.success) {
            updates.fullName = name.data;
        }

        //  Update password if provided (hashed for security)
        if (password.success) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(password.data, salt);
        }

        //  Apply updates if any field is present
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update." });
        }

        //  Find and update the user
        const updatedUser = await User.findByIdAndUpdate(
            req.userId, 
            { $set: updates }, 
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user details", error: error.message });
    }
}
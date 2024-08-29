"use server";

import { revalidatePath } from "next/cache";
import connectDB from "../../lib/db";
import UserModel from "../../lib/models/User"; 
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface UserFormData {
  username: string;
  email: string;
  password: string;
  deleted?: boolean;
}

interface LoginFormData {
  email: string;
  password: string;
}

export async function createUser(userData: UserFormData) {
  await connectDB();

  if (!userData.username || !userData.email || !userData.password) {
    return { created: false, error: 'Missing required fields' };
  }

  try {
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      return { created: false, error: 'Email already in use' };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new UserModel({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
    });

    await newUser.save();

    return { created: true, user: newUser };
  } catch (error) {
    console.error('Error creating user:', error);
    return { created: false, error: 'An error occurred while creating the user' };
  }
}

export async function getAllUsers() {
  await connectDB();

  try {
    const users = await UserModel.find({ deleted: false }).exec();
    console.log('Fetched users:', users);

    return { success: true, data: users };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { success: false, error: 'Internal Server Error' };
  }
}

export async function updateUser(userId: string, updates: Partial<UserFormData>) {
  await connectDB(); 

  try {
    const response = await UserModel.findByIdAndUpdate(userId, updates, { new: true });
    console.log('User updated:', response);

    revalidatePath('/user');

    return { updated: true, data: response };
  } catch (error) {
    console.error('Error updating user:', error);
    return { updated: false, error: 'Internal Server Error' };
  }
}

export async function deleteUser(userId: string) {
  await connectDB(); 

  try {
    const response = await UserModel.findByIdAndUpdate(userId, { deleted: true }, { new: true });
    if (!response) {
      return { deleted: false, error: 'User not found' };
    }

    console.log('User soft deleted:', response);

    revalidatePath('/user');

    return { deleted: true, data: response };
  } catch (error) {
    console.error('Error soft deleting user:', error);
    return { deleted: false, error: 'Internal Server Error' };
  }
}
export async function verifyUser(data: LoginFormData) {
  await connectDB();

  try {
    const user = await UserModel.findOne({ email: data.email, deleted: false });
    console.log('User found:', user);

    if (!user) {
      return { verified: false, error: "User not found" };
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    console.log('Password match:', isPasswordMatch);

    if (!isPasswordMatch) {
      return { verified: false, error: "Incorrect password" };
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    return { verified: true, token };
  } catch (error) {
    console.error('Error verifying user:', error);
    if (error instanceof Error) {
      return { verified: false, error: error.message || "An error occurred during login" };
    } else {
      return { verified: false, error: "An unknown error occurred" };
    }
  }
}


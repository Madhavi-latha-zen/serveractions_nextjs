"use server";

import { revalidatePath } from "next/cache";
import connectDB from "../../lib/db";
import StudentModel from "../../lib/models/studentModel";

export async function createStudent(formData: { name: string; email: string; role: 'Student' | 'Teacher' | 'Admin' }) {
  try {
    await connectDB();

    const response = await StudentModel.create(formData);
    console.log('New student created:', response);

    revalidatePath('/student');

    return { created: true, data: response };
  } catch (error) {
    console.error('Error creating student:', error);
    return { created: false, error: 'Internal Server Error' };
  }
}

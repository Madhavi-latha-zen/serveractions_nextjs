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

export async function getAllStudents() {
  try {
    await connectDB();
    const students = await StudentModel.find({ deleted: false }).exec(); 
    console.log('Fetched students:', students);

    return { success: true, data: students };
  } catch (error) {
    console.error('Error fetching students:', error);
    return { success: false, error: 'Internal Server Error' };
  }
}

export async function updateStudent(studentId: string, updates: { name?: string; email?: string; role?: 'Student' | 'Teacher' | 'Admin' }) {
  try {
    await connectDB();

    const response = await StudentModel.findByIdAndUpdate(studentId, updates, { new: true });
    console.log('Student updated:', response);

    revalidatePath('/student');

    return { updated: true, data: response };
  } catch (error) {
    console.error('Error updating student:', error);
    return { updated: false, error: 'Internal Server Error' };
  }
}

export async function deleteStudent(studentId: string) {
  try {
    await connectDB();

    const response = await StudentModel.findByIdAndUpdate(studentId, { deleted: true }, { new: true });
    if (!response) {
      return { deleted: false, error: 'Student not found' };
    }

    console.log('Student soft deleted:', response);

    revalidatePath('/student');

    return { deleted: true, data: response };
  } catch (error) {
    console.error('Error soft deleting student:', error);
    return { deleted: false, error: 'Internal Server Error' };
  }
}

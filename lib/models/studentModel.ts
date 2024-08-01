import mongoose, { Document, Schema } from 'mongoose';

interface Student extends Document {
  name: string;
  email: string;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const StudentModel = mongoose.models.Student || mongoose.model<Student>('Student', StudentSchema);
export default StudentModel;

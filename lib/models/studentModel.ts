import mongoose, { Document, Schema } from 'mongoose';

interface Student extends Document {
  name: string;
  email: string;
  role: string;
  deleted: boolean;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true }, 
  deleted: { type: Boolean, default: false },
});
const StudentModel = mongoose.models.Student || mongoose.model<Student>('Student', StudentSchema);
export default StudentModel;

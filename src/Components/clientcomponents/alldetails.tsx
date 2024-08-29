"use client";

import React, { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateStudent, deleteStudent } from "../../lib/studentAction";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().nonempty("Role is required"),
});

type FormData = z.infer<typeof formSchema>;

interface Student {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AlldetailsProps {
  students: Student[];
}

const Alldetails = ({ students }: AlldetailsProps) => {
  const [studentList, setStudentList] = useState<Student[]>(students);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { theme } = useTheme();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleOpenDialog = (student: Student) => {
    setSelectedStudent(student);
    reset({ name: student.name, email: student.email, role: student.role });
  };

  const handleCloseDialog = () => {
    setSelectedStudent(null);
  };

  const onSubmit = async (data: FormData) => {
    if (selectedStudent) {
      try {
        const result = await updateStudent(selectedStudent._id, data);

        if (result.updated) {
          toast.success('Student details updated successfully', {
            description: `Updated Data:\n\n${JSON.stringify(data, null, 2)}`,
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          setStudentList(prevList => prevList.map(student => student._id === selectedStudent._id ? { ...student, ...data } : student));
          handleCloseDialog();
        } else {
          throw new Error('Failed to update student.');
        }
      } catch (error) {
        console.error('Update error:', error);
        toast.error('Failed to update student.');
      }
    }
  };

  const handleDelete = async (studentId: string) => {
    try {
      const result = await deleteStudent(studentId);

      if (result.deleted) {
        toast.success('Student soft deleted successfully');
        setStudentList(prevList => prevList.filter(student => student._id !== studentId));
      } else {
        throw new Error(result.error || 'Failed to delete student.');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete student.');
    }
  };

  return (
    <div className={`p-5 min-h-screen ${theme === 'dark' ? 'bg-[#0a1d3b]' : 'bg-gray-100'}`}>
      <h1 className={`text-3xl font-bold text-center ${theme === 'dark' ? 'text-[#e0e0e0]' : 'text-[#003366]'} mb-8`}>
        All Student Details
      </h1>
      <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-[#002f6c]' : 'bg-white'}`}>
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`flex items-center p-4 ${theme === 'dark' ? 'bg-[#003366] text-white' : 'bg-[#003366] text-white'} font-medium`}>
            <div className="flex-1">Name</div>
            <div className="flex-1">Email</div>
            <div className="flex-1">Role</div>
            <div className="flex-none">Actions</div>
          </div>
        </div>
        <div>
          {studentList.length > 0 ? (
            studentList.map(student => (
              <div
                key={student._id}
                className={`flex items-center p-4 border-b transition-colors duration-200 
                  ${theme === 'dark' ? 'border-gray-700 hover:bg-[#003366] hover:text-white' : 'border-gray-200 hover:bg-[#e0e0e0] hover:text-black'}
                  ${theme === 'dark' ? 'bg-[#002f6c] text-white' : 'bg-white text-gray-600'}`}
              >
                <div className="flex-1 font-semibold">{student.name}</div>
                <div className="flex-1">{student.email}</div>
                <div className="flex-1">{student.role}</div>
                <div className="flex-none flex space-x-2">
                  <Dialog open={!!selectedStudent} onOpenChange={handleCloseDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => handleOpenDialog(student)}>
                        <Pencil className={`h-4 ${theme === 'dark' ? 'text-[#e0e0e0]' : 'text-[#003366]'}`} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className={`sm:max-w-[425px] ${theme === 'dark' ? 'bg-[#002f6c]' : 'bg-[#e6f0ff]'}`}>
                      <DialogHeader>
                        <DialogTitle>Edit Student</DialogTitle>
                        <DialogDescription>
                          Make changes to the student details here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className={`text-right ${theme === 'dark' ? 'text-[#e0e0e0]' : 'text-[#003366]'}`}>
                            Name
                          </Label>
                          <div className="col-span-3">
                            <Controller
                              control={control}
                              name="name"
                              render={({ field }) => (
                                <Input
                                  id="name"
                                  placeholder="Name"
                                  {...field}
                                  className={`border ${theme === 'dark' ? 'border-[#e0e0e0]' : 'border-[#003366]'}`}
                                />
                              )}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className={`text-right ${theme === 'dark' ? 'text-[#e0e0e0]' : 'text-[#003366]'}`}>
                            Email
                          </Label>
                          <div className="col-span-3">
                            <Controller
                              control={control}
                              name="email"
                              render={({ field }) => (
                                <Input
                                  id="email"
                                  placeholder="Email"
                                  {...field}
                                  className={`border ${theme === 'dark' ? 'border-[#e0e0e0]' : 'border-[#003366]'}`}
                                />
                              )}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className={`text-right ${theme === 'dark' ? 'text-[#e0e0e0]' : 'text-[#003366]'}`}>
                            Role
                          </Label>
                          <div className="col-span-3">
                            <Controller
                              control={control}
                              name="role"
                              render={({ field }) => (
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  disabled={field.disabled}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Roles</SelectLabel>
                                      <SelectItem value="Student">Student</SelectItem>
                                      <SelectItem value="Admin">Admin</SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save Changes</Button>
                          <Button type="button" onClick={handleCloseDialog} variant="outline">
                            Cancel
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(student._id)}
                  >
                    <Trash className={`h-4 ${theme === 'dark' ? 'text-[#e0e0e0]' : 'text-[#d43f30]'}`} />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No students found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alldetails;


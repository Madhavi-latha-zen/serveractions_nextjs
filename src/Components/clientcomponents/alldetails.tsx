// "use client";

// import React, { useState } from "react";
// import { Pencil, Trash } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import { updateStudent, deleteStudent } from "../../lib/studentAction";

// interface Student {
//   _id: string;
//   name: string;
//   email: string;
//   role: any[];
// }

// interface AlldetailsProps {
//   students: Student[];
// }

// const Alldetails = ({ students }: AlldetailsProps) => {
//   const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
//   const [formData, setFormData] = useState<{ name: string; email: string; role:any } | null>(null);

//   const handleOpenDialog = (student: Student) => {
//     setSelectedStudent(student);
//     setFormData({ name: student.name, email: student.email, role: student.role });
//   };

//   const handleCloseDialog = () => {
//     setSelectedStudent(null);
//   };

//   const handleSubmit = async () => {
//     if (selectedStudent && formData) {
//       try {
//         const result = await updateStudent(selectedStudent._id, formData);

//         if (result.updated) {
//           const formattedData = JSON.stringify(formData, null, 2);

//           toast.success('Student details updated successfully', {
//             description: `Updated Data:\n\n${formattedData}`,
//             action: {
//               label: "Undo",
//               onClick: () => console.log("Undo"),
//             },
//           });

//           handleCloseDialog();
//         } else {
//           throw new Error('Failed to update student.');
//         }
//       } catch (error) {
//         console.error('Update error:', error);
//         toast.error('Failed to update student.');
//       }
//     }
//   };

//   const handleDelete = async (studentId: string) => {
//     try {
//       const result = await deleteStudent(studentId);

//       if (result.deleted) {
//         toast.success('Student deleted successfully');
//       } else {
//         throw new Error(result.error || 'Failed to delete student.');
//       }
//     } catch (error) {
//       console.error('Delete error:', error);
//       toast.error('Failed to delete student.');
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Student Details</h1>
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="border-b border-gray-200">
//           <div className="flex items-center p-4 bg-gray-100 text-gray-600 font-medium">
//             <div className="flex-1">Name</div>
//             <div className="flex-1">Email</div>
//             <div className="flex-1">Role</div>
//             <div className="flex-none">Actions</div>
//           </div>
//         </div>
//         <div>
//           {students.map(student => (
//             <div key={student._id} className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
//               <div className="flex-1 font-semibold text-gray-800">{student.name}</div>
//               <div className="flex-1 text-gray-600">{student.email}</div>
//               <div className="flex-1 text-gray-600">{student.role}</div>
//               <div className="flex-none flex space-x-2">
//                 <Dialog>
//                   <DialogTrigger asChild>
//                     <Button variant="outline" onClick={() => handleOpenDialog(student)}>
//                       <Pencil className="h-4 text-[#0444bf]" />
//                     </Button>
//                   </DialogTrigger>
//                   {selectedStudent && (
//                     <DialogContent className="sm:max-w-[425px]">
//                       <DialogHeader>
//                         <DialogTitle>Edit Student</DialogTitle>
//                         <DialogDescription>
//                           Make changes to the student details here. Click save when you're done.
//                         </DialogDescription>
//                       </DialogHeader>
//                       <div className="grid gap-4 py-4">
//                         <div className="grid grid-cols-4 items-center gap-4">
//                           <Label htmlFor="name" className="text-right">
//                             Name
//                           </Label>
//                           <Input
//                             id="name"
//                             value={formData?.name || ''}
//                             onChange={(e) => setFormData(prev => prev ? { ...prev, name: e.target.value } : null)}
//                             className="col-span-3"
//                           />
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                           <Label htmlFor="email" className="text-right">
//                             Email
//                           </Label>
//                           <Input
//                             id="email"
//                             value={formData?.email || ''}
//                             onChange={(e) => setFormData(prev => prev ? { ...prev, email: e.target.value } : null)}
//                             className="col-span-3"
//                           />
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                           <Label htmlFor="role" className="text-right">
//                             Role
//                           </Label>
//                           <Input
//                             id="role"
//                             value={formData?.role || ''}
//                             onChange={(e) => setFormData(prev => prev ? { ...prev, role: e.target.value as 'Student' | 'Teacher' | 'Admin' } : null)}
//                             className="col-span-3"
//                           />
//                         </div>
//                       </div>
//                       <DialogFooter>
//                         <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancel</Button>
//                         <Button type="button" onClick={handleSubmit}>Save</Button>
//                       </DialogFooter>
//                     </DialogContent>
//                   )}
//                 </Dialog>
//                 <Button variant="outline" onClick={() => handleDelete(student._id)}>
//                   <Trash className="h-4 text-red-600" />
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Alldetails;


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

interface Student {
  _id: string;
  name: string;
  email: string;
  role: 'Student' | 'Teacher' | 'Admin';
}

interface AlldetailsProps {
  students: Student[];
}

const Alldetails = ({ students }: AlldetailsProps) => {
  const [studentList, setStudentList] = useState<Student[]>(students);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<{ name: string; email: string; role: 'Student' | 'Teacher' | 'Admin' } | null>(null);

  const handleOpenDialog = (student: Student) => {
    setSelectedStudent(student);
    setFormData({ name: student.name, email: student.email, role: student.role });
  };

  const handleCloseDialog = () => {
    setSelectedStudent(null);
  };

  const handleSubmit = async () => {
    if (selectedStudent && formData) {
      try {
        const result = await updateStudent(selectedStudent._id, formData);

        if (result.updated) {
          const formattedData = JSON.stringify(formData, null, 2);

          toast.success('Student details updated successfully', {
            description: `Updated Data:\n\n${formattedData}`,
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });

          // Update the local student list
          setStudentList(prevList => prevList.map(student => student._id === selectedStudent._id ? { ...student, ...formData } : student));

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
        
        // Update the local student list to remove the deleted student
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Student Details</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex items-center p-4 bg-gray-100 text-gray-600 font-medium">
            <div className="flex-1">Name</div>
            <div className="flex-1">Email</div>
            <div className="flex-1">Role</div>
            <div className="flex-none">Actions</div>
          </div>
        </div>
        <div>
          {studentList.map(student => (
            <div key={student._id} className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex-1 font-semibold text-gray-800">{student.name}</div>
              <div className="flex-1 text-gray-600">{student.email}</div>
              <div className="flex-1 text-gray-600">{student.role}</div>
              <div className="flex-none flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => handleOpenDialog(student)}>
                      <Pencil className="h-4 text-[#0444bf]" />
                    </Button>
                  </DialogTrigger>
                  {selectedStudent && (
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Student</DialogTitle>
                        <DialogDescription>
                          Make changes to the student details here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={formData?.name || ''}
                            onChange={(e) => setFormData(prev => prev ? { ...prev, name: e.target.value } : null)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input
                            id="email"
                            value={formData?.email || ''}
                            onChange={(e) => setFormData(prev => prev ? { ...prev, email: e.target.value } : null)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">
                            Role
                          </Label>
                          <Input
                            id="role"
                            value={formData?.role || ''}
                            onChange={(e) => setFormData(prev => prev ? { ...prev, role: e.target.value as 'Student' | 'Teacher' | 'Admin' } : null)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancel</Button>
                        <Button type="button" onClick={handleSubmit}>Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  )}
                </Dialog>
                <Button variant="outline" onClick={() => handleDelete(student._id)}>
                  <Trash className="h-4 text-red-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alldetails;

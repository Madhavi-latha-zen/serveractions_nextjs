"use client";

import React, { useEffect, useState } from "react";
import { getAllUsers, updateUser, deleteUser } from "@/lib/authAction";
import { User } from "@/types/user";
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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTheme } from "next-themes";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

const ITEMS_PER_PAGE = 5;

const Usermanagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { theme } = useTheme();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const {data:session} =useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getAllUsers();
        if (result.success && Array.isArray(result.data)) {
          setUsers(result.data);
        } else {
          console.error('Failed to fetch users:', result.error ?? 'No data returned');
        }
      } catch (error) {
        console.error('Error in fetching users:', error instanceof Error ? error.message : 'Unknown error');
      }
    };

    fetchUsers();
  }, []);

  const handleOpenDialog = (user: User) => {
    setSelectedUser(user);
    reset({ username: user.username, email: user.email });
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
  };

  const onSubmit = async (data: FormData) => {
    if (selectedUser) {
      try {
        const result = await updateUser(selectedUser._id, data);

        if (result.updated) {
          toast.success('User details updated successfully', {
            description: `Updated Data:\n\n${JSON.stringify(data, null, 2)}`,
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });

          setUsers(prevList =>
            prevList.map(user =>
              user._id === selectedUser._id ? { ...user, ...data } as User : user
            )
          );
          handleCloseDialog();
        } else {
          throw new Error('Failed to update user.');
        }
      } catch (error) {
        console.error('Update error:', error);
        toast.error('Failed to update user.');
      }
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      const result = await deleteUser(userId);

      if (result.deleted) {
        toast.success('User soft deleted successfully');
        setUsers(prevList => prevList.filter(user => user._id !== userId));
      } else {
        throw new Error(result.error ?? 'Failed to delete user.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Delete error:', errorMessage);
      toast.error('Failed to delete user.');
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const paginatedUsers = users.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={`p-6 min-h-screen ${theme === 'dark' ? 'bg-[#0a1d3b]' : 'bg-gray-100'}`}>
      <h1 className={`text-3xl font-bold text-center ${theme === 'dark' ? 'text-[#e0e0e0]' : 'text-[#003366]'} mb-8`}>
        User Management
      </h1>
      <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-[#002f6c]' : 'bg-white'}`}>
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`flex items-center p-4 ${theme === 'dark' ? 'bg-[#003366] text-white' : 'bg-[#003366] text-white'} font-medium`}>
            <div className="flex-1">Username</div>
            <div className="flex-1">Email</div>
            <div className="flex-none">Actions</div>
          </div>
        </div>
        <div>
          {paginatedUsers.map(user => (
            <div
              key={user._id}
              className={`flex items-center p-4 border-b transition-colors duration-200 
                ${theme === 'dark' ? 'border-gray-700 hover:bg-[#003366] hover:text-white' : 'border-gray-200 hover:bg-[#e0e0e0] hover:text-black'} 
                ${theme === 'dark' ? 'bg-[#002f6c] text-white' : 'bg-white text-gray-600'}`}
            >
              <div className="flex-1 font-semibold">{user.username}</div>
              <div className="flex-1">{user.email}</div>
              <div className="flex-none flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => handleOpenDialog(user)}>
                      <Pencil className={`h-4 ${theme === 'dark' ? 'text-[#e0e0e0]' : 'text-[#003366]'}`} />
                    </Button>
                  </DialogTrigger>
                  {selectedUser && (
                    <DialogContent className={`sm:max-w-[425px] ${theme === 'dark' ? 'bg-[#002f6c]' : 'bg-[#e6f0ff]'}`}>
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                          Make changes to the user details here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className={`text-right ${theme === 'dark' ? 'text-[#e0e0e0]' : 'text-[#003366]'}`}>
                            Username
                          </Label>
                          <div className="col-span-3">
                            <Controller
                              control={control}
                              name="username"
                              render={({ field }) => (
                                <Input
                                  id="username"
                                  placeholder="Username"
                                  {...field}
                                  className={`border ${theme === 'dark' ? 'border-[#e0e0e0]' : 'border-[#003366]'}`}
                                />
                              )}
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
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
                        <DialogFooter>
                          <Button type="submit">Save Changes</Button>
                          <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  )}
                </Dialog>
                <Button variant="outline" onClick={() => handleDelete(user._id)}>
                  <Trash className={`h-4 ${theme === 'dark' ? 'text-[#e0e0e0]' : 'text-[#003366]'}`} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className={`flex justify-center p-4 ${theme === 'dark' ? 'bg-[#003366] text-white' : 'bg-[#003366] text-white'}`}>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages).keys()].map(page => (
                <PaginationItem key={page + 1}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(page + 1)}
                    isActive={page + 1 === currentPage}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Usermanagement;








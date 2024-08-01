"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { createStudent } from "../../lib/studentAction";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters long." }), // Updated validation
  email: z.string().email({ message: "Invalid email address." }),
  role: z.enum(['Student', 'Teacher', 'Admin'], { message: "Please select a role." }), // Dropdown field
});

type FormValues = z.infer<typeof formSchema>;

export default function StudentDetailsClient() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const { handleSubmit, reset, formState: { errors } } = form;
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await createStudent(data);

      if (result.created) {
        const formattedData = JSON.stringify({
          name: data.name,
          email: data.email,
          role: data.role,
        }, null, 2);

        toast.success('Data submitted successfully', {
          description: `Submitted Data:\n\n${formattedData}`,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });

        reset();
        router.push('student/alldetails');
      } else {
        throw new Error('Failed to submit data.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to submit data.');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Submit Your Details</h1>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your display name.
                  </FormDescription>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </FormControl>
                  <FormDescription>
                    We'll use this email to contact you.
                  </FormDescription>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="" disabled>Select a role</option>
                      <option value="Student">Student</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </FormControl>
                  <FormDescription>
                    Select your role.
                  </FormDescription>
                  <FormMessage>{errors.role?.message}</FormMessage>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-2 px-4 bg-orange-400 text-white font-semibold rounded-md shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

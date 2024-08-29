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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { createStudent } from "../../lib/studentAction";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const formSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters long." }),
  email: z.string().email({ message: "Invalid email address." }),
  role: z.string().min(1, { message: "Role is required." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function StudentDetailsClient() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const { handleSubmit, reset, formState: { errors } } = form;
  const router = useRouter();
  const { theme } = useTheme();

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
    <main
      className={`flex items-center justify-center min-h-screen p-4 ${
        theme === 'dark' ? 'bg-[#0a1d3b]' : 'bg-[#f0f4f8]'
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-lg shadow-md ${
          theme === 'dark' ? 'bg-[#002f6c]' : 'bg-white'
        }`}
      >
        <h1
          className={`text-2xl font-semibold mb-6 text-center ${
            theme === 'dark' ? 'text-[#e0e0e0]' : 'text-[#003366]'
          }`}
        >
          Submit Your Details
        </h1>
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
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 ${theme === 'dark' ? 'border-[#003366]' : 'border-[#004080]'} focus:ring-[#003366] ${errors.name ? 'border-red-500' : ''}`}
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
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 ${theme === 'dark' ? 'border-[#003366]' : 'border-[#004080]'} focus:ring-[#003366] ${errors.email ? 'border-red-500' : ''}`}
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
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 ${theme === 'dark' ? 'border-[#003366]' : 'border-[#004080]'} focus:ring-[#003366]`}>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Roles</SelectLabel>
                          <SelectItem value="Student">Student</SelectItem>
                          <SelectItem value="Teacher">Teacher</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
              className={`w-full py-2 px-4 font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-[black] hover:bg-[#002a6c] focus:ring-[#003366] text-white' : 'bg-[#003366] hover:bg-[#004080] focus:ring-[#003366] text-white'}`}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

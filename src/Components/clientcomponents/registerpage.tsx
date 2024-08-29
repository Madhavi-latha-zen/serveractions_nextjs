
'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/authAction";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const signupSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const router = useRouter();

    const { control, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        mode: 'onChange',
        defaultValues: { username: '', email: '', password: '' },
    });

    const onSignup = async (data: SignupFormValues) => {
        setError("");
        setSuccess("");

        try {
            const result = await createUser(data);

            if (result.created) {
                setSuccess("User created successfully!");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                setError(result.error || "Failed to create an account. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#001f3f]">
            <div className="max-w-md w-full p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md dark:bg-[#001f3f] dark:border-[#003366]">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-[#f0f0f0]">Register</h1>
                <form onSubmit={handleSubmit(onSignup)} className="space-y-6">
                    <Controller
                        control={control}
                        name="username"
                        render={({ field }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-[#f0f0f0]">Username</label>
                                <Input
                                    type="text"
                                    placeholder="Username"
                                    {...field}
                                    className={`w-full mt-1 ${errors.username ? 'border-red-500' : 'focus:border-blue-500'} input`}
                                />
                                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                            </div>
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-[#f0f0f0]">Email</label>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    {...field}
                                    className={`w-full mt-1 ${errors.email ? 'border-red-500' : 'focus:border-blue-500'} input`}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                        )}
                    />

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 dark:text-[#f0f0f0]">Password</label>
                        <Controller
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    {...field}
                                    className={`w-full mt-1 ${errors.password ? 'border-red-500' : 'focus:border-blue-500'} input`}
                                />
                            )}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <AiFillEyeInvisible className="text-gray-500 dark:text-[#f0f0f0]" /> : <AiFillEye className="text-gray-500 dark:text-[#f0f0f0]" />}
                        </button>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600"
                    >
                        Register
                    </Button>

                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">{success}</p>}
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-[#f0f0f0]">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;

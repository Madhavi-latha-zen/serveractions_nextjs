// "use client";
// import { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import { useRouter } from "next/navigation";
// import { signIn, signOut, useSession } from "next-auth/react";
// import Link from "next/link";

// const loginSchema = z.object({
//   email: z.string().email({ message: "Invalid email address." }),
//   password: z.string().min(6, { message: "Password must be at least 6 characters." }),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;

// const LoginForm = () => {
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const router = useRouter();
//   const { data: session, status: sessionStatus } = useSession();

//   const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     mode: 'onChange',
//     defaultValues: { email: '', password: '' },
//   });

//   useEffect(() => {
//     if (sessionStatus === "authenticated") {
//       router.replace("/dashboard");
//     }
//   }, [sessionStatus, router]);

//   const onLogin = async (data: LoginFormValues) => {
//     setLoading(true);
//     setError(null);

//     const res = await signIn("credentials", {
//       redirect: false,
//       email: data.email,
//       password: data.password,
//     });

//     if (res?.error) {
//       setError("Invalid email or password");
//     } else if (res?.url) {
//       router.replace("/dashboard");
//     }

//     setLoading(false);
//   };

//   const handleRegisterRedirect = () => {
//     router.push('/register');
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       await signIn('google');
//     } catch (error) {
//       console.error("Google sign-in error:", error);
//     }
//   };

//   const handleGithubSignIn = async () => {
//     try {
//       await signIn('github');
//     } catch (error) {
//       console.error("GitHub sign-in error:", error);
//     }
//   };

//   if (sessionStatus === "loading") {
//     return <h1>Loading...</h1>;
//   }

//   return (
//     sessionStatus !== "authenticated" && (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#001f3f]">
//         <div className="max-w-md w-full p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md dark:bg-[#001f3f] dark:border-[#003366]">
//           <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-[#f0f0f0]">Log In</h1>
//           <form onSubmit={handleSubmit(onLogin)} className="space-y-6">
//             <Controller
//               control={control}
//               name="email"
//               render={({ field }) => (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-[#f0f0f0]">Email</label>
//                   <Input
//                     type="email"
//                     placeholder="Email"
//                     {...field}
//                     className={`w-full p-3 mt-1 border rounded-lg shadow-sm ${errors.email ? 'border-red-500' : 'focus:outline-none focus:ring-2 focus:ring-blue-500'} input`}
//                   />
//                   {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//                 </div>
//               )}
//             />
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 dark:text-[#f0f0f0]">Password</label>
//               <Controller
//                 control={control}
//                 name="password"
//                 render={({ field }) => (
//                   <Input
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="Password"
//                     {...field}
//                     className={`w-full p-3 mt-1 border rounded-lg shadow-sm ${errors.password ? 'border-red-500' : 'focus:outline-none focus:ring-2 focus:ring-blue-500'} input`}
//                   />
//                 )}
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <AiFillEyeInvisible className="text-gray-500 dark:text-[#f0f0f0]" /> : <AiFillEye className="text-gray-500 dark:text-[#f0f0f0]" />}
//               </button>
//               {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//             </div>

//             <Button
//               type="submit"
//               className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </Button>

//             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//           </form>

//           <div className="flex space-x-5 mt-4">
//             <Button
//               onClick={handleGoogleSignIn}
//               className="border border-black rounded-lg px-5 py-1"
//             >
//               Sign in with Google
//             </Button>
//             <Button
//               onClick={handleGithubSignIn}
//               className="border border-black rounded-lg bg-green-500 px-5 py-1 text-white"
//             >
//               Sign in with GitHub
//             </Button>
//           </div>
//           <div className="mt-6 text-center">
//             <p className="text-gray-700 dark:text-[#f0f0f0]">Don't have an account? <button className="text-blue-600 hover:underline" onClick={handleRegisterRedirect}>Register</button></p>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default LoginForm;








// "use client";

// import { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import { useRouter } from "next/navigation";
// import { signIn, useSession } from "next-auth/react";
// import Link from "next/link";

// const loginSchema = z.object({
//   email: z.string().email({ message: "Invalid email address." }),
//   password: z.string().min(6, { message: "Password must be at least 6 characters." }),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;

// const LoginForm = () => {
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const router = useRouter();
//   const { data: session, status: sessionStatus } = useSession();

//   const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     mode: "onChange",
//     defaultValues: { email: "", password: "" },
//   });

//   useEffect(() => {
//     if (sessionStatus === "authenticated") {
//       router.replace("/users");
//     }
//   }, [sessionStatus, router]);

//   const onLogin = async (data: LoginFormValues) => {
//     setLoading(true);
//     setError(null);

//     const res = await signIn("credentials", {
//       redirect: false,
//       email: data.email,
//       password: data.password,
//     });

//     if (res?.error) {
//       setError("Invalid email or password");
//     } else if (res?.url) {
//       router.replace("/dashboard");
//     }

//     setLoading(false);
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       await signIn("google");
//     } catch (error) {
//       console.error("Google sign-in error:", error);
//     }
//   };

//   const handleGithubSignIn = async () => {
//     try {
//       await signIn("github");
//     } catch (error) {
//       console.error("GitHub sign-in error:", error);
//     }
//   };

//   if (sessionStatus === "loading") {
//     return <h1>Loading...</h1>;
//   }

//   return (
//     sessionStatus !== "authenticated" && (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#001f3f]">
//         <div className="max-w-md w-full p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md dark:bg-[#001f3f] dark:border-[#003366]">
//           <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-[#f0f0f0]">Log In</h1>
//           <form onSubmit={handleSubmit(onLogin)} className="space-y-6">
//             <Controller
//               control={control}
//               name="email"
//               render={({ field }) => (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-[#f0f0f0]">Email</label>
//                   <Input
//                     type="email"
//                     placeholder="Email"
//                     {...field}
//                     className={`w-full p-3 mt-1 border rounded-lg shadow-sm ${errors.email ? "border-red-500" : "focus:outline-none focus:ring-2 focus:ring-blue-500"} input`}
//                   />
//                   {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//                 </div>
//               )}
//             />
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 dark:text-[#f0f0f0]">Password</label>
//               <Controller
//                 control={control}
//                 name="password"
//                 render={({ field }) => (
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     {...field}
//                     className={`w-full p-3 mt-1 border rounded-lg shadow-sm ${errors.password ? "border-red-500" : "focus:outline-none focus:ring-2 focus:ring-blue-500"} input`}
//                   />
//                 )}
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <AiFillEyeInvisible className="text-gray-500 dark:text-[#f0f0f0]" /> : <AiFillEye className="text-gray-500 dark:text-[#f0f0f0]" />}
//               </button>
//               {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//             </div>

//             <Button
//               type="submit"
//               className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </Button>

//             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//           </form>

//           <div className="flex space-x-5 mt-4">
//             <Button
//               onClick={handleGoogleSignIn}
//               className="border border-black rounded-lg px-5 py-1"
//             >
//               Sign in with Google
//             </Button>
//             <Button
//               onClick={handleGithubSignIn}
//               className="border border-black rounded-lg bg-green-500 px-5 py-1 text-white"
//             >
//               Sign in with GitHub
//             </Button>
//           </div>
//           <div className="mt-6 text-center">
//             <p className="text-gray-700 dark:text-[#f0f0f0]">Don't have an account? <Link href="/register" className="text-blue-600 hover:underline">
//   Register
// </Link>
// </p>

//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default LoginForm;


// "use client";

// import { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import { useRouter } from "next/navigation";
// import { signIn, useSession } from "next-auth/react";
// import Link from "next/link";

// const loginSchema = z.object({
//   email: z.string().email({ message: "Invalid email address." }),
//   password: z.string().min(6, { message: "Password must be at least 6 characters." }),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;

// const LoginForm = () => {
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const router = useRouter();
//   const { data: session, status: sessionStatus } = useSession();

//   const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     mode: "onChange",
//     defaultValues: { email: "", password: "" },
//   });

//   useEffect(() => {
//     if (sessionStatus === "authenticated") {
//       router.replace("/users");
//     }
//   }, [sessionStatus, router]);

//   const onLogin = async (data: LoginFormValues) => {
//     setLoading(true);
//     setError(null);

//     const res = await signIn("credentials", {
//       redirect: false,
//       email: data.email,
//       password: data.password,
//     });

//     if (res?.error) {
//       setError("Invalid email or password");
//     } else if (res?.url) {
//       router.replace("/dashboard");
//     }

//     setLoading(false);
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       await signIn("google");
//     } catch (error) {
//       console.error("Google sign-in error:", error);
//     }
//   };

//   const handleGithubSignIn = async () => {
//     try {
//       await signIn("github", { callbackUrl: "/dashboard" });
//     } catch (error) {
//       console.error("GitHub sign-in error:", error);
//     }
//   };
  
//   if (sessionStatus === "loading") {
//     return <h1>Loading...</h1>;
//   }

//   return (
//     sessionStatus !== "authenticated" && (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#001f3f]">
//         <div className="max-w-md w-full p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md dark:bg-[#001f3f] dark:border-[#003366]">
//           <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-[#f0f0f0]">Log In</h1>
//           <form onSubmit={handleSubmit(onLogin)} className="space-y-6">
//             <Controller
//               control={control}
//               name="email"
//               render={({ field }) => (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-[#f0f0f0]">Email</label>
//                   <Input
//                     type="email"
//                     placeholder="Email"
//                     {...field}
//                     className={`w-full p-3 mt-1 border rounded-lg shadow-sm ${errors.email ? "border-red-500" : "focus:outline-none focus:ring-2 focus:ring-blue-500"} input`}
//                   />
//                   {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//                 </div>
//               )}
//             />
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 dark:text-[#f0f0f0]">Password</label>
//               <Controller
//                 control={control}
//                 name="password"
//                 render={({ field }) => (
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     {...field}
//                     className={`w-full p-3 mt-1 border rounded-lg shadow-sm ${errors.password ? "border-red-500" : "focus:outline-none focus:ring-2 focus:ring-blue-500"} input`}
//                   />
//                 )}
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <AiFillEyeInvisible className="text-gray-500 dark:text-[#f0f0f0]" /> : <AiFillEye className="text-gray-500 dark:text-[#f0f0f0]" />}
//               </button>
//               {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//             </div>

//             <Button
//               type="submit"
//               className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </Button>

//             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//           </form>

//           <div className="flex space-x-5 mt-4">
//             <Button
//               onClick={handleGoogleSignIn}
//               className="border border-black rounded-lg px-5 py-1"
//             >
//               Sign in with Google
//             </Button>
//             <Button
//               onClick={handleGithubSignIn}
//               className="border border-black rounded-lg bg-green-500 px-5 py-1 text-white"
//             >
//               Sign in with GitHub
//             </Button>
//           </div>
//           <div className="mt-6 text-center">
//             <p className="text-gray-700 dark:text-[#f0f0f0]">
//               Don't have an account?{" "}
//               <Link href="/register" className="text-blue-600 hover:underline">
//                 Register
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default LoginForm;





// "use client";

// import { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import { useRouter } from "next/navigation";
// import { verifyUser } from "@/lib/authAction";  // Import the verifyUser function
// import Link from "next/link";

// const loginSchema = z.object({
//   email: z.string().email({ message: "Invalid email address." }),
//   password: z.string().min(6, { message: "Password must be at least 6 characters." }),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;

// const LoginForm = () => {
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const router = useRouter();

//   const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     mode: "onChange",
//     defaultValues: { email: "", password: "" },
//   });

//   const onLogin = async (data: LoginFormValues) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const result = await verifyUser(data);

//       if (result.verified) {
//         // Handle successful login, e.g., store token, redirect user
//         router.replace("/dashboard");
//       } else {
//         setError(result.error || "Invalid email or password");
//       }
//     } catch (err) {
//       setError("An error occurred during login. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#001f3f]">
//       <div className="max-w-md w-full p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md dark:bg-[#001f3f] dark:border-[#003366]">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-[#f0f0f0]">Login</h1>
//         <form onSubmit={handleSubmit(onLogin)} className="space-y-6">
//           <Controller
//             control={control}
//             name="email"
//             render={({ field }) => (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-[#f0f0f0]">Email</label>
//                 <Input
//                   type="email"
//                   placeholder="Email"
//                   {...field}
//                   className={`w-full mt-1 ${errors.email ? 'border-red-500' : 'focus:border-blue-500'} input`}
//                 />
//                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//               </div>
//             )}
//           />

//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 dark:text-[#f0f0f0]">Password</label>
//             <Controller
//               control={control}
//               name="password"
//               render={({ field }) => (
//                 <Input
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Password"
//                   {...field}
//                   className={`w-full mt-1 ${errors.password ? 'border-red-500' : 'focus:border-blue-500'} input`}
//                 />
//               )}
//             />
//             <button
//               type="button"
//               className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <AiFillEyeInvisible className="text-gray-500 dark:text-[#f0f0f0]" /> : <AiFillEye className="text-gray-500 dark:text-[#f0f0f0]" />}
//             </button>
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//           </div>

//           <Button
//             type="submit"
//             className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </Button>

//           {error && <p className="text-red-500 text-center">{error}</p>}
//         </form>
//         <div className="mt-4 text-center">
//           <p className="text-sm text-gray-600 dark:text-[#f0f0f0]">
//             Don't have an account?{' '}
//             <Link href="/register" className="text-blue-500 hover:underline">
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


  "use client";

  import { useState, useEffect } from "react";
  import { useForm, Controller } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { z } from "zod";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
  import { useRouter } from "next/navigation";
  import { verifyUser } from "@/lib/authAction";  // Import the verifyUser function
  import Link from "next/link";

  const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;

  const LoginForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
      mode: "onChange",
      defaultValues: { email: "", password: "" },
    });

    const onLogin = async (data: LoginFormValues) => {
      setLoading(true);
      setError(null);
    
      try {
        const result = await verifyUser(data);
    
        if (result.verified) {
          router.replace("/dashboard");  // Redirect to dashboard if login is successful
        } else {
          setError(result.error || "Invalid email or password");  // Display error if login fails
        }
      } catch (err) {
        setError("An error occurred during login. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#001f3f]">
        <div className="max-w-md w-full p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md dark:bg-[#001f3f] dark:border-[#003366]">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-[#f0f0f0]">Login</h1>
          <form onSubmit={handleSubmit(onLogin)} className="space-y-6">
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
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-[#f0f0f0]">
              Don't have an account?{' '}
              <Link href="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };

  export default LoginForm;

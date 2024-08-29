"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function Layout() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login'); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-8 border rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p className="mb-4">Click the button below to proceed to the login page.</p>
        <Button
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleLoginRedirect}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

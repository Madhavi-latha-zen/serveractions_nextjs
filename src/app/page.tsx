"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/student");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Welcome to Our Application
        </h1>
        <p className="text-gray-600 text-center mb-8">
          To submit your student details, please click the button below.
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleRedirect}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Student Form Submission
          </button>
        </div>
      </div>
    </main>
  );
}

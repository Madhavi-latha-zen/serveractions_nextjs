"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import Usermanagement from "../clientcomponents/UserManagement";
import Alldetails from "../clientcomponents/alldetails";
import { getAllStudents } from "@/lib/studentAction";
import StudentDetailsClient from "../clientcomponents/studentdetails";

const StudentDashboard = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<'form' | 'management' | 'details'>('form');
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await getAllStudents();
        if (result.success) {
          setStudents(result.data || []);
        } else {
          console.error('Error fetching students:', result.error);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleNavigation = (section: 'form' | 'management' | 'details', path: string) => {
    setActiveSection(section);
    // router.push(path);
  };

  return (
    <main
      className={`flex min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <aside className={`w-64 p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="space-y-4">
          <Button
            type="button"
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeSection === 'management' ? (theme === 'dark' ? 'bg-green-700 text-white' : 'bg-green-600 text-white') : (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800')
            } hover:${theme === 'dark' ? 'bg-green-800' : 'bg-green-700'}`}
            onClick={() => handleNavigation('management', '/user-management')}
          >
            <AiOutlineUser className="inline mr-2" />
            User Management
          </Button>
          <Button
            type="button"
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeSection === 'form' ? (theme === 'dark' ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white') : (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800')
            } hover:${theme === 'dark' ? 'bg-blue-800' : 'bg-blue-700'}`}
            onClick={() => handleNavigation('form', '/student-form')}
          >
            <AiOutlineUser className="inline mr-2" />
            Student Form
          </Button>
          <Button
            type="button"
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeSection === 'details' ? (theme === 'dark' ? 'bg-yellow-700 text-white' : 'bg-yellow-600 text-white') : (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800')
            } hover:${theme === 'dark' ? 'bg-yellow-800' : 'bg-yellow-700'}`}
            onClick={() => handleNavigation('details', '/details-view')}
          >
            <AiOutlineSetting className="inline mr-2" />
            Details View
          </Button>
        </div>
      </aside>
      <div className="flex-1 p-8">
        <div className="w-full max-w-4xl mx-auto">
          {activeSection === 'management' && <Usermanagement />}
          {activeSection === 'form' && <StudentDetailsClient />}
          {activeSection === 'details' && <Alldetails students={students} />}
        </div>
      </div>
    </main>
  );
};

export default StudentDashboard;

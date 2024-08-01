"use server";

import { getAllStudents } from "@/lib/studentAction";
import Alldetails from "../clientcomponents/alldetails";

async function Alldetailsserver() {
    const result = await getAllStudents();

    if (!result.success) {
        return <div>Error fetching students: {result.error}</div>;
    }
    const students = result.data || [];

    return (
        <div>
            <Alldetails students={students} />
        </div>
    );
}

export default Alldetailsserver;

import Studentdetailserver from "@/Components/servercomponents/studentdetailsserver";

const page = async() => {
    return (
      <>
        <Studentdetailserver params={undefined}/>
      </>
    );
  };
  
  export default page;











// import Studentdetailserver from "@/Components/servercomponents/studentdetailsserver";

// const fetchStudentData = async () => {
//   const response = await fetch('http://localhost:3000/student');
//   const data = await response.json();
//   return data;
// };

// const Page = async () => {
//   const studentData = await fetchStudentData();

//   return (
//     <div>
//       <Studentdetailserver params={studentData} />
//     </div>
//   );
// };

// export default Page;

  
import React from "react";
import Studentdetailsclient from "../clientcomponents/studentdetails";

interface Props {
    params: any;
}

const Studentdetailserver: React.FC<Props> = ({ params }) => {
 
    return (
        <>
          <Studentdetailsclient/>
        </>
    );
};

export default Studentdetailserver;

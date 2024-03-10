import React from "react";
import Sidebar from "./Sidebar";
import UserChart from "../Admin/Charts/User";
import DiseaseCount from "./Charts/DiseaseCount";
import Total from "./Charts/Total";


const Dashboard = () => {
  return (
    <div className="flex">
    <div className="w-100">
        <Sidebar />
    </div>
    
      <div className="ml-[21rem] mr-10">
        <Total />
        <UserChart />
        <DiseaseCount />
    </div>
    </div>
  );
};

export default Dashboard;

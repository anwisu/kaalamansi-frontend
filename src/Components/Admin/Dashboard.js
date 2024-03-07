import React from "react";
import Sidebar from "./Sidebar";
import UserChart from "../Admin/Charts/User";
import DiseaseCount from "./Charts/DiseaseCount";

const Dashboard = () => {
  return (
    <div className="flex">
    <div className="w-100">
        <Sidebar />
    </div>
      
      <div className="flex-1 py-10">
      <div className="charts-container">
        <UserChart />
        <DiseaseCount />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;

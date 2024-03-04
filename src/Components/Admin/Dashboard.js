import React from "react";
import Sidebar from "./Sidebar";
import UserChart from "../Admin/Charts/User";
import DiseaseCount from "./Charts/DiseaseCount";
const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <div className="charts-container">
        <UserChart />
        <DiseaseCount />
      </div>
    </div>
  );
};

export default Dashboard;

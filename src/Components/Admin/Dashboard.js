import React from "react";
import Sidebar from "./Sidebar";
import UserChart from "../Admin/Charts/User";
import DiseaseCount from "./Charts/DiseaseCount";
import QualityCount from "./Charts/QualityCount";
import Total from "./Charts/Total";
import MetaData from "../Layout/MetaData";



const Dashboard = () => {
  return (
    <div className="flex" style={{background: 'rgb(12,109,77)',
      background: 'linear-gradient(356deg, rgba(12,109,77,1) 0%, rgba(51,207,96,1) 35%, rgba(142,234,147,0.8991246156665791) 100%)'}}>
    {/* <div className="flex" style={{backgroundColor: '#8eea93'}}> */}
    <MetaData title={'Dashboard'} />
        <div className="w-100">
            <Sidebar />
        </div>
        
        <div className="mt-10 ml-[21rem] mr-4">
            <Total />
            <div className="flex mx-auto gap-6 mb-10">
            {/* <UserChart /> */}
            <DiseaseCount />
            <QualityCount />
            </div>
        </div>
    </div>
  );
};

export default Dashboard;

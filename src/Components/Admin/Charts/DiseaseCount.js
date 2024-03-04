import React, { useEffect, useState } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";

const DiseaseCount = () => {
  const [diseaseData, setDiseaseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/admin/disease/all`
        );
        setDiseaseData(response.data.disease_data);
      } catch (error) {
        console.error("Error fetching disease data:", error);
      }
    };

    fetchData();
  }, []);

  const generateChartData = () => {
    const diseaseCounts = {};

    // Count occurrences of each predicted_disease
    diseaseData.forEach((record) => {
      const predictedDisease =
        record.predicted_disease.charAt(0).toUpperCase() +
        record.predicted_disease.slice(1);

      if (predictedDisease in diseaseCounts) {
        diseaseCounts[predictedDisease]++;
      } else {
        diseaseCounts[predictedDisease] = 1;
      }
    });

    // Convert diseaseCounts to an array for ApexCharts
    const chartData = Object.keys(diseaseCounts).map((disease) => {
      return {
        x: disease,
        y: diseaseCounts[disease],
        color: disease === "Infected" ? "#ff0040" : "#00b300",
      };
    });

    return chartData;
  };

  const options = {
    chart: {
      type: "donut",
      colors: generateChartData().map((data) => data.color),
    },
    labels: generateChartData().map((data) => data.x),
    colors: generateChartData().map((data) => data.color),
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 50,
          },
          legend: {
            position: "bottom", // Adjust the legend position for smaller screens
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white p-2 ml-10 inline-block items-center w-64">
      <ApexCharts
        options={options}
        series={generateChartData().map((data) => data.y)}
        type="donut"
        height={320}
        className="mt-10"
      />
      <div className="text-center text-sm text-blue-gray-900 font-bold">Predicted Disease</div>
    </div>
  );
};

export default DiseaseCount;

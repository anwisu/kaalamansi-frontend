import React, { useEffect, useState } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";

const QualityCount = () => {
  const [qualityData, setQualityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/admin/quality/all`
        );
        setQualityData(response.data.quality_data);
      } catch (error) {
        console.error("Error fetching quality data:", error);
      }
    };

    fetchData();
  }, []);

  const generateChartData = () => {
    const qualityCounts = {};

    // Count occurrences of each predicted_quality
    qualityData.forEach((record) => {
      const predictedquality =
        record.predicted_quality.charAt(0).toUpperCase() +
        record.predicted_quality.slice(1);

      if (predictedquality in qualityCounts) {
        qualityCounts[predictedquality]++;
      } else {
        qualityCounts[predictedquality] = 1;
      }
    });

    // Convert qualityCounts to an array for ApexCharts
    const chartData = Object.keys(qualityCounts).map((quality) => {
      return {
        x: quality,
        y: qualityCounts[quality],
        color: quality === "Low" ? "#ff0040" : "#00b300",
      };
    });

    return chartData;
  };

  const options = {
    chart: {
      type: "pie",
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
        type="pie"
        height={320}
        className="mt-10"
      />
      <div className="text-center text-sm text-blue-gray-900 font-bold">Predicted quality</div>
    </div>
  );
};

export default QualityCount;

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

const DiseaseCM = () => {
  const [confMatrix, setConfMatrix] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/disease/confusion-matrix`
      );
      setConfMatrix(Object.values(response.data)); // Convert the dictionary to an array of arrays
      console.log("Confusion Matrix after setting state:", confMatrix); // Convert the dictionary to an array of arrays
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const series = confMatrix.map((row, i) => ({
    name: `Actual:${i}`,
    data: row.map((value, j) => ({ x: `Predicted:${j}`, y: value })),
  }));

  const options = {
    chart: {
      type: "heatmap",
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "20px", // Change the font size
        colors: ["#033200"], // Change the font color
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        color: "#67FF53",
        shadeIntensity: 0.1,
      },
    },
    title: {
      text: "Kalamansi Disease Confusion Matrix Heatmap",
    },
    xaxis: {
      type: "category",
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="heatmap"
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default DiseaseCM;

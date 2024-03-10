import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  TableCellsIcon,
  DocumentMagnifyingGlassIcon,
  UserGroupIcon,
  PresentationChartLineIcon,
  CheckCircleIcon,
  ClockIcon
} from "@heroicons/react/24/solid";
import ApexCharts from "react-apexcharts";

const DiseaseCount = () => {
  // const [diseaseData, setDiseaseData] = useState([]);
  const [diseaseData, setDiseaseData] = useState({ infected: Array(12).fill(0), notInfected: Array(12).fill(0) });
  const [lastUpdate, setLastUpdate] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_API}/admin/disease/all`
  //       );
  //       setDiseaseData(response.data.disease_data);
  //     } catch (error) {
  //       console.error("Error fetching disease data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/admin/disease-predicts-per-month`
        );
        const predicts_per_month = response.data.predicts_per_month;

        const counts = {
          infected: Array(12).fill(0),
          notInfected: Array(12).fill(0),
        };

        let lastCreatedAt = null;

        predicts_per_month.forEach((record) => {
          const month = record._id.month - 1; // Subtract 1 because getMonth() returns a zero-based month

          counts.infected[month] = record.infected;
          counts.notInfected[month] = record.notInfected;

          // Update lastCreatedAt if the current record's created_at is later
          if (!lastCreatedAt || new Date(record.lastCreatedAt) > new Date(lastCreatedAt)) {
            lastCreatedAt = record.lastCreatedAt;
          }
        });

        setDiseaseData(counts);
        setLastUpdate(lastCreatedAt);
        // Display the last created_at date

        console.log(predicts_per_month)
        console.log("Last created_at:", lastCreatedAt);
      } catch (error) {
        console.error("Error fetching disease data:", error);
      }
    };

    fetchData();
  }, []);

  const series = [
    {
      name: 'Infected',
      data: diseaseData.infected,
    },
    {
      name: 'Not Infected',
      data: diseaseData.notInfected,
    },
  ];

  const options = {
    chart: {
      type: 'line',
    },
    height: 350,
    stroke: {
      width: [4, 4],
      curve: 'smooth',
    },
    colors: ["#FF1654", "#00F04B"],
    xaxis: {
      categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    },
  };


  // const generateChartData = () => {
  //   const diseaseCounts = {};

  //   // Count occurrences of each predicted_disease
  //   diseaseData.forEach((record) => {
  //     const predictedDisease =
  //       record.predicted_disease.charAt(0).toUpperCase() +
  //       record.predicted_disease.slice(1);

  //     if (predictedDisease in diseaseCounts) {
  //       diseaseCounts[predictedDisease]++;
  //     } else {
  //       diseaseCounts[predictedDisease] = 1;
  //     }
  //   });

  //   // Convert diseaseCounts to an array for ApexCharts
  //   const chartData = Object.keys(diseaseCounts).map((disease) => {
  //     return {
  //       x: disease,
  //       y: diseaseCounts[disease],
  //       color: disease === "Infected" ? "#ff0040" : "#00b300",
  //     };
  //   });

  //   return chartData;
  // };

  // const options = {
  //   chart: {
  //     type: "donut",
  //     colors: generateChartData().map((data) => data.color),
  //   },
  //   labels: generateChartData().map((data) => data.x),
  //   colors: generateChartData().map((data) => data.color),
  //   legend: {
  //     position: "top",
  //     horizontalAlign: "center",
  //   },
  //   responsive: [
  //     {
  //       breakpoint: 480,
  //       options: {
  //         chart: {
  //           width: 50,
  //         },
  //         legend: {
  //           position: "bottom", // Adjust the legend position for smaller screens
  //         },
  //       },
  //     },
  //   ],
  // };

  return (
    <Card className="w-full border border-blue-gray-100 shadow-sm">
      <CardHeader variant="gradient" floated={false} shadow={false}>
        {/* <ApexCharts
            options={options}
            series={generateChartData().map((data) => data.y)}
            type="donut"
          /> */}
        <ApexCharts
          options={options}
          series={series}
          type="line"
        />
      </CardHeader>
      <CardBody className="px-6 pt-0">
        <Typography variant="h6" color="blue-gray">
          Predicted Disease Per Month
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-600">
          This chart predicts monthly disease occurrence using red for infected and green for not infected kalamansi.
        </Typography>
      </CardBody>
      <CardFooter className="border-t border-blue-gray-50 px-6 py-5">
        <Typography
          variant="small"
          className="flex items-center font-normal text-blue-gray-600"
        >
          <ClockIcon strokeWidth={2} className="h-4 w-4 mr-2 text-blue-gray-400" />
          {lastUpdate && (
            <p>Last updated at: {new Date(lastUpdate).toLocaleString()}</p>
          )}
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default DiseaseCount;

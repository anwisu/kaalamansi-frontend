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

const QualityCount = () => {
  const [qualityData, setQualityData] = useState({ low: Array(12).fill(0), high: Array(12).fill(0) });
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/admin/quality-predicts-per-month`
        );
        const predicts_per_month = response.data.predicts_per_month;

        const counts = {
          low: Array(12).fill(0),
          high: Array(12).fill(0),
        };

        let lastCreatedAt = null;

        predicts_per_month.forEach((record) => {
          const month = record._id.month - 1; // Subtract 1 because getMonth() returns a zero-based month

          counts.low[month] = record.low;
          counts.high[month] = record.high;

          if (!lastCreatedAt || new Date(record.lastCreatedAt) > new Date(lastCreatedAt)) {
            lastCreatedAt = record.lastCreatedAt;
          }
        });

        setQualityData(counts);
        setLastUpdate(lastCreatedAt);
      } catch (error) {
        console.error("Error fetching quality data:", error);
      }
    };

    fetchData();
  }, []);

  const series = [
    {
      name: 'Low Quality',
      data: qualityData.low,
    },
    {
      name: 'High Quality',
      data: qualityData.high,
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
          Predicted Quality Per Month
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-600">
        This chart predicts monthly quality occurrence using red for low quality and green for high quality kalamansi.
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

export default QualityCount;

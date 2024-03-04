// QualityDiseaseGraph.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";

const Dashboard = () => {
  const [data, setData] = useState({ quality: 0, disease: 0 });
  const countIds = (data) => {
    return data ? data.length : 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const qualityResponse = await axios.get(
          `${process.env.REACT_APP_API}/admin/quality/all`
        );
        const diseaseResponse = await axios.get(
          `${process.env.REACT_APP_API}/admin/disease/all`
        );

        console.log("Quality Response:", qualityResponse.data);
        console.log("Disease Response:", diseaseResponse.data);

        const qualityCount = countIds(qualityResponse.data?.quality_data);
        const diseaseCount = countIds(diseaseResponse.data?.disease_data);

        console.log("Quality Response:", qualityCount);
        console.log("Disease Response:", diseaseCount);

        // const qlowCount = countIds(
        //   qualityResponse.data?.quality_data?.predicted_quality.low
        // );
        // const dResCount = countIds(
        //   diseaseResponse.data?.disease_data?.predicted_disease
        // );

        // console.log("Quality Result:", qResCount);
        // console.log("Disease Result:", dResCount);

        setData({
          quality: qualityCount,
          disease: diseaseCount,
        //   qRes: qResCount,
        //   dRes: dResCount,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    colors: ["#70f570", "#49c628"],
    chart: {
      type: "bar",
      height: "320px",
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadius: 8,
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: ["Quality", "Disease"],
      title: {
        text: "Predicted",
      },
    },
    yaxis: {
      title: {
        text: "Count",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#49c628"],
        shadeIntensity: 1,
        type: "vertical",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    series: [
      {
        name: "Count",
        data: [data.quality || 0, data.disease || 0],
      },
    ],
  };

  return (
    <div>
      <div className="bg-white p-4 ml-80 w-72">
        <div>
          <ApexCharts
            options={options}
            series={[{ name: "Count", data: [data.quality, data.disease] }]}
            type="bar"
            height={320}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

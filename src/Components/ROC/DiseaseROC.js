import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const DiseaseROC = () => {
  const [roc, setROC] = useState({ fpr: [], tpr: [], roc_auc: 0 });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/disease/roc-curve`)
      .then((response) => {
        setROC(response.data); // Change this line
      });
  }, []);

  const options = {
    chart: {
      type: "line",
      height: "100", // height of the chart
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 20000,
        animateGradually: {
          enabled: true,
          delay: 1000,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 10000,
        },
      },
    },
    title: {
      text: `ROC Curve of Your Model (AUC = ${roc.roc_auc.toFixed(2)})`,
    },
    xaxis: {
      categories: roc.fpr,
      title: {
        text: "False Positive Rate",
      },
    },
    yaxis: {
      title: {
        text: "True Positive Rate",
      },
    },
    legend: {
      show: false,
    },
  };

  const series = [
    {
      name: "ROC Curve",
      data: roc.tpr,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      style={{ width: "50%", height: "50%" }}
    />
  );
};

export default DiseaseROC;

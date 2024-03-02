import React, { useEffect, useState } from "react";
import axios from "axios";
import QualityCM from "./ConfusionMatrix/QualityCM";
import DiseaseCM from "./ConfusionMatrix/DiseaseCM";
import QualityROC from "./ROC/QualityROC.js";
import DiseaseROC from "./ROC/DiseaseROC.js";
import ReactApexChart from "react-apexcharts";

const About = () => {
  const [quality_metrics, setQualityMetrics] = useState(null);
  const [disease_metrics, setDiseaseMetrics] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/quality/classification-report`)
      .then((response) => {
        setQualityMetrics(response.data);
      });

    axios
      .get(`${process.env.REACT_APP_API}/disease/classification-report`)
      .then((response) => {
        setDiseaseMetrics(response.data);
      });
  }, []);

  if (!quality_metrics || !disease_metrics) {
    return <div>Loading...</div>;
  }

  const qualityAccuracySeries = [quality_metrics.accuracy * 100];
  const diseaseAccuracySeries = [disease_metrics.accuracy * 100];

  const accuracyOptions = {
    chart: {
      type: "radialBar",
      height: 350,
    
    },
    plotOptions: {
      radialBar: {
        size: 100,
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: true,
            fontSize: '20px',
            formatter: function (val) {
              return val.toFixed(2) + "%";
            },
          },
        },
      },
    },
  };

  return (
    <div className="container mx-auto">
      <h1 className="my-5">About Logistic Regression Model</h1>
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2>Quality Classification Report</h2>
        <div>
          Precision: {quality_metrics.report["weighted avg"]["precision"].toFixed(4)} / {quality_metrics.report["weighted avg"]["precision"].toFixed(2) * 100}%
        </div>
        <div>Recall: {quality_metrics.report["weighted avg"]["recall"].toFixed(4)} / {quality_metrics.report["weighted avg"]["recall"].toFixed(2) * 100}%
        </div>
        <div>
          F1-score: {quality_metrics.report["weighted avg"]["f1-score"].toFixed(4)} / {quality_metrics.report["weighted avg"]["f1-score"].toFixed(2) * 100}%
        </div>
        {/* <div>Accuracy: {quality_metrics.accuracy} / {(quality_metrics.accuracy * 100).toFixed(0)}%</div> */}
        <div className="flex mx-auto">
          <div className="flex-1">
            <ReactApexChart
              options={{ ...accuracyOptions, labels: ["Quality Accuracy"] }}
              series={qualityAccuracySeries}
              type="radialBar"
              style={{ width: "80%" }}
            />
          </div>
          <div className="flex-1">
            <QualityCM />
          </div>
        </div>{" "}
        <div className="">
          <QualityROC />
        </div>
      </div>
      <hr />
      <br />
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2>Disease Classification Report</h2>
        <div>
          Precision: {disease_metrics.report["weighted avg"]["precision"]}
        </div>
        <div>Recall: {disease_metrics.report["weighted avg"]["recall"]}</div>
        <div>
          F1-score: {disease_metrics.report["weighted avg"]["f1-score"]}
        </div>
        {/* <div>Accuracy: {disease_metrics.accuracy} / {(disease_metrics.accuracy * 100)}%</div> */}
        <div className="flex mx-auto">
          <div className="flex-1">
            <ReactApexChart
              options={{ ...accuracyOptions, labels: ["Disease Accuracy"] }}
              series={diseaseAccuracySeries}
              type="radialBar"
              className="inline-block"
              style={{ width: "80%" }}
            />
          </div>
          <div className="flex-1">
            <DiseaseCM />
          </div>
        </div>
        <div className="">
          <DiseaseROC />
        </div>
      </div>
    </div>
  );
};

export default About;

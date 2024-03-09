import React, { useEffect, useState } from "react";
import axios from "axios";
import QualityCM from "../ConfusionMatrix/QualityCM.js";
import DiseaseCM from "../ConfusionMatrix/DiseaseCM.js";
import QualityROC from "../ROC/QualityROC.js";
import DiseaseROC from "../ROC/DiseaseROC.js";
import {
  Card,
  CardBody,
  Avatar,
  Progress,
  TypographyProgress,
  Typography
} from "@material-tailwind/react";
import ReactApexChart from "react-apexcharts";
import Team from "./Team.js";
import Content from "./Content.js";

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
      <Content />
      <section className="lg:py-28 py-8 px-8">
        <div className="container mx-auto mb-10 text-center lg:mb-20">
          <Typography
            color="blue-gray"
            className="mb-2 font-bold uppercase"
          >
            Understanding Logistic Regression Models
          </Typography>
          <Typography
            color="blue-gray"
            className="mb-4 !text-2xl font-bold lg:!text-4xl"
          >
            Empowering Urban Farmers with Data-Driven Insights
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto max-w-m !text-gray-500"
          >
            Cultivate a thriving kalamansi garden with the power of predictive analytics. Optimize your urban harvest with tools that understand quality and disease risks.
          </Typography>
        </div>
        <div className="mb-8 container mx-auto grid lg:gap-x-4 gap-y-4 grid-cols-1 lg:grid-cols-3">
          <Card
            className="col-span-1 bg-gray-100/50 overflow-hidden"
            shadow={false}
          >
            <CardBody className="text-center">
              <Typography
                variant="h4"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Quality Classification Report
              </Typography>
              <Typography className="text-center mb-0 max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
              These key metrics analysis is the result of trained model to ensure the optimal quality outcome of your kalamansi harvest.
              </Typography>
              <div className="w-full mt-8">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <Typography color="blue-gray" variant="h6">
                    Precision
                  </Typography>
                  <Typography color="blue-gray" variant="h6">
                    {quality_metrics.report["weighted avg"]["precision"].toFixed(2) * 100}%
                  </Typography>
                </div>
                <Progress value={quality_metrics.report["weighted avg"]["precision"].toFixed(2) * 100} size="lg" color="teal" />
              </div>
              <div className="w-full mt-2">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <Typography color="blue-gray" variant="h6">
                    Recall
                  </Typography>
                  <Typography color="blue-gray" variant="h6">
                    {quality_metrics.report["weighted avg"]["recall"].toFixed(2) * 100}%
                  </Typography>
                </div>
                <Progress value={quality_metrics.report["weighted avg"]["recall"].toFixed(2) * 100} size="lg" color="teal" />
              </div>
              <div className="w-full mt-2">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <Typography color="blue-gray" variant="h6">
                    F1-Score
                  </Typography>
                  <Typography color="blue-gray" variant="h6">
                    {quality_metrics.report["weighted avg"]["f1-score"].toFixed(2) * 100}%
                  </Typography>
                </div>
                <Progress value={quality_metrics.report["weighted avg"]["f1-score"].toFixed(2) * 100} size="lg" color="teal" />
              </div>
            </CardBody>
          </Card>
          <Card
            className="col-span-2 bg-gray-100/50 overflow-hidden"
            shadow={false}
          >
            <CardBody className="text-center">
              <Typography
                variant="h4"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Predictive Quality Accuracy
              </Typography>
              <Typography className="text-center mb-0 max-w-m mx-auto text-base font-normal leading-7 !text-gray-500">
                Optimize your Kalamansi fruit quality with our precise predictive analytic model, ensuring top-tier results for your urban farming goals.
              </Typography>
              <div className="flex mx-auto mt-4">
                <div className="flex-1">
                  <ReactApexChart
                    options={{ ...accuracyOptions, labels: ["Quality Accuracy"] }}
                    series={qualityAccuracySeries}
                    type="radialBar"
                  // style={{ width: "80%" }}
                  // className="mx-auto"  
                  />
                </div>
                <div className="flex-1">
                  <QualityCM />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="container mx-auto grid lg:gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-3">
          <Card
            className="col-span-2 bg-gray-100/50 overflow-hidden"
            shadow={false}
          >
            <CardBody className="text-center">
              <Typography
                variant="h4"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Predictive Disease Accuracy
              </Typography>
              <Typography className="text-center max-w-m mx-auto text-base font-normal leading-7 !text-gray-500">
              Enhance your Kalamansi fruit by utilizing our accurate predictive analytic model, which predicts the risk of disease infection.
              </Typography>
              <div className="flex mx-auto mt-4">
              <div className="flex-1">
                  <DiseaseCM />
                </div>
                <div className="flex-1">
                  <ReactApexChart
                    options={{ ...accuracyOptions, labels: ["Disease Accuracy"] }}
                    series={diseaseAccuracySeries}
                    type="radialBar"
                    // className="inline-block"
                    // style={{ width: "80%" }}
                  />
                </div>
              </div>

            </CardBody>
          </Card>
          <Card className="col-span-1 bg-gray-100/50" shadow={false}>
            <CardBody className="text-center">
              <Typography
                variant="h4"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Disease Classification Report
              </Typography>
              <Typography className="text-center max-w-xs mx-auto text-base font-normal leading-7 !text-gray-500">
              The analysis of these key metrics represents the outcome of a trained model, which predicts the risk of disease infection in Kalamansi and determines its status.
              </Typography>
              <div className="w-full mt-8">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <Typography color="blue-gray" variant="h6">
                    Precision
                  </Typography>
                  <Typography color="blue-gray" variant="h6">
                    {disease_metrics.report["weighted avg"]["precision"].toFixed(2) * 100}%
                  </Typography>
                </div>
                <Progress value={disease_metrics.report["weighted avg"]["precision"].toFixed(2) * 100} size="lg" color="teal" />
              </div>
              <div className="w-full mt-2">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <Typography color="blue-gray" variant="h6">
                    Recall
                  </Typography>
                  <Typography color="blue-gray" variant="h6">
                    {disease_metrics.report["weighted avg"]["recall"].toFixed(2) * 100}%
                  </Typography>
                </div>
                <Progress value={disease_metrics.report["weighted avg"]["recall"].toFixed(2) * 100} size="lg" color="teal" />
              </div>
              <div className="w-full mt-2">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <Typography color="blue-gray" variant="h6">
                    F1-Score
                  </Typography>
                  <Typography color="blue-gray" variant="h6">
                    {disease_metrics.report["weighted avg"]["f1-score"].toFixed(2) * 100}%
                  </Typography>
                </div>
                <Progress value={disease_metrics.report["weighted avg"]["f1-score"].toFixed(2) * 100} size="lg" color="teal" />
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
      <Team />
    </div>
  );
};

export default About;

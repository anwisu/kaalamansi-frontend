import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Sidebar from '../Sidebar';
import MetaData from '../../Layout/MetaData';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DiseaseCM from '../../ConfusionMatrix/DiseaseCM';
import DiseaseROC from '../../ROC/DiseaseROC';
import {
    Card,
    CardBody,
    Avatar,
    Progress,
    TypographyProgress,
    Typography
} from "@material-tailwind/react";

function DiseaseDataset() {
    const [dataset, setDataset] = useState(null);
    const [disease_metrics, setDiseaseMetrics] = useState(null);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/disease/classification-report`)
            .then((response) => {
                setDiseaseMetrics(response.data);
            });

        axios.get(`${process.env.REACT_APP_API}/admin/disease/dataset`)
            .then(response => {
                const data = JSON.parse(response.data.data); // Parse the data from the response
                setDataset({ shape: response.data.shape, data: data });
            })
            .catch(error => console.error(error));
    }, []);

    if (!disease_metrics) {
        return <div>Loading...</div>;
    }

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
                        show: false,
                        fontSize: '12px',
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

    const getDiseaseCounts = (data) => {
        const counts = {};
        data.forEach(row => {
            const disease = row.disease;
            counts[disease] = (counts[disease] || 0) + 1;
        });
        return counts;
    };

    const diseaseCounts = dataset ? getDiseaseCounts(dataset.data) : {};
    const chartOptions = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: Object.keys(diseaseCounts),
        },
        series: [{
            data: Object.values(diseaseCounts)
        }],
    };

    const columns = [
        {
            label: "Leaf Spots",
            name: "leaf_spots",
            sort: "asc",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Wilting",
            name: "wilting",
            sort: "asc",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Discoloration",
            name: "discoloration",
            sort: "asc",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Lesions",
            name: "lesions",
            sort: "asc",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Fertilized",
            name: "fertilized",
            sort: "asc",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Watering Schedule",
            name: "watering_sched",
            sort: "asc",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Pruning",
            name: "pruning",
            sort: "asc",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Pesticide",
            name: "pesticide_use",
            sort: "asc",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Pest Presence",
            name: "pest_presence",
            sort: "asc",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            label: "Actual Disease",
            name: "disease",
            sort: "asc",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (
                    <p
                        className={`capitalize px-3 py-1 inline-block rounded-full ${value == "0" ? "bg-green-500" : "bg-red-500"
                            }`}
                    >
                        {value == "0" ? "Not Infected" : "Infected"}
                    </p>
                ),
            },
        }
    ];

    const datas = {
        rows: dataset,
    };

    const options = {
        selectableRows: false,
        elevation: 0,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 30],
        resizable: true,
        print: false,
    };

    const muiTheme = () =>
        createTheme({
            typography: {
                fontSize: "16px",
            },
            components: {
                MuiTypography: {
                    styleOverrides: {
                        h6: {
                            fontSize: "30px", // Adjust the font size as needed
                            color: "#4AA032",
                            fontFamily: "League Spartan",
                        },
                    },
                },
                MuiTableCell: {
                    styleOverrides: {
                        head: {
                            padding: "7px 1px",
                            fontSize: "12px",
                            backgroundColor: "#75CD60",
                        },
                        body: {
                            padding: " 7px 15px",
                            fontSize: "14px",
                        },
                    },
                },
                MUIDataTable: {
                    styleOverrides: {
                        root: {
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                            padding: "2px",
                            fontSize: "18px",
                        },
                    },
                },
            },
        });

    return (
        <div className="flex" style={{
            minHeight: '100vh',
            background: 'rgb(12,109,77)',
            background: 'linear-gradient(356deg, rgba(12,109,77,1) 0%, rgba(51,207,96,1) 35%, rgba(142,234,147,0.8991246156665791) 100%)'
        }}>
            <MetaData title={'Disease Model Analytics'} />
            <div className="w-100">
                <Sidebar />
            </div>
            <div className="ml-[21rem] mr-2">
                <h1 className="text-2xl font-bold my-4 text-gray-900" style={{ fontSize: "30px", fontFamily: "League Spartan", }}>Disease Model Analytics</h1>
                {dataset ? (
                    <div className="bg-white p-4 rounded shadow text-gray-900">
                        <p className="mb-2">Shape of dataset: ({dataset.shape[0]} rows, {dataset.shape[1]} columns)</p>
                        <ThemeProvider theme={muiTheme()}>
                            {dataset && dataset.data.length > 0 && (
                                <>
                                    <MUIDataTable
                                        title={"Disease Dataset"}
                                        data={dataset.data}
                                        columns={columns}
                                        options={options}
                                        class="datatables"
                                    />
                                    <br />
                                    <p className="mb-2">Number of classes: 2 (0 = Low and 1 = High)</p>
                                    <ReactApexChart options={chartOptions} series={chartOptions.series} type="bar" height={350} />
                                </>
                            )}
                        </ThemeProvider>
                    </div>
                ) : <p className="text-gray-600">Loading...</p>}
                <div className="my-8 container grid lg:gap-x-4 gap-y-4 grid-cols-1 lg:grid-cols-3">
                    <Card
                        className="col-span-1 bg-white p-4 rounded shadow text-gray-900"
                        shadow={false}
                    >
                        <CardBody className="text-center">
                            <Typography
                                variant="h4"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Classification Report
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
                            <Typography
                                variant="h4"
                                color="blue-gray"
                                className="mt-10 font-medium"
                            >
                                Model Accuracy
                            </Typography>
                            <ReactApexChart
                                options={{ ...accuracyOptions, labels: ["Disease Accuracy"] }}
                                series={diseaseAccuracySeries}
                                type="radialBar"
                            // style={{ width: "80%" }}
                            // className="mx-auto"  
                            />
                        </CardBody>
                    </Card>
                    <Card
                        className="col-span-2 bg-white p-4 rounded shadow text-gray-900"
                    >
                        <CardBody className="text-center p-2">
                            <Typography
                                variant="h4"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Confusion Matrix Heatmap
                            </Typography>
                            <DiseaseCM />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default DiseaseDataset;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Sidebar from '../Sidebar';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import QualityCM from '../../ConfusionMatrix/QualityCM';
import QualityROC from '../../ROC/QualityROC';
import MetaData from '../../Layout/MetaData';
import {
    Card,
    CardBody,
    Avatar,
    Progress,
    TypographyProgress,
    Typography
} from "@material-tailwind/react";

function QualityDataset() {
    const [dataset, setDataset] = useState(null);
    const [quality_metrics, setQualityMetrics] = useState(null);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/quality/classification-report`)
            .then((response) => {
                setQualityMetrics(response.data);
            });

        axios.get(`${process.env.REACT_APP_API}/admin/quality/dataset`)
            .then(response => {
                const data = JSON.parse(response.data.data); // Parse the data from the response
                setDataset({ shape: response.data.shape, data: data });
            })
            .catch(error => console.error(error));
    }, []);

    if (!quality_metrics) {
        return <div>Loading...</div>;
    }

    const qualityAccuracySeries = [quality_metrics.accuracy * 100];

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

    const getQualityCounts = (data) => {
        const counts = {};
        data.forEach(row => {
            const quality = row.quality;
            counts[quality] = (counts[quality] || 0) + 1;
        });
        return counts;
    };

    const qualityCounts = dataset ? getQualityCounts(dataset.data) : {};
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
            categories: Object.keys(qualityCounts),
        },
        series: [{
            data: Object.values(qualityCounts)
        }],
    };

    console.log(quality_metrics)

    const columns = [
        {
            name: "size",
            label: "Size",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
            },
        },
        {
            name: "firmness",
            label: "Firmness",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
            },
        },
        {
            name: "shape",
            label: "Shape",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
            },
        },
        {
            name: "skin_color",
            label: "Skin Color",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
            },
        },
        {
            name: "blemishes",
            label: "Blemishes",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
            },
        },
        {
            name: "soil_type",
            label: "Soil Type",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
            },
        },
        {
            name: "sun_exposure",
            label: "Sun Exposure",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
            },
        },
        {
            name: "location",
            label: "Location",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
            },
        },
        {
            name: "fertilized",
            label: "Fertilizer",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
            },
        },
        {
            name: "watering_sched",
            label: "Watering Schedule",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
            },
        },
        {
            name: "pruning",
            label: "Pruning",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
            },
        },
        {
            name: "pest_prescence",
            label: "Pest Presence",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
            },
        },
        {
            name: "quality",
            label: "Actual Quality",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (
                    <p
                        className={`capitalize px-3 py-1 bg-green-500 inline-block rounded-full 
                        ${value == "low" ? "bg-red-500" : "bg-green-500"}`}
                    >
                        {value}
                    </p>
                ),
            },
        },
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
                            padding: " 7px 10px",
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
        <div className="flex" style={{background: 'rgb(12,109,77)',
        background: 'linear-gradient(356deg, rgba(12,109,77,1) 0%, rgba(51,207,96,1) 35%, rgba(142,234,147,0.8991246156665791) 100%)'}}>
            <MetaData title={'Quality Model Analytics'} />

            <div className="w-100">
                <Sidebar />
            </div>
            <div className="ml-[21rem] mr-10">
                <h1 className="text-2xl font-bold my-4 text-gray-900" style={{ fontSize: "30px", fontFamily: "League Spartan", }}>Quality Model Analytics</h1>
                {dataset ? (
                    <div className="bg-white p-4 rounded shadow text-gray-900">
                        <p className="mb-2">Shape of dataset: ({dataset.shape[0]} rows, {dataset.shape[1]} columns)</p>
                        <ThemeProvider theme={muiTheme()}>
                            {dataset && dataset.data.length > 0 && (
                                <>
                                    <MUIDataTable
                                        title={"Quality Dataset"}
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
                            <Typography
                                variant="h4"
                                color="blue-gray"
                                className="mt-10 font-medium"
                            >
                                Model Accuracy
                            </Typography>
                            <ReactApexChart
                                options={{ ...accuracyOptions, labels: ["Quality Accuracy"] }}
                                series={qualityAccuracySeries}
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
                            <QualityCM />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default QualityDataset;
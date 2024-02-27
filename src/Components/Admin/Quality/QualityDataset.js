import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Sidebar from '../Sidebar';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function QualityDataset() {
    const [dataset, setDataset] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/admin/quality/dataset`)
            .then(response => {
                const data = JSON.parse(response.data.data); // Parse the data from the response
                setDataset({ shape: response.data.shape, data: data });
            })
            .catch(error => console.error(error));
    }, []);

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
        <div className="flex">
            <div className="w-100">
                <Sidebar />
            </div>
            <div className="ml-6">
                <h1 className="text-2xl font-bold mb-4">Understanding Dataset</h1>
                {dataset ? (
                    <div className="bg-white p-4 rounded shadow">
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
            </div>
        </div>
    );
}

export default QualityDataset;
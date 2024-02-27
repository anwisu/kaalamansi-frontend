import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Sidebar from '../Sidebar';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function DiseaseDataset() {
    const [dataset, setDataset] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/admin/disease/dataset`)
            .then(response => {
                const data = JSON.parse(response.data.data); // Parse the data from the response
                setDataset({ shape: response.data.shape, data: data });
            })
            .catch(error => console.error(error));
    }, []);

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
            </div>
        </div>
    );
}

export default DiseaseDataset;
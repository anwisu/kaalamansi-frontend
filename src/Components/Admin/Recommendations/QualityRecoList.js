import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import Sidebar from "../Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@material-tailwind/react";
import { getToken } from "../../../utils/helpers";
import {
    PencilSquareIcon,
    TrashIcon
} from '@heroicons/react/24/solid';
import { Tooltip, Typography } from "@material-tailwind/react";
import MetaData from "../../Layout/MetaData";

const QualityRecoList = () => {
    const [allQualityReco, setAllQualityReco] = useState([]);

    const qualityRecoList = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await axios.get(
                `${process.env.REACT_APP_API}/admin/quality/recommendations/all`,
                config
            );
            setAllQualityReco(response.data.qualityReco);
        } catch (error) {
            console.error("Error fetching quality data:", error);
        }
    };

    useEffect(() => {
        qualityRecoList();
    }, []);

    const deleteQualityReco = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${getToken()}`
                },
            };
            await axios.delete(`${process.env.REACT_APP_API}/admin/quality/recommendations/${id}`, config);
            qualityRecoList();
        } catch (error) {
            console.error("Error deleting quality data:", error);
        }
    };

    const columns = [
        {
            name: "factor",
            label: "Factor",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
            },
        },
        {
            name: "value",
            label: "Value",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
            },
        },
        {
            name: "recommendation",
            label: "Recommendation",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
            },
        },
        {
            name: "image",
            label: "Image",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    console.log(value); // Log the image URLs
                    return (
                        <div style={{ display: 'flex' }}>
                            {value && <img src={value.url} alt={value.name} style={{ width: '80px', height: 'auto'}} />}
                        </div>
                    );
                },
            },
        },
        {
            name: "actions",
            label: "Actions",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <Fragment>
                            <Link to={`/admin/quality/recommendations/${allQualityReco[dataIndex]._id}`}>
                                <Tooltip
                                    className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                                    content={
                                        <Typography
                                            color="blue-gray"
                                            variant="small"
                                            className="font-normal opacity-80"
                                        >
                                            Update Recommendation
                                        </Typography>
                                    }
                                    animate={{
                                        mount: { scale: 1, y: 0 },
                                        unmount: { scale: 0, y: 25 },
                                    }}
                                >
                                    <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mr-2">
                                        <PencilSquareIcon className="h-5 w-5" />
                                    </button>
                                </Tooltip>
                            </Link>
                            <Tooltip
                                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                                content={
                                    <Typography
                                        color="blue-gray"
                                        variant="small"
                                        className="font-normal opacity-80"
                                    >
                                        Delete Recommendation
                                    </Typography>
                                }
                                animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0, y: 25 },
                                }}
                            >
                                <button
                                    onClick={() => handleDelete(allQualityReco[dataIndex]._id)}
                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </Tooltip>
                        </Fragment>
                    );
                },
            },
        },
    ];

    const handleDelete = (id) => {
        deleteQualityReco(id)
    }

    const datas = {
        rows: allQualityReco,
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
                            padding: "7px 0",
                            fontSize: "12px",
                            backgroundColor: "#75CD60",
                        },
                        body: {
                            padding: " 7px 8px",
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
                    <MetaData title={'All Quality Recommendation'} />

            <div className="w-100">
                <Sidebar />
            </div>
            <div className="flex-1 py-10">
                <div className="ml-[21rem] mr-6">
                    <a href="/admin/quality/recommendation/new">
                        <Button variant='filled' color='teal'  className="mb-6" >Add Recommendation</Button>
                    </a>
                    <ThemeProvider theme={muiTheme()}>
                        {allQualityReco.length > 0 && (
                            <MUIDataTable
                                title={"All Quality Recommendation"}
                                data={allQualityReco}
                                columns={columns}
                                options={options}
                                class="datatables"
                            />
                        )}
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
};

export default QualityRecoList;

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
            name: "images",
            label: "Images",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    console.log(value); // Log the image URLs
                    return (
                        <div style={{ display: 'flex' }}>
                            {Array.isArray(value) && value.map((image, index) => (
                                <img key={index} src={image.url} alt={`Image ${index}`} style={{ width: '80px', height: 'auto', marginRight: '10px' }} />
                            ))}
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
                                <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mr-2">
                                    <PencilSquareIcon className="h-5 w-5" />
                                </button>
                            </Link>
                            <button
                                onClick={() => handleDelete(allQualityReco[dataIndex]._id)}
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </button>
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
        <div className="flex">
            <div className="w-100">
                <Sidebar />
            </div>
            <div className="flex-1 py-10">
                <div className="ml-[21rem] mr-6">
                    <a href="/admin/quality/recommendation/new">
                        <Button variant='outlined' color='teal'>Add Recommendation</Button>
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

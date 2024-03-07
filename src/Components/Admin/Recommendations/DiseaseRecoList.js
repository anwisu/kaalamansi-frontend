import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Sidebar from "../Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@material-tailwind/react";
import { getToken } from "../../../utils/helpers";
import {
    TrashIcon
} from '@heroicons/react/24/solid';

const DiseaseRecoList = () => {
    const [allDiseaseReco, setAllDiseaseReco] = useState([]);

    const diseaseRecoList = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await axios.get(
                `${process.env.REACT_APP_API}/admin/disease/recommendations/all`,
                config
            );
            setAllDiseaseReco(response.data.diseaseReco);
        } catch (error) {
            console.error("Error fetching disease data:", error);
        }
    };

    useEffect(() => {
        diseaseRecoList();
    }, []);

    // const deleteDisease = async (id) => {
    //     try {
    //         const config = {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 'Authorization': `Bearer ${getToken()}`
    //             },
    //         };
    //         await axios.delete(`${process.env.REACT_APP_API}/admin/disease/${id}`, config);
    //         // Refresh the disease list after deletion
    //         diseaseList();
    //     } catch (error) {
    //         console.error("Error deleting disease data:", error);
    //     }
    // };

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
                        <div style={{ display: 'flex'}}>
                        {Array.isArray(value) && value.map((image, index) => (
                            <img key={index} src={image.url} alt={`Image ${index}`} style={{ width: '80px', height: 'auto', marginRight: '10px' }} />
                        ))}
                        </div>
                    );
                },
            },
        },
        // {
        //     name: "actions",
        //     label: "Actions",
        //     options: {
        //         filter: false,
        //         sort: false,
        //         empty: true,
        //         customBodyRenderLite: (dataIndex) => {
        //             return (
        //                 <Fragment>
        //                     <button
        //                         onClick={() => handleDelete(allDiseasePredicts[dataIndex]._id)}
        //                         className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
        //                     >
        //                         <TrashIcon className="h-5 w-5" />
        //                     </button>
        //                 </Fragment>
        //             );
        //         },
        //     },
        // },
    ];

    // const handleDelete = (id) => {
    //     deleteDisease(id)
    // }

    const datas = {
        rows: allDiseaseReco,
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
                    <a href="/admin/disease/recommendation/new">
                        <Button variant='outlined' color='teal'>Add Recommendation</Button>
                    </a>
                    <ThemeProvider theme={muiTheme()}>
                        {allDiseaseReco.length > 0 && (
                            <MUIDataTable
                                title={"All Disease Recommendation"}
                                data={allDiseaseReco}
                                columns={columns}
                                options={options}
                                class="datatables"
                            />
                        )}
                    </ThemeProvider>
                </div>
            </div>
        </div>
    )
}

export default DiseaseRecoList
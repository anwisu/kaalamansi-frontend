import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getToken } from "../../utils/helpers";
import {
    TrashIcon
} from '@heroicons/react/24/solid';

const UserQualityPredictions = () => {
    const [mePredictions, setMePredictions] = useState([]);

    const fetchPredictions = async () => {
        try {
            const token = getToken();
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            };
            const response = await axios.get(
                `${process.env.REACT_APP_API}/me/quality/predictions/all`,
                config
            );
            setMePredictions(response.data.user_predictions);
        } catch (error) {
            console.error("Error fetching quality predictions:", error);
        }
    };

    useEffect(() => {
        fetchPredictions();
    }, []);
    
    console.log(mePredictions);

    const columns = [
        {
            name: "quality_data",
            label: "Fruit Appearance",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <Fragment>
                            <p className={"capitalize"}>Size: {value.size}</p>
                            <p className={"capitalize"}>Firmness: {value.firmness}</p>
                            <p className={"capitalize"}>Shape: {value.shape}</p>
                            <p className={"capitalize"}>Skin Color: {value.skin_color}</p>
                            <p className={"capitalize"}>Blemishes: {value.blemishes}</p>
                        </Fragment>
                    );
                },
            },
        },
        {
            name: "quality_data",
            label: "Environmental Factors",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <Fragment>
                            <p className={"capitalize"}>Soil Type: {value.soil_type}</p>
                            <p className={"capitalize"}>Sun Exposure: {value.sun_exposure}</p>
                            <p className={"capitalize"}>Location: {value.location}</p>
                            <p className={"capitalize"}>Pest Presence: {value.pest_presence}</p>
                        </Fragment>
                    );
                },
            },
        },
        {
            name: "quality_data",
            label: "Cultivation Practices",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <Fragment>
                            <p className={"capitalize"}>Fertilized: {value.fertilized}</p>
                            <p className={"capitalize"}>Watering Schedule: {value.watering_sched}</p>
                            <p className={"capitalize"}>Pruning: {value.pruning}</p>
                        </Fragment>
                    );
                },
            },
        },
        {
            name: "quality_data",
            label: "Prediction",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => (
                    <p
                        className={`capitalize px-3 py-1 bg-green-500 inline-block rounded-full 
            ${value.predicted_quality == "low" ? "bg-red-500" : "bg-green-500"}`}
                    >
                        {value.predicted_quality}
                    </p>
                ),
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

        //                 </Fragment>
        //             );
        //         },
        //     },
        // },
    ];

    if (mePredictions.some(item => item.soil_recommendation)) {
        columns.push({
            name: "soil_recommendation",
            label: "Soil Recommendation",
            options: {
                filter: true,
                sort: true,
            },
        });
    }

    // Check if any data object has a watering recommendation
    if (mePredictions.some(item => item.watering_recommendation)) {
        columns.push({
            name: "watering_recommendation",
            label: "Watering Recommendation",
            options: {
                filter: true,
                sort: true,
            },
        });
    }

    // Check if any data object has a sun recommendation
    if (mePredictions.some(item => item.sun_recommendation)) {
        columns.push({
            name: "sun_recommendation",
            label: "Sun Recommendation",
            options: {
                filter: true,
                sort: true,
            },
        });
    }

    const datas = {
        rows: mePredictions,
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
            <div className="flex-1 py-10">
                <div>
                    <ThemeProvider theme={muiTheme()}>
                        {mePredictions.length > 0 && (
                            <MUIDataTable
                                title={"Predicted Quality"}
                                data={mePredictions}
                                columns={columns}
                                options={options}
                            />
                        )}
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
}

export default UserQualityPredictions
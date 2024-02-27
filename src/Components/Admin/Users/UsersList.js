import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../utils/helpers";
import Sidebar from "../Sidebar";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const UsersList = () => {
    const [allUsers, setAllUsers] = useState([]);

    const userList = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${getToken()}`
                },
            };
            const response = await axios.get(
                `${process.env.REACT_APP_API}/admin/users`,
                config
            );
            setAllUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    
    useEffect(() => {
        userList();
    }, []);

    const columns = [
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
            },
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p>{value}</p>,
            },
        },
        {
            name: "role",
            label: "Role",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
            },
        },
    ];

    const datas = {
        rows: allUsers,
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
            <div className="flex-1 py-10">
                <div className="mx-auto">
                    <ThemeProvider theme={muiTheme()}>
                        {allUsers.length > 0 && (
                            <MUIDataTable
                                title={"All Users"}
                                data={allUsers}
                                columns={columns}
                                options={options}
                                className="datatables"
                            />
                        )}
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
};

export default UsersList;

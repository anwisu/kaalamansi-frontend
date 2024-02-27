import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { getToken } from "../../../utils/helpers";
import Sidebar from "../Sidebar";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { 
    PencilSquareIcon, 
    TrashIcon 
} from '@heroicons/react/24/solid';



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

    const updateUser = async (id, updatedData) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${getToken()}`
                },
            };
            await axios.put(`${process.env.REACT_APP_API}/admin/users/${id}`, updatedData, config);
            // After updating, refresh the user list
            userList();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
    
    const deleteUser = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${getToken()}`
                },
            };
            await axios.delete(`${process.env.REACT_APP_API}/admin/users/${id}`, config);
            // After deleting, refresh the user list
            userList();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

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
                        <button 
                            onClick={() => handleUpdate(allUsers[dataIndex]._id)}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 ml-2"
                        >
                            <PencilSquareIcon className="h-5 w-5"/>
                        </button>
                        <button 
                            onClick={() => handleDelete(allUsers[dataIndex]._id)}
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                        >
                            <TrashIcon className="h-5 w-5"/>
                        </button>
                    </Fragment>
                    );
                },
            },
        },
    ];

    const handleUpdate = (id) => {
        // Here you need to implement the logic to get the updated data
        // For example, you can open a modal with a form to edit the user data
        // Once you have the updated data, you can call the updateUser function
        const updatedData = {}; // Replace this with the actual updated data
        updateUser(id, updatedData);
    }

    const handleDelete = (id) => {
        deleteUser(id)
    }

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
                <div className="ml-[21rem] mr-6">
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

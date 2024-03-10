import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getToken } from "../../../utils/helpers";
import Sidebar from "../Sidebar";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import MetaData from "../../Layout/MetaData";

const UsersList = () => {
  const [allUsers, setAllUsers] = useState([]);

  const userList = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
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

  const deleteUser = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_API}/admin/users/${id}`,
        config
      );
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
      name: "avatar",
      label: "Avatar",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          console.log(value); // Log the image URLs
          return (
            <div style={{ display: 'flex' }}>
              {value && <img src={value.url} alt={value.name} style={{ width: '80px', height: 'auto' }} />}
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
              <Link to={`/admin/users/${allUsers[dataIndex]._id}`}>
                <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mr-2">
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </Link>
              <button
                onClick={() => handleDelete(allUsers[dataIndex]._id)}
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
    deleteUser(id);
  };

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
    <div className="flex" style={{
      minHeight: '100vh',
      background: 'rgb(12,109,77)',
      background: 'linear-gradient(356deg, rgba(12,109,77,1) 0%, rgba(51,207,96,1) 35%, rgba(142,234,147,0.8991246156665791) 100%)'
    }}>
      <MetaData title={'All Users'} />
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

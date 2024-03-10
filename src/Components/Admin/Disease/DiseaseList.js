import React, { useState, useEffect, Fragment  } from "react";
// import { MDBDataTable, MDBBtn } from "mdbreact";
// import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Sidebar from "../Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getToken } from "../../../utils/helpers";
import { 
  TrashIcon 
} from '@heroicons/react/24/solid';

const DiseaseList = () => {
  const [allDiseasePredicts, setAllDiseasePredicts] = useState([]);

  const diseaseList = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API}/admin/disease/all`,
        config
      );
      console.log(response.data.disease_data);
      setAllDiseasePredicts(response.data.disease_data);
    } catch (error) {
      console.error("Error fetching disease data:", error);
    }
  };

  useEffect(() => {
    diseaseList();
  }, []);

  const deleteDisease = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${getToken()}`
        },
      };
      await axios.delete(`${process.env.REACT_APP_API}/admin/disease/${id}`, config);
      diseaseList();
      window.location.reload()
    } catch (error) {
      console.error("Error deleting disease data:", error);
    }
  };

  //   { label: "Leaf Spots", label: "leaf_spots", sort: "asc" },
  //   { label: "Wilting", label: "wilting", sort: "asc" },
  //   { label: "Discoloration", label: "discoloration", sort: "asc" },
  //   { label: "Lesions", label: "lesions", sort: "asc" },
  //   { label: "Fertilized", label: "fertilized", sort: "asc" },
  //   { label: "Watering Schedule", label: "watering_sched", sort: "asc" },
  //   { label: "Pruning", label: "pruning", sort: "asc" },
  //   { label: "Pesticide", label: "pesticide_use", sort: "asc" },
  //   { label: "Pest Presence", label: "pest_presence", sort: "asc" },
  //   { label: "Prediction", label: "predicted_disease", sort: "asc" },
  //   {
  //     label: "Actions",
  //     label: "actions",
  //     render: (rowData) => (
  //       <div>
  //         <Link
  //           to={`/admin/pet/update/${rowData._id}`}
  //           classlabel="btn btn-success py-1 px-1 me-2"
  //         >
  //           <i classlabel="fa fa-pencil"></i>
  //         </Link>
  //         {/* <button classlabel="btn btn-danger py-1 px-2 ml-2" onClick={() => handleDelete(rowData._id)}>
  //                       <i classlabel="fa fa-trash"></i>
  //                   </button> */}
  //       </div>
  //     ),
  //   },
  // ];

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
      label: "Prediction",
      name: "predicted_disease",
      sort: "asc",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <p
            className={`capitalize px-3 py-1 bg-green-500 inline-block rounded-full text-center ${value == "infected" ? "bg-red-500" : "bg-green-500"
              }`}
          >
            {value}
          </p>
        ),
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
                onClick={() => handleDelete(allDiseasePredicts[dataIndex]._id)}
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
    if (id) {
      deleteDisease(id)
    } else {
      console.error('Cannot delete disease: ID is undefined');
    }
  }

  const options = {
    selectableRows: "none", // or 'multiple' or 'single' based on your requirements
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20, 30],
    resizable: true,
    print: false,
    onTableChange: (action, tableData) => {
      if (action === "rowsUpdated") {
        console.log("Transformed Data:", tableData.displayData);
      }
    },
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
            {allDiseasePredicts.length > 0 ? (
              <MUIDataTable
                title={"Predicted Disease"}
                data={allDiseasePredicts}
                columns={columns}
                options={options}
                className="datatables"
              />
            ) : (
              <p>No data available</p>
            )}
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default DiseaseList;

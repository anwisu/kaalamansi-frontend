import React, { useState, useEffect } from "react";
// import { MDBDataTable } from "mdbreact";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Sidebar from "../Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const QualityList = () => {
  const [allQualityPredicts, setAllQualityPredicts] = useState([]);

  const qualityList = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API}/admin/quality/all`,
        config
      );
      setAllQualityPredicts(response.data.quality_data);
    } catch (error) {
      console.error("Error fetching quality data:", error);
    }
  };

  useEffect(() => {
    qualityList();
  }, []);

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
      name: "pest_presence",
      label: "Pest Presence",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => <p className={"capitalize"}>{value}</p>,
      },
    },
    {
      name: "predicted_quality",
      label: "Prediction",
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
    rows: allQualityPredicts,
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
    // <div class="py-10 min-h-screen place-items-center">

    //   <div class="mx-auto">

    //     <ThemeProvider theme={muiTheme()}>
    //       {allQualityPredicts.length > 0 && (
    //         <MUIDataTable
    //           title={"Predicted Quality"}
    //           data={allQualityPredicts}
    //           columns={columns}
    //           options={options}
    //           class="datatables"
    //         />
    //       )}
    //     </ThemeProvider>
    //   </div>
    // </div>
    <div className="flex">
      <div className="w-100">
        <Sidebar />
      </div>
      <div className="flex-1 py-10">
        <div className="mx-auto">
          <ThemeProvider theme={muiTheme()}>
            {allQualityPredicts.length > 0 && (
              <MUIDataTable
                title={"Predicted Quality"}
                data={allQualityPredicts}
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

export default QualityList;
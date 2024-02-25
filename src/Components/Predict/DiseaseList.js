import React, { useState, useEffect } from "react";
import { MDBDataTable, MDBBtn } from "mdbreact";
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";

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
        `${process.env.REACT_APP_API}/disease/all`,
        config
      );
      setAllDiseasePredicts(response.data.disease_data);
    } catch (error) {
      console.error("Error fetching disease data:", error);
    }
  };

  useEffect(() => {
    diseaseList();
  }, []);

  const columns = [
    { label: "Leaf Spots", field: "leaf_spots", sort: "asc" },
    { label: "Wilting", field: "wilting", sort: "asc" },
    { label: "Discoloration", field: "discoloration", sort: "asc" },
    { label: "Lesions", field: "lesions", sort: "asc" },
    { label: "Fertilized", field: "fertilized", sort: "asc" },
    { label: "Watering Schedule", field: "watering_sched", sort: "asc" },
    { label: "Pruning", field: "pruning", sort: "asc" },
    { label: "Pesticide", field: "pesticide_use", sort: "asc" },
    { label: "Pest Presence", field: "pest_presence", sort: "asc" },
    { label: "Prediction", field: "predicted_disease", sort: "asc" },
    {
      label: "Actions",
      field: "actions",
      render: (rowData) => (
        <div>
          <Link
            to={`/admin/pet/update/${rowData._id}`}
            className="btn btn-success py-1 px-1 me-2"
          >
            <i className="fa fa-pencil"></i>
          </Link>
          {/* <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => handleDelete(rowData._id)}>
                        <i className="fa fa-trash"></i>
                    </button> */}
        </div>
      ),
    },
  ];

  const data = {
    columns,
    rows: allDiseasePredicts,
  };

  // handle delete action
  // const handleDelete = (id) => {
  //     // Implement your delete logic here, using the provided id
  //     console.log('Delete clicked for id:', id);
  // };

  return (
    <div className="container pl-20">
      <h1 className="my-5 text-gray-900">All Disease Predictions</h1>
      <MDBDataTable
        striped
        data={data}
        bordered
        hover
        className="table text-gray-800"
      />
    </div>
  );
};

export default DiseaseList;

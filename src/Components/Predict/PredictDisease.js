import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PredictDisease = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/predict/disease`,
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Frontend Response Data:", response.data);
      if (response.data && response.data.inserted_data) {
        navigate("/disease/result", {
          state: { diseaseData: response.data.inserted_data },
        });
      } else {
        setError("Prediction failed. Please try again.");
      }
    } catch (error) {
      console.error("Prediction request failed:", error);
      console.error("Error Response:", error.response);
      setError("Prediction failed. Please try again.");
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1
              className="text-3xl font-bold text-center mt-5 mb-5 w-screen p-3"
              style={{
                color: "#58B741",
                fontFamily: "League Spartan",
                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
              }}
            >
              Kalamansi Disease Prediction
            </h1>
            <div className="pl-56 pb-10">
              <form
                class="grid justify-center items-center"
                onSubmit={handleSubmit}
              >
                {/* Input fields for features */}
                <div class="flex space-x-4 ">
                  <div class="cards" id="form">
                    <h4
                      className="text-2xl font-bold text-center mt-5 mb-5"
                      style={{
                        color: "#58B741",
                        fontFamily: "League Spartan",
                        textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      Visual Symptoms
                    </h4>
                    <div class="w-full pl-10 flex">
                      <div class="relative h-10 w-100 ">
                        <select
                          id="discoloration"
                          name="discoloration"
                          class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        >
                          <option disabled selected>
                            Select discoloration
                          </option>
                          <option value="Absent">Absent</option>
                          <option value="Present">Present</option>
                        </select>
                        <label
                          for="discoloration"
                          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[14px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                          Discoloration:
                        </label>
                        {/* <div class="flex flex-wrap">
                          <div class="flex items-center me-4">
                            <input
                              id="absent-radio"
                              type="radio"
                              value="Absent"
                              name="leaf_spots"
                              class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              for="absent-radio"
                              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Absent
                            </label>
                          </div>
                          <div class="flex items-center me-4">
                            <input
                              id="mild-radio"
                              type="radio"
                              value="Mild"
                              name="leaf_spots"
                              class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              for="mild-radio"
                              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Mild
                            </label>
                          </div>
                          <div class="flex items-center me-4">
                            <input
                              id="moderate-radio"
                              type="radio"
                              value="Moderate"
                              name="leaf_spots"
                              class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              for="moderate-radio"
                              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Moderate
                            </label>
                          </div>
                          <div class="flex items-center me-4">
                            <input
                              id="severe-radio"
                              type="radio"
                              value="Severe"
                              name="leaf_spots"
                              class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              for="severe-radio"
                              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Severe
                            </label>
                          </div>
                        </div>
                        <label
                          for="leaf_spots"
                          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[14px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                          Leaf Spots:
                        </label> */}
                        <div class="relative h-10 w-100  mt-6">
                          <select
                            id="lesions"
                            name="lesions"
                            class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          >
                            <option disabled selected>
                              Select Lesions
                            </option>
                            <option value="Absent">Absent</option>
                            <option value="Present">Present</option>
                          </select>
                          <label
                            for="lesions"
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[14px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                          >
                            Lesions:
                          </label>
                        </div>

                        <div class="relative h-10 w-100 mt-6">
                          <div class="grid grid-cols-2 gap-4  ml-4">
                            <div class="flex items-center mt-3">
                              <input
                                id="wilting"
                                type="radio"
                                value="Absent"
                                name="wilting"
                                class="radio radio-success h-4 w-4"
                              />
                              <label
                                for="wilting"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                              >
                                Absent
                              </label>
                            </div>
                            <div class="flex items-center mt-3">
                              <input
                                id="wilting"
                                type="radio"
                                value="Mild"
                                name="wilting"
                                class="radio radio-success  h-4 w-4"
                              />
                              <label
                                for="wilting"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                              >
                                Mild
                              </label>
                            </div>
                          </div>
                          <div class="grid grid-cols-2 gap-4 mt-1  ml-4">
                            <div class="flex items-center">
                              <input
                                id="wilting"
                                type="radio"
                                value="Moderate"
                                name="wilting"
                                class="radio radio-success  h-4 w-4"
                              />
                              <label
                                for="wilting"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                              >
                                Moderate
                              </label>
                            </div>
                            <div class="flex items-center">
                              <input
                                id="wilting"
                                type="radio"
                                value="Severe"
                                name="wilting"
                                class="radio radio-success h-4 w-4"
                              />
                              <label
                                for="wilting"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                              >
                                Severe
                              </label>
                            </div>
                          </div>

                          <label
                            for="wilting"
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:h-1.5 before:w-2.5 after:mt-[6.5px] after:ml-1 after:h-1.5 after:w-2.5">
                            Wilting:
                          </label>
                        </div>

                        <div class="relative h-10 w-100 mt-10">
                          <div class="grid grid-cols-2 gap-4  ml-4">
                            <div class="flex items-center mt-3">
                              <input
                                id="leaf_spots"
                                name="leaf_spots"
                                type="radio"
                                value="Absent"
                                class="radio radio-success h-4 w-4"
                              />
                              <label
                                for="leaf_spots"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                              >
                                Absent
                              </label>
                            </div>
                            <div class="flex items-center mt-3">
                              <input
                                id="leaf_spots"
                                name="leaf_spots"
                                type="radio"
                                value="Mild"
                                class="radio radio-success  h-4 w-4"
                              />
                              <label
                                for="leaf_spots"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                              >
                                Mild
                              </label>
                            </div>
                          </div>
                          <div class="grid grid-cols-2 gap-4 mt-1 ml-4">
                            <div class="flex items-center">
                              <input
                                id="leaf_spots"
                                name="leaf_spots"
                                type="radio"
                                value="Moderate"
                                class="radio radio-success  h-4 w-4"
                              />
                              <label
                                for="leaf_spots"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                              >
                                Moderate
                              </label>
                            </div>
                            <div class="flex items-center">
                              <input
                                id="leaf_spots"
                                name="leaf_spots"
                                type="radio"
                                value="Severe"
                                class="radio radio-success h-4 w-4"
                              />
                              <label
                                for="leaf_spots"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                              >
                                Severe
                              </label>
                            </div>
                          </div>

                          <label
                            for="leaf_spots"
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:h-1.5 before:w-2.5 after:mt-[6.5px] after:ml-1 after:h-1.5 after:w-2.5"
                          >
                            Leaf Spots:
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="cards" id="form">
                    <h4
                      className="text-2xl font-bold text-center mt-5 mb-5"
                      style={{
                        color: "#58B741",
                        fontFamily: "League Spartan",
                        textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      Cultivation Practices
                    </h4>
                    <div class="w-full flex pl-12">
                      <div class="relative h-10 w-100">
                        <select
                          id="fertilized"
                          name="fertilized"
                          class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        >
                          <option disabled selected>
                            Select Fertilized
                          </option>
                          <option value="No">Not Fertilized</option>
                          <option value="Yes">Fertilized</option>
                        </select>
                        <label
                          for="fertilized"
                          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[14px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                          Fertilizer:
                        </label>
                        <div class="relative h-10 w-100 mt-3">
                          <select
                            id="watering_sched"
                            name="watering_sched"
                            class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          >
                            <option disabled selected>
                              Select watering schedule
                            </option>
                            <option value="Regular">Regular</option>
                            <option value="Irregular">Irregular</option>
                          </select>
                          <label
                            for="watering_sched"
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[14px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                          >
                            Watering Schedule:
                          </label>
                        </div>
                        <div class="relative h-10 w-100 mt-3">
                          <select
                            id="pruning"
                            name="pruning"
                            class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          >
                            <option disabled selected>
                              Select pruning
                            </option>
                            <option value="Never">Never</option>
                            <option value="Occasional">Occasional</option>
                            <option value="Regular">Regular</option>
                            <option value="Frequent">Frequent</option>
                          </select>
                          <label
                            for="pruning"
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[14px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                          >
                            Pruning:
                          </label>
                        </div>
                        <div class="relative h-10 w-100 mt-3">
                          <select
                            id="pesticide_use"
                            name="pesticide_use"
                            class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          >
                            <option disabled selected>
                              Select Pesticide
                            </option>
                            <option value="Nothing">None</option>
                            <option value="Fungicide">Fungicide</option>
                            <option value="Insecticide">Insecticide</option>
                          </select>
                          <label
                            for="pesticide_use"
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[14px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                          >
                            Pesticide:
                          </label>
                        </div>
                        <div class="relative h-10 w-100 mt-3">
                          <select
                            id="pest_presence"
                            name="pest_presence"
                            class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          >
                            <option disabled selected>
                              Select Pesticide
                            </option>
                            <option value="Absent">Absent</option>
                            <option value="Present">Present</option>
                          </select>
                          <label
                            for="pest_presence"
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[14px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                          >
                            Pest Presence:
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" class="buttons w-50 items-center mx-auto">
                  <div class="svg-wrapper-1">
                    <div class="svg-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <span>Predict</span>
                </button>
              </form>
              {error && <p>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PredictDisease;

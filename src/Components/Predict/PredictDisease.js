import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/helpers";
import MetaData from "../Layout/MetaData";
import { useFormik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const PredictDisease = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    discoloration: Yup.string().required("Discoloration is required"),
    lesions: Yup.string().required("Lesions is required"),
    wilting: Yup.string().required("Wilting is required"),
    leaf_spots: Yup.string().required("Leaf Spots is required"),
    fertilized: Yup.string().required("Fertilized is required"),
    watering_sched: Yup.string().required("Watering Schedule is required"),
    pruning: Yup.string().required("Pruning is required"),
    pesticide_use: Yup.string().required("Pesticide is required"),
    pest_presence: Yup.string().required("Pest Presence is required"),
  });

  const formik = useFormik({
    initialValues: {
      discoloration: "",
      lesions: "",
      wilting: "",
      leaf_spots: "",
      fertilized: "",
      watering_sched: "",
      pruning: "",
      pesticide_use: "",
      pest_presence: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }

        const response = await axios.post(
          `${process.env.REACT_APP_API}/predict/disease`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if (response.data && response.data.disease_data) {
          console.log(response.data.disease_data._id); // Log the id
          navigate(`/predict/disease/${response.data.disease_data._id}`);
          toast.success("Predicted Disease Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error("Prediction Failed. Try Again!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } catch (error) {
        console.error("Error during form submission:", error.message);
        setError("Prediction failed. Please try again.");
      }
    },
  });

  return (
    <Fragment>
      <MetaData title={"Predict Disease"} />
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
                onSubmit={formik.handleSubmit}
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
                      <div class="relative h-10 w-100 mt-1">
                        <select
                          id="discoloration"
                          name="discoloration"
                          onChange={formik.handleChange}
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
                        {formik.touched.discoloration &&
                          formik.errors.discoloration && (
                            <div className="error text-red-500">
                              {formik.errors.discoloration}
                            </div>
                          )}
                        <div class="relative h-10 w-100  mt-3">
                          <select
                            id="lesions"
                            name="lesions"
                            onChange={formik.handleChange}
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
                          {formik.touched.lesions &&
                          formik.errors.lesions && (
                            <div className="error text-red-500">
                              {formik.errors.lesions}
                            </div>
                          )}
                        </div>

                        <div class="relative h-10 w-100 mt-7">
                          <div class="grid grid-cols-2 gap-4  ml-4">
                            <div class="flex items-center mt-3">
                              <input
                                id="wilting"
                                type="radio"
                                value="Absent"
                                name="wilting"
                                onChange={formik.handleChange}
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
                                onChange={formik.handleChange}
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
                                onChange={formik.handleChange}
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
                                onChange={formik.handleChange}
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
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:h-1.5 before:w-2.5 after:mt-[6.5px] after:ml-1 after:h-1.5 after:w-2.5"
                          >
                            Wilting:
                          </label>
                          {formik.touched.wilting &&
                          formik.errors.wilting && (
                            <div className="error text-red-500 pl-3">
                              {formik.errors.wilting}
                            </div>
                          )}
                        </div>

                        <div class="relative h-10 w-100 mt-12">
                          <div class="grid grid-cols-2 gap-4  ml-4">
                            <div class="flex items-center mt-3">
                              <input
                                id="leaf_spots"
                                name="leaf_spots"
                                type="radio"
                                value="Absent"
                                onChange={formik.handleChange}
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
                                onChange={formik.handleChange}
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
                                onChange={formik.handleChange}
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
                                onChange={formik.handleChange}
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
                           {formik.touched.leaf_spots &&
                          formik.errors.leaf_spots && (
                            <div className="error text-red-500 pl-3">
                              {formik.errors.leaf_spots}
                            </div>
                          )}
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
                    <div class="w-full flex pl-10">
                        <div class="relative h-10 w-100 mt-2">
                        <select
                          id="fertilized"
                          name="fertilized"
                          onChange={formik.handleChange}
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
                        {formik.touched.fertilized &&
                          formik.errors.fertilized && (
                            <div className="error text-red-500">
                              {formik.errors.fertilized}
                            </div>
                          )}
                        <div class="relative h-10 w-100 mt-5">
                          <select
                            id="watering_sched"
                            name="watering_sched"
                            onChange={formik.handleChange}
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
                          {formik.touched.watering_sched &&
                            formik.errors.watering_sched && (
                              <div className="error text-red-500">
                                {formik.errors.watering_sched}
                              </div>
                            )}
                        </div>
                        <div class="relative h-10 w-100 mt-6">
                          <select
                            id="pruning"
                            name="pruning"
                            onChange={formik.handleChange}
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
                          {formik.touched.pruning && formik.errors.pruning && (
                            <div className="error text-red-500">
                              {formik.errors.pruning}
                            </div>
                          )}
                        </div>
                        <div class="relative h-10 w-100 mt-6">
                          <select
                            id="pesticide_use"
                            name="pesticide_use"
                            onChange={formik.handleChange}
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
                          {formik.touched.pesticide_use &&
                            formik.errors.pesticide_use && (
                              <div className="error text-red-500">
                                {formik.errors.pesticide_use}
                              </div>
                            )}
                        </div>
                        <div class="relative h-10 w-100 mt-6">
                          <select
                            id="pest_presence"
                            name="pest_presence"
                            onChange={formik.handleChange}
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
                          {formik.touched.pest_presence &&
                            formik.errors.pest_presence && (
                              <div className="error text-red-500">
                                {formik.errors.pest_presence}
                              </div>
                            )}
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

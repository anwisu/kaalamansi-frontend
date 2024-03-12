import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/helpers";
import MetaData from "../Layout/MetaData";
import { useFormik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PredictQuality = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.target);
  //   const jsonData = {};
  //   formData.forEach((value, key) => {
  //     jsonData[key] = value;
  //   });

  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API}/predict/quality`,
  //       jsonData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           'Authorization': `Bearer ${getToken()}`
  //         },
  //       }
  //     );

  //     if (response.data && response.data.quality_data) {
  //       console.log(response.data.quality_data._id); // Log the id
  //       const result = navigate(`/predict/quality/${response.data.quality_data._id}`);
  //       console.log(result);
  //     } else {
  //       setError("Prediction failed. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Prediction request failed:", error);
  //     setError("Prediction failed. Please try again.");
  //   }
  // };

  const validationSchema = Yup.object().shape({
    size: Yup.string().required("Size is required"),
    firmness: Yup.string().required("Firmness is required"),
    shape: Yup.string().required("Shape is required"),
    skin_color: Yup.string().required("Fruit color is required"),
    blemishes: Yup.string().required("Blemishes is required"),
    soil_type: Yup.string().required("Soil type is required"),
    sun_exposure: Yup.string().required("Sun exposure is required"),
    location: Yup.string().required("Location is required"),
    pest_presence: Yup.string().required("Pest presence is required"),
    fertilized: Yup.string().required("Fertilizer is required"),
    watering_sched: Yup.string().required("Watering schedule is required"),
    pruning: Yup.string().required("Pruning is required"),
  });

  const formik = useFormik({
    initialValues: {
      size: "",
      firmness: "",
      shape: "",
      skin_color: "",
      blemishes: "",
      soil_type: "",
      sun_exposure: "",
      location: "",
      pest_presence: "",
      fertilized: "",
      watering_sched: "",
      pruning: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }

        const response = await axios.post(
          `${process.env.REACT_APP_API}/predict/quality`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
  
        if (response.data && response.data.quality_data) {
          console.log(response.data.quality_data._id); // Log the id
          navigate(`/predict/quality/${response.data.quality_data._id}`);
          toast.success("Predicted Quality Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
           toast.error("Prediction failed. Please try again!", {
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
      <MetaData title={"Predict Quality"} />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1
              className="text-3xl font-bold text-center mb-5 w-screen p-3"
              style={{
                color: "#58B741",
                fontFamily: "League Spartan",
                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#58B741"
                viewBox="0 0 62 62"
                stroke="#58B741"
                className="w-12 h-18 inline-block"
              >
                <path d="M 28.300781 10.800781 C 17.100781 10.800781 7.9003906 20.000391 7.9003906 31.400391 C 7.9003906 42.800391 17.000781 52 28.300781 52 C 33.500781 52 38.200781 50.000781 41.800781 46.800781 L 43 48 L 41.900391 49.099609 C 41.300391 49.699609 41.300391 50.700781 41.900391 51.300781 L 50.900391 60.400391 C 51.200391 60.700391 51.6 60.900391 52 60.900391 C 52.4 60.900391 52.8 60.800391 53 60.400391 L 57 56.400391 C 57.5 55.700391 57.500391 54.799219 56.900391 54.199219 L 47.900391 45.099609 C 47.600391 44.799609 47.200781 44.699219 46.800781 44.699219 C 46.400781 44.699219 46.000781 44.799609 45.800781 45.099609 L 44.800781 46.199219 L 43.599609 45 C 46.799609 41.3 48.699219 36.600391 48.699219 31.400391 C 48.699219 20.000391 39.500781 10.800781 28.300781 10.800781 z M 28.300781 13.900391 C 37.900781 13.900391 45.699219 21.8 45.699219 31.5 C 45.699219 41.2 37.900781 49 28.300781 49 C 18.700781 49 10.900391 41.2 10.900391 31.5 C 10.900391 21.8 18.700781 13.900391 28.300781 13.900391 z M 28.400391 20.099609 C 23.600391 20.099609 19.400781 23.099609 17.800781 27.599609 C 17.500781 28.299609 17.9 29.100781 18.5 29.300781 C 18.6 29.300781 18.8 29.400391 19 29.400391 C 19.5 29.400391 20.000781 29 20.300781 28.5 C 21.500781 25 24.800391 22.699219 28.400391 22.699219 C 29.100391 22.699219 29.699219 22.100391 29.699219 21.400391 C 29.699219 20.700391 29.100391 20.099609 28.400391 20.099609 z M 18.900391 32.5 C 18.200391 32.5 17.599609 33.000781 17.599609 33.800781 L 17.599609 34 C 17.599609 34.7 18.100391 35.300781 18.900391 35.300781 C 19.600391 35.300781 20.199219 34.7 20.199219 34 L 20.199219 33.800781 C 20.199219 33.000781 19.700391 32.5 18.900391 32.5 z M 46.900391 48.300781 L 53.800781 55.300781 L 51.900391 57.199219 L 45 50.199219 L 46.900391 48.300781 z"></path>
              </svg>
              <span>Kalamansi Quality Prediction</span>
            </h1>

            <div className="pl-10 pb-10">
              <form
                class="grid justify-center items-center"
                onSubmit={formik.handleSubmit}
                style={{ paddingLeft: "20%" }}
              >
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
                      Fruit Appearance
                    </h4>
                    <div class="w-full pl-16 flex">
                      <div class="relative h-10 w-100 ">
                        <div class="relative h-10 w-100">
                          <select
                            id="size"
                            name="size"
                            onChange={formik.handleChange}
                            class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          >
                            <option disabled selected>
                              Select size
                            </option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="big">Big</option>
                          </select>
                          <label
                            for="size"
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[14px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                          >
                            Size:
                          </label>
                          {formik.touched.size && formik.errors.size && (
                            <div className="error text-red-500">
                              {formik.errors.size}
                            </div>
                          )}
                        </div>
                        <div class="relative h-10 w-100 mt-10">
                          <select
                            id="firmness"
                            name="firmness"
                            onChange={formik.handleChange}
                            class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          >
                            <option disabled selected>
                              Select firmness
                            </option>
                            <option value="flabby">Flabby</option>
                            <option value="firm">Firm</option>
                          </select>
                          <label
                            for="firmness"
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[14px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                          >
                            Firmness:
                          </label>
                          {formik.touched.firmness &&
                            formik.errors.firmness && (
                              <div className="error text-red-500">
                                {formik.errors.firmness}
                              </div>
                            )}
                        </div>

                        <div class="relative h-10 w-100 mt-10">
                          <select
                            id="shape"
                            name="shape"
                            onChange={formik.handleChange}
                            class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          >
                            <option disabled selected>
                              Select shape
                            </option>
                            <option value="oblong">Oblong</option>
                            <option value="spherical">Spherical</option>
                          </select>
                          <label
                            for="shape"
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[14px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                          >
                            Shape:
                          </label>
                          {formik.touched.shape && formik.errors.shape && (
                            <div className="error text-red-500">
                              {formik.errors.shape}
                            </div>
                          )}
                        </div>
                        <div class="relative h-10 w-100  mt-10">
                          <select
                            id="skin_color"
                            name="skin_color"
                            onChange={formik.handleChange}
                            class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          >
                            <option disabled selected>
                              Select Color
                            </option>
                            <option value="dull yellow">Dull yellow</option>
                            <option value="bright green">Bright green</option>
                            <option value="mixed">Mixed</option>
                          </select>
                          <label
                            for="skin_color"
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[14px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                          >
                            Fruit Color:
                          </label>
                          {formik.touched.skin_color &&
                            formik.errors.skin_color && (
                              <div className="error text-red-500">
                                {formik.errors.skin_color}
                              </div>
                            )}
                        </div>
                        <div class="relative h-10 w-100  mt-10">
                          <select
                            id="blemishes"
                            name="blemishes"
                            onChange={formik.handleChange}
                            class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          >
                            <option disabled selected>
                              Select blemishes
                            </option>
                            <option value="present">Present</option>
                            <option value="not present">Not present</option>
                          </select>
                          <label
                            for="blemishes"
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[14px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                          >
                            Blemishes:
                          </label>
                          {formik.touched.blemishes &&
                            formik.errors.blemishes && (
                              <div className="error text-red-500">
                                {formik.errors.blemishes}
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
                      Environmental Factors
                    </h4>
                    <div class="w-full flex pl-14">
                      <div class="relative h-10 w-100 mt-10">
                        <div class="relative h-10 w-100">
                          <select
                            id="soil_type"
                            name="soil_type"
                            onChange={formik.handleChange}
                            class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          >
                            <option disabled selected>
                              Select soil type
                            </option>
                            <option value="loamy">Loamy</option>
                            <option value="clayey">Clayey</option>
                            <option value="sandy">Sandy</option>
                          </select>{" "}
                          {formik.touched.soil_type &&
                            formik.errors.soil_type && (
                              <div className="error text-red-500">
                                {formik.errors.soil_type}
                              </div>
                            )}
                          <label
                            for="soil_type"
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[14px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                          >
                            Soil Type:
                          </label>
                        </div>
                        <div class="relative h-10 w-100 mt-8">
                          <select
                            id="sun_exposure"
                            name="sun_exposure"
                            onChange={formik.handleChange}
                            class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          >
                            <option disabled selected>
                              Select sun exposure
                            </option>
                            <option value="full shade">Full shade</option>
                            <option value="partial shade">Partial shade</option>
                            <option value="full sun">Full sun</option>
                          </select>
                          <label
                            for="sun_exposure"
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[14px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                          >
                            Sun Exposure:
                          </label>
                          {formik.touched.sun_exposure &&
                            formik.errors.sun_exposure && (
                              <div className="error text-red-500">
                                {formik.errors.sun_exposure}
                              </div>
                            )}
                        </div>
                        <div class="relative h-10 w-100 mt-8">
                          <select
                            id="location"
                            name="location"
                            onChange={formik.handleChange}
                            class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          >
                            <option disabled selected>
                              Select location
                            </option>
                            <option value="patio">Patio</option>
                            <option value="balcony">Balcony</option>
                            <option value="rooftop">Rooftop</option>
                          </select>
                          <label
                            for="location"
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[14px] font-normal leading-tight text-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[14px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                          >
                            Location:
                          </label>
                          {formik.touched.location &&
                            formik.errors.location && (
                              <div className="error text-red-500">
                                {formik.errors.location}
                              </div>
                            )}
                        </div>
                        <div class="relative h-10 w-100 mt-8">
                          <select
                            id="pest_presence"
                            name="pest_presence"
                            onChange={formik.handleChange}
                            class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          >
                            <option disabled selected>
                              Select pest presence
                            </option>
                            <option value="yes">Present</option>
                            <option value="no">Not present</option>
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
                    <div class="w-full flex pl-9">
                      <div class=" relative h-10 w-100 mt-20">
                        <select
                          id="fertilized"
                          name="fertilized"
                          onChange={formik.handleChange}
                          class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        >
                          <option disabled selected>
                            Select Fertilized
                          </option>
                          <option value="not fertilized">Not Fertilized</option>
                          <option value="fertilized">Fertilized</option>
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
                          <option value="regular">Regular</option>
                          <option value="irregular">Irregular</option>
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
                      <div class="relative h-10 w-100 mt-10">
                        <select
                          id="pruning"
                          name="pruning"
                          onChange={formik.handleChange}
                          class="peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        >
                          <option disabled selected>
                            Select pruning
                          </option>
                          <option value="regular">Regular</option>
                          <option value="not regular">Irregular</option>
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
                      <div></div></div>
                    </div>
                  </div>
                </div>
                {/* <button
                  class="outline-none glass shadow-xl w-20 items-center p-3 mx-auto bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px] hover:text-[#035ec5] font-bold"
                  type="submit"
                >
                  Predict
                </button> */}
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

export default PredictQuality;

import React, { useState, useEffect, Fragment } from "react";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Input, Select, Button, Textarea } from "@material-tailwind/react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { getToken } from "../../../utils/helpers";

const UpdateQualityReco = () => {
  const [factor, setFactor] = useState("");
  const [value, setValue] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('')
  const [valueOptions, setValueOptions] = useState([]);
  const [recoDetails, setrecoDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const factorOptions = {
    soil_type: {
      options: ["loamy", "clayey", "sandy"],
      labels: ["Loamy", "Clayey", "Sandy"],
    },
    watering_sched: {
      options: ["regular", "irregular"],
      labels: ["Regular", "Irregular"],
    },
    sun_exposure: {
      options: ["full_shade", "partial_shade", "full_sun"],
      labels: ["Full Shade", "Partial Shade", "Full Sun"],
    },
  };

  const getRecoDetails = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/admin/quality/recommendations/${id}`,
        config
      );
      console.log("Response:", data);

      setFactor(data.qualityReco.factor);
      setValue(data.qualityReco.value);
      setRecommendation(data.qualityReco.recommendation);
      setImagePreview(data.qualityReco.image.url);
    } catch (error) {
      console.error(error);
      console.log(error.response.data.message); // Add this line
      setError(error.response.data.message);
    }
  };

  const updateReco = async (id, recoData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/admin/quality/recommendations/${id}`,
        recoData,
        config
      );
      setIsUpdated(data.success);
      setLoading(false);

      navigate("/admin/quality/recommendations/all");
      window.location.reload();
    } catch (error) {
      setError(error.response.data.message);
    }
  };


  useEffect(() => {
    getRecoDetails(id);
  }, [id]);

  useEffect(() => {
    if (factor in factorOptions) {
      setValueOptions(factorOptions[factor].options);
    } else {
      setValueOptions([]);
    }

    if (error) {
      console.log(error);
      toast.error(error, {
        position: "top-right",
      });
    }
    if (isUpdated) {
      navigate("/admin/quality/recommendations/all");
      window.location.reload();
    }
  }, [error, isUpdated, factor]);

  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setImage(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('factor', factor);
    formData.append('value', value);
    formData.append('recommendation', recommendation);
    if (image) {
      formData.append('image', image);
    }
    updateReco(id, formData);
  };
  return (
    <Fragment>
      <div className="flex">
        <div className="w-100">
          <Sidebar />
        </div>
        <div className="flex-1 py-10">
          <div className="ml-[21rem] mr-20">
            <h1
              className="text-2xl font-bold mb-4 text-gray-900"
              style={{
                fontSize: "30px",
                color: "#4AA032",
                fontFamily: "League Spartan",
              }}
            >
              Update Quality Recommendation
            </h1>
            <form
              onSubmit={submitHandler}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <label
                htmlFor="factor"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Factor
              </label>
              <select
                className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-green-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-green-900 focus:border-t-transparent focus:!border-t-green-900 focus:outline-0 focus:ring-green-900/10 disabled:border-0 disabled:bg-blue-gray-50"
                name="factor"
                value={factor}
                onChange={(e) => {
                  setFactor(e.target.value);
                  // Update value options based on selected factor
                  setValueOptions(factorOptions[e.target.value]?.options || []);
                }}
                color="lightBlue"
                size="regular"
                outline={false}
              >
                <option value="">Select a factor</option>
                <option value="soil_type">Soil Type</option>
                <option value="watering_sched">Watering Schedule</option>
                <option value="sun_exposure">Sun Exposure</option>
                Add more options as needed
              </select>
              <label
                htmlFor="factor"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Value
              </label>
              <select
                className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-green-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-green-900 focus:border-t-transparent focus:!border-t-green-900 focus:outline-0 focus:ring-green-900/10 disabled:border-0 disabled:bg-blue-gray-50"
                name="value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                color="lightBlue"
                size="regular"
                outline={false}
              >
                <option value="">Select a value</option>
                {valueOptions.map((option, index) => (
                  <option key={option} value={option}>
                    {factorOptions[factor]?.labels[index]}
                  </option>
                ))}
              </select>
              <label
                htmlFor="recommendation"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Recommendation
              </label>
              <textarea
                className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-green-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-green-900 focus:border-t-transparent focus:!border-t-green-900 focus:outline-0 focus:ring-green-900/10 disabled:border-0 disabled:bg-blue-gray-50"
                type="text"
                name="recommendation"
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                placeholder="Recommendation"
                color="lightBlue"
                outline={false}
                size="regular"
              />
              <div className="col-span-full">
                <label
                  htmlFor="file-upload"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Choose an Image
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="image"
                          type="file"
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                            setImagePreview(URL.createObjectURL(e.target.files[0]));
                          }}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="ml-2 mt-3 mr-2"
                      width="80px"
                    />
                  )}
                </div>
              </div>
              <Button
                color="teal"
                buttonType="filled"
                size="regular"
                block={false}
                ripple="light"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateQualityReco;
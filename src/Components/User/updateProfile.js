import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../utils/helpers";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  let navigate = useNavigate();

  const getProfile = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/me`,
        config
      );
      console.log(data);
      setName(data.user.name);
      setEmail(data.user.email);
      setLoading(false);
    } catch (error) {
      toast.error("User Cannot find", {
        position: "top-right",
      });
    }
  };

  const updateProfile = async (userData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };

    try {
      const formData = new FormData();
      Object.keys(userData).forEach((key) =>
        formData.append(key, userData[key])
      );

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/me/update`,
        config
      );
      console.log("Response data:", data);
      setIsUpdated(data.success);
      setLoading(false);
      toast.success("Profile Update Success", {
        position: "top-right",
      });

      navigate("/me", { replace: true });
    } catch (error) {
      console.log("Error:", error);
      toast.error(" There is an Error ", {
        position: "top-right",
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
    };

    console.log("User data:", { name, email });
    updateProfile(formData);
  };

  useEffect(() => {
    getProfile();
  }, []);

  console.log(user)

  return (
    <div>
      <div class="max-w-md mx-auto m-20 relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
        <h2 class="text-2xl text-sky-900 font-bold mb-6">
          Update Your Profile
        </h2>

        <form
          method="post"
          onSubmit={submitHandler}
          encType="multipart/form-data"
          action="#"
        >
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-600" for="name">
              Full Name
            </label>
            <input
              class="mt-1 p-2 w-full border rounded-md"
              type="name"
              id="name_field"
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-600" for="email">
              Email Address
            </label>
            <input
              class="mt-1 p-2 w-full border rounded-md"
              name="email"
              id="email_field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div class="flex justify-end">
            <button
              class="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
              type="submit"
              disabled="true"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;

import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../../utils/helpers";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  let navigate = useNavigate();

  const { id } = useParams();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  };
  const getUserInfo = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/admin/users/${id}`,
        config
      );
      setEmail(data.user.email);
        setName(data.user.name);
        setRole(data.user.role);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }

    
  };

  const updateUser = async (id, userData) => {
    console.log("User ID:", id); 
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/admin/users/${id}`,
        userData,
        config
      );
      setIsUpdated(data.success);
      setLoading(false);
      navigate("/admin/users");
      window.location.reload();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    if (user && user._id !== id) {
      getUserInfo(id);
    } 
    if (error) {
      console.log(error);
      toast.error(error, {
        position: "top-right",
      });
    }
    if (isUpdated) {
      toast.success("User updated successfully", {
        position: "top-right",
      });

      navigate("/admin/users");
      window.location.reload();
    }
  }, [error, isUpdated, id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.set("name", name);
    // formData.set("email", email);
    // formData.set("role", role);
    const formData = {
        name,
        email,
        role
      };
    updateUser(id, formData);
  };
  console.log(user);

  return (
    <div>
      <div class="max-w-md mx-auto m-20 relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
        <h2 class="text-2xl text-gray-500 stroke-blue-gray-800 font-bold mb-6">
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
              name="name"
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
          <div className="mb-4">
            <label
              for="role"
              className="block text-sm font-medium text-gray-600"
            >
              Role
            </label>
            <select
              id="role_field"
              name="role"
              type="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div class="flex justify-end">
            <button
              class="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
              type="submit"
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

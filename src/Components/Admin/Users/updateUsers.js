import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../../utils/helpers";
import { Avatar } from '@material-tailwind/react';
import MetaData from "../../Layout/MetaData";
import Sidebar from "../Sidebar";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState('');
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
      setAvatarPreview(data.user.avatar.url)
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
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
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

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('role', role);

    if (avatar) {
      formData.append('avatar', avatar);
    }

    updateUser(id, formData);
  };
  console.log(user);

  return (
    <Fragment>
      <div className="flex" style={{
        minHeight: '100vh',
        background: '#B6EBBA'
      }}>
        <MetaData title={'Update User Profile'} />
        <div className="w-100">
          <Sidebar />
        </div>
        <div className="flex-1 py-10">
          <div className="ml-[21rem] mr-20">
            {/* <div class="max-w-md mx-auto m-20 relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
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

                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-600" for="avatar">
                    Avatar
                  </label>
                  <span>
                    <Avatar
                      src={avatarPreview}
                      size="large"
                    />
                    <input
                      class="mt-1 p-2 w-full border rounded-md"
                      name="avatar"
                      id="avatar_field"
                      type="file"
                      onChange={(e) => {
                        setAvatar(e.target.files[0]);
                        setAvatarPreview(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </span>
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
            </div> */}
            <div className="grid grid-cols-5 gap-8 mt-8 ml-10">
              <div className="col-span-5 xl:col-span-3 ml-8">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      User Personal Information
                    </h3>
                  </div>

                  <div className="p-7">
                    <form
                      method="post"
                      onSubmit={submitHandler}
                      encType="multipart/form-data"
                      action="#"
                    >
                      <div className="mb-6">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="Username"
                        >
                          Username
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-4">
                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                  fill=""
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          </span>
                          <input
                            className="w-full rounded border border-stroke bg-white py-3 pl-12 text-black focus:border-success focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="name"
                            id="name_field"
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="emailAddress"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-4">
                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                                  fill=""
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          </span>
                          <input
                            className="w-full rounded border border-stroke bg-white py-3 pl-12 text-black focus:border-success focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            name="email"
                            id="email_field"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="role"
                        >
                          Role
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-4">
                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                                  fill=""
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          </span>
                          <select
                            className="w-full rounded border border-stroke bg-white py-3 pl-12 text-black focus:border-success focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            id="role_field"
                            name="role"
                            type="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4">
                        <Link to='/admin/users'>
                          <button
                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                            type="submit"
                          >
                            Cancel
                          </button>
                        </Link>
                        <button
                          className="flex justify-center rounded bg-success py-2 px-6 font-medium text-white hover:bg-opacity-90"
                          type="submit"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-span-5 xl:col-span-2 mr-8">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Your Photo
                    </h3>
                  </div>
                  <div className="p-7">
                    <form action="#">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="h-14 w-14 rounded-full">
                          <Avatar
                            src={avatarPreview}
                            size="lg"
                          />
                        </div>
                        <div>
                          <span className="mb-1.5 text-black dark:text-white">
                            Edit your photo
                          </span>
                        </div>
                      </div>

                      <div
                        id="FileUpload"
                        className="relative mb-6 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-8"
                      >
                        <input
                          type="file"
                          name="avatar"
                          onChange={(e) => {
                            setAvatar(e.target.files[0]);
                            setAvatarPreview(URL.createObjectURL(e.target.files[0]));
                          }}
                          // accept="image/*"
                          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                        />
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                fill="#3C50E0"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                fill="#3C50E0"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                fill="#3C50E0"
                              />
                            </svg>
                          </span>
                          <p>
                            <span className="text-primary">Click to upload</span> or
                            drag and drop
                          </p>
                          <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                          <p>(max, 800 X 800px)</p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Fragment>

  );
};

export default UpdateProfile;

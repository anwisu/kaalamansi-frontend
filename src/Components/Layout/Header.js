import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { logout, getUser } from "../../utils/helpers";
import { Avatar } from "@material-tailwind/react";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API}/logout`);
      logout(); // Remove token and user data from session storage
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const userData = getUser();
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <Fragment>
      <div className="navbar bg-white-500 text-green-700 shadow-md">
        <div className="flex-1">
          <Link to="/" className="inline-block text-teal-600">
            <div className="flex items-center">
              <img
                src={process.env.PUBLIC_URL + "/images/citrus.png"}
                className="h-10 w-10"
                alt="Kaalamansi Logo"
              />
            </div>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-base">
            <li>
              <Link
                to="/"
                style={{ textDecoration: "none" }}
                className="flex items-center"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/plant"
                style={{ textDecoration: "none" }}
                className="flex items-center"
              >
                Plant
              </Link>
            </li>
            <div className="dropdown dropdown-end">
              <li>
                <Link
                  to="#"
                  tabIndex={0}
                  style={{ textDecoration: "none" }}
                  className="flex items-center"
                >
                  Predict
                </Link>
                <ul
                  tabIndex={0}
                  className="mt-10 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-40 bg-100"
                  style={{
                    textDecoration: "none",
                    color: "#58B741",
                    backgroundColor: "white",
                  }}
                >
                  <li>
                    <Link
                      to="/predict/quality"
                      style={{ textDecoration: "none" }}
                      className="flex items-center"
                    >
                      Predict Quality
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/predict/disease"
                      style={{ textDecoration: "none" }}
                      className="flex items-center"
                    >
                      Predict Disease
                    </Link>
                  </li>
                </ul>
              </li>
            </div>
            <li>
              <Link
                to="/guide"
                style={{ textDecoration: "none" }}
                className="flex items-center"
              >
                Guide
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                style={{ textDecoration: "none" }}
                className="flex items-center"
              >
                About
              </Link>
            </li>
          </ul>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              // className="btn btn-ghost btn-circle avatar bg-100"
            >
              {user ? (
                // If user is logged in, display avatar
                <Avatar
                  size="sm"
                  src={user.avatar ? user.avatar.url : "defaultAvatarUrl"}
                  alt="avatar"
                  className="border border-green-700 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
                />
              ) : (
                // If no user is logged in, display login and signup buttons
                <>
                  <Link
                    to="/register"
                    style={{ textDecoration: "none" }}
                    className="flex-none items-center  px-5"
                  >
                    Sign Up
                  </Link>
                  <Link to="/login" className="flex-none items-center  px-1">
                    <button
                      type="button"
                      data-twe-ripple-init
                      data-twe-ripple-color="light"
                      class="me-3 inline-block rounded bg-success px-6 pb-2 pt-2.5 text-s font-medium leading-normal text-black shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    >
                      Login
                    </button>
                  </Link>
                </>
              )}
            </div>
            {user && (
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-100 rounded-box w-52"
                style={{
                  textDecoration: "none",
                  color: "#58B741",
                  backgroundColor: "white",
                }}
              >
                {user.role === "admin" && (
                  <li>
                    <Link
                      className="flex items-center"
                      style={{ textDecoration: "none", color: "#58B741" }}
                      to="/admin/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/me"
                    style={{ textDecoration: "none", color: "#58B741" }}
                    className="flex items-center"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    style={{ textDecoration: "none", color: "#58B741" }}
                    className="flex items-center"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;

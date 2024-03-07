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
      <div className="navbar bg-white-900">
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
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                to="/"
                style={{ textDecoration: "none", color: "#58B741" }}
                className="flex items-center"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/plant"
                style={{ textDecoration: "none", color: "#58B741" }}
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
                  style={{ textDecoration: "none", color: "#58B741" }}
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
                      style={{ textDecoration: "none", color: "#58B741" }}
                      className="flex items-center"
                    >
                      Predict Quality
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/predict/disease"
                      style={{ textDecoration: "none", color: "#58B741" }}
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
                style={{ textDecoration: "none", color: "#58B741" }}
                className="flex items-center"
              >
                Guide
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "#58B741" }}
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
              <Avatar 
                    size="sm"
                    src={user && user.avatar ? user.avatar.url : 'defaultAvatarUrl'} 
                    alt="avatar"
                    className="border border-green-700 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
                />
            </div>
            {user ? (
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
            ) : (
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-100 rounded-box w-52"
              >
                <li>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "#58B741" }}
                    className="flex items-center"
                  >
                    Login
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

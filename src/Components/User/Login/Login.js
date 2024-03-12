import React, { Fragment, useState, useEffect } from "react";
import "./Login.css";
import "../../../App.scss";
import MetaData from "../../Layout/MetaData";
import axios from "axios";
import { authenticate } from "../../../utils/helpers";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { useFormik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  // Define the login schema using Yup
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}/login`,
          {
            email: values.email,
            password: values.password,
          }
        );
        const { data } = response;

        if (data.success && data.token) {
          if (authenticate(data)) {
            navigate("/");
            window.location.reload();
            toast.success("Logged in Successfully!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            console.error("Failed to authenticate");
          }
        } else {
          console.error("Login Error:", data.message);
        }
      } catch (error) {
        console.error("Error during login:", error.message);
      }
    },
  });

  return (
    <div className="loginPage loginFlex">
      <MetaData title={'Login'} />
      <div className="loginContainer loginFlex">
        <div className="videoDiv">
          <video
            src="./videos/watering-plants.mp4"
            className="loginVideo"
            autoPlay
            muted
            loop
          ></video>

          <div className="textDiv">
            <h2 className="title">Elevate Your Kalamansi Garden</h2>
            <p>Unlock Predictive Growth!</p>
          </div>

          <div className="footerDiv loginFlex">
            <span className="text">Don't have an account?</span>
            <Link to={"/register"}>
              <button className="btnLogin">Sign Up</button>
            </Link>
          </div>
        </div>
        <div className="formDiv loginFlex">
          <div className="headerDiv">
            <img src="./images/citrus.png" alt="Logo Image" />
            <h3 className="title">Welcome Back!</h3>
          </div>
          <form onSubmit={formik.handleSubmit} className="inputForm loginGrid">
            {/* <span className='showMessage'>Login Status will go here</span> */}
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input loginFlex">
                <FaUserShield className="icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  value={formik.values.email}
                  onChange={(e) => setEmail(e.target.value)}
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="error text-red-500">{formik.errors.email}</div>
              )}
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input loginFlex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  value={formik.values.password}
                  onChange={(e) => setPassword(e.target.value)}
                  {...formik.getFieldProps("password")}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="error text-red-500">{formik.errors.password}</div>
              )}
            </div>
            <button type="submit" className="btnLogin loginFlex">
              <span>Login</span>
              <AiOutlineSwapRight className="icon" />
            </button>

            <span className="forgotPassword">
              Forgot your password? <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { Fragment, useState, useEffect } from 'react'
import './Login.css'
import '../../../App.scss'
import axios from 'axios'
import {authenticate} from '../../../utils/helpers'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaUserShield } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";




const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/login`, { email, password });
      const { data } = response;

      if (data.success && data.token) {
        // Store token in sessionStorage
        if (authenticate(data)) {
          // Navigate to '/' upon successful authentication
          navigate('/');
        } else {
          console.error('Failed to authenticate');
        }
      } else {
        console.error('Login Error:', data.message);
      }
    } catch (error) {
      console.error('Login Error:', error.message);
    }
  };

  return (
    <div className='loginPage loginFlex'>
      <div className='loginContainer loginFlex'>
      <div className='videoDiv'>
        <video src='./videos/watering-plants.mp4' className='loginVideo' autoPlay muted loop></video>

        <div className='textDiv'>
          <h2 className='title'>Create and Sell Extraordinary Products</h2>
          <p>Adopt the peace of nature!</p>
        </div>

        <div className='footerDiv loginFlex'>
          <span className='text'>Don't have an account?</span>
          <Link to={'/register'}>
          <button className='btnLogin'>Sign Up</button>
          </Link>
        </div>
      </div>
      <div className='formDiv loginFlex'>
        <div className='headerDiv'>
          <img src='./images/citrus.png' alt='Logo Image' className='loginImg' />
          <h3 className='title'>Welcome Back!</h3>
        </div>
        <form onSubmit={handleSubmit} className='inputForm loginGrid'>
          <span className='showMessage'>Login Status will go here</span>
          <div className='inputDiv'>
            <label htmlFor='email'>Email</label>
            <div className='input loginFlex'>
              <FaUserShield className='icon'/>
              <input type='email' id='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
          </div>
          <div className='inputDiv'>
            <label htmlFor='password'>Password</label>
            <div className='input loginFlex'>
              <BsFillShieldLockFill className='icon'/>
              <input type='password' id='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>
          <button type='submit' className='btnLogin loginFlex'>
            <span>Login</span>
            <AiOutlineSwapRight className='icon'/>
          </button>

        <span className='forgotPassword'>
          Forgot your password? <a href=''>Click Here</a>
        </span>

        </form>
      </div>
      </div>
    </div>
  )
}

export default Login
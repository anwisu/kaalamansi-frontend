import React from 'react'
import './Register.css'
import '../../../App.scss'
import { Link } from 'react-router-dom'
import { FaUserShield } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";




const Register = () => {
  return (
    <div className='registerPage registerFlex'>
      <div className='registerContainer registerFlex'>
      <div className='videoDiv'>
        <video src='./videos/watering-plants.mp4' className='registerVideo' autoPlay muted loop></video>

        <div className='textDiv'>
          <h2 className='title'>Create and Sell Extraordinary Products</h2>
          <p>Adopt the peace of nature!</p>
        </div>

        <div className='footerDiv registerFlex'>
          <span className='text'>Have an account?</span>
          <Link to={'/login'}>
          <button className='btnRegister'>Login</button>
          </Link>
        </div>
      </div>
      <div className='formDiv registerFlex'>
        <div className='headerDiv'>
          <img src='./images/citrus.png' alt='Logo Image' className='registerImg' />
          <h3 className='title'>Let Us Know You!</h3>
        </div>
        <form action='' className='inputForm registerGrid'>
          <div className='inputDiv'>
            <label htmlFor='username'>Username</label>
            <div className='input registerFlex'>
              <FaUserShield className='icon'/>
              <input type='text' id='username' placeholder='Enter Username'/>
            </div>
          </div>

          <div className='inputDiv'>
            <label htmlFor='email'>Email</label>
            <div className='input registerFlex'>
              <MdMarkEmailRead className='icon'/>
              <input type='text' id='email' placeholder='Enter Email'/>
            </div>
          </div>

          <div className='inputDiv'>
            <label htmlFor='password'>Password</label>
            <div className='input registerFlex'>
              <BsFillShieldLockFill className='icon'/>
              <input type='password' id='password' placeholder='Enter Password'/>
            </div>
          </div>
          <button type='submit' className='btnRegister registerFlex'>
            <span>Register</span>
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

export default Register
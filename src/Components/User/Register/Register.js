import React, { useState } from 'react'
import './Register.css'
import '../../../App.scss'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { Avatar } from '@material-tailwind/react';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });

  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState('/images/default-user-icon.jpg');

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setFormData({ ...formData, avatar: reader.result });
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/register`, formData);
      console.log(response.data);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration Error:', error.message);
    }
  };


  return (
    <div className='registerPage registerFlex'>
      <div className='registerContainer registerFlex'>
        <div className='videoDiv'>
          <video src='./videos/watering-plants.mp4' className='registerVideo' autoPlay muted loop></video>

          <div className='textDiv'>
            <h2 className='title'>Adopt the peace of nature!</h2>
            <p></p>
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
          <form onSubmit={handleSubmit} className='inputForm registerGrid'>
            <div className='inputDiv'>
              <label htmlFor='username'>Username</label>
              <div className='input registerFlex'>
                <FaUserShield className='icon' />
                <input
                  type='text'
                  id='username'
                  name='name'
                  placeholder='Enter Username'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor='email'>Email</label>
              <div className='input registerFlex'>
                <MdMarkEmailRead className='icon' />
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Enter Email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor='password'>Password</label>
              <div className='input registerFlex'>
                <BsFillShieldLockFill className='icon' />
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Enter Password'
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='form-group inputDiv registerFlex'>
              <label htmlFor='avatar_upload'>Avatar</label>
              <div className='d-flex align-items-center registerFlex'>
                <Avatar
                  src={avatarPreview}
                  size="large"
                />
                <div className='registerFlex'>
                  <input
                    type='file'
                    name='avatar'
                    className='custom-file-input'
                    id='customFile'
                    accept="images/*"
                    onChange={handleChange}
                  />
                  <label className='custom-file-label' htmlFor='customFile'>
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>
            <button type='submit' className='btnRegister registerFlex'>
              <span>Register</span>
              <AiOutlineSwapRight className='icon' />
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
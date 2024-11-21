import React from 'react'
import { NavLink } from 'react-router-dom'
import style from "./Home.module.css"
import bg1 from '../../BG2.jpg'
import AuthCard from '../UI/Auth/AuthCard'
import BrandIcon from '../UI/BrandIcon/BrandIcon'
const Home = () => {
  return (
    <div className={style["home"]}>
      <AuthCard>
        <h1 className={style["brand-name"]}>Welcom to TASK <BrandIcon/></h1>
        <h4>Login to your Taskoo account</h4>
        <NavLink className={style["existing-acc"]} to="/auth/login">
          <span className={style["acc-icon"]}><i className='bx bxs-user-circle' ></i></span><p>Add Existing account</p>
        </NavLink>
        <NavLink className={style["signup"]} to={"/auth/signup"}>Signup</NavLink>
      </AuthCard>
        <img className={style["bg1"]} loading='lazy' src={bg1} alt='any'/>
        
    </div>
  )
}

export default Home

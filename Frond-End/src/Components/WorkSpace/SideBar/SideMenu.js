import React from 'react'
import style from "./SideBar.module.css"
import { NavLink } from 'react-router-dom'
import { AuthActions } from '../../../Store/AuthSlice'
import { useDispatch } from 'react-redux'
const SideMenu = () => {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(AuthActions.logout())
  }
  return (
    <ul className={style["side-menu"]}>
        <NavLink to="/work-space" className={style["side-item"]}>
        <i className={`bx bxs-home ${style["side-icon"]}`} ></i>Home
        </NavLink>
        {/* <NavLink to="/About" className={style["side-item"]}>
        <i className={`bx bxs-info-circle ${style["side-icon"]}`}></i>
          About
        </NavLink> */}
        <NavLink to="/" onClick={logoutHandler} className={style["side-item"]}>
          <i className={`bx bx-log-out ${style["side-icon"]}`}></i>
          Logout
        </NavLink>
      </ul>
  )
}

export default SideMenu

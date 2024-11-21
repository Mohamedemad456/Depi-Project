import React from 'react'
import style from "./AuthCard.module.css"
const AuthCard = (props) => {
  return (
    <div className={style.card}>
      {props.children}
    </div>
  )
}

export default AuthCard

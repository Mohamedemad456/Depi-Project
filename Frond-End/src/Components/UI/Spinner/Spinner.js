import React from 'react'
import style from './Spinner.module.css'
const Spinner = () => {
  return (
    <div className={style["dots-container"]}>
      <div className={style["dot-1"]}></div>
      <div className={style["dot-2"]}></div>
      <div className={style["dot-3"]}></div>
    </div>
  )
}

export default Spinner

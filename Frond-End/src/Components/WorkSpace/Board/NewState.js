import React, { useState } from 'react'
import style from './NewState.module.css'
import { workSpaceActions } from '../../../Store/WorkspaceSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { createCategory } from '../../../Store/WorkspaceSlice'
const NewCategory = (props) => {
    const dispatch = useDispatch();
    const params = useParams();
    const [newStateName,setNewStateName] = useState("");
    const workspaceId = useSelector(state=>state.workSpace.workSpaces.filter(space=>space.name === params.id)[0]._id)
    const categoryNameChangeHandler = (e) => {
        setNewStateName(e.target.value);
      }
      
      const taskSubmitHandler = (e)=>{
        e.preventDefault();
        dispatch(createCategory({name:newStateName,workspaceId} ))
        setNewStateName("");
        props.dataReloadingToggler()
      }
  return (
    <form className={style["add-category-form"]} onSubmit={taskSubmitHandler}>
            <p className={style["card-header"]}>Add New State</p>
            <input 
            type='text'
              placeholder="Add a Task title or header"
              value={newStateName}
              onChange={categoryNameChangeHandler}
            /> 
            <div className={style["ctrl"]}>
              <input
                type="submit"
                value={"Add"}
                className={style["add-btn"]}
              />
            </div>
          </form>
  )
}

export default NewCategory

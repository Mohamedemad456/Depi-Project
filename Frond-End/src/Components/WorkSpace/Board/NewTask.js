import React, { useState } from "react";
import style from "./NewTask.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { createTask } from "../../../Store/WorkspaceSlice";
const NewTask = (props) => {
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("");
  const token = useSelector((state) => state.auth.token);
  const params = useParams();
  const userId = useSelector((state) => state.auth.user.userId);

  const titelChangeHandler = (e) => {
    setTaskTitle(e.target.value);
  };

  const taskSubmitHandler = async (e) => {
    e.preventDefault(); 
    props.onAddTask();
    console.log(Date.now());
    dispatch(
      createTask({
        name: taskTitle,
        assignedUserId: userId,
        categoryId: props.stateId,
        categoryName: props.stateName,
      })
    );
  };
  return (
    <form className={style["add-task-form"]}>
      <textarea
        placeholder="Add a task title or header"
        onChange={titelChangeHandler}
      ></textarea>
      <div className={style["ctrl"]}>
        <button
          className={style["add-btn"]}
          onClick={(e) => {
            taskSubmitHandler(e);
          }}
        >
          Add
        </button>
        <button
          className={style["cancel-btn"]}
          onClick={() => props.onAddTask()}
        >
          X
        </button>
      </div>
    </form>
  );
};

export default NewTask;

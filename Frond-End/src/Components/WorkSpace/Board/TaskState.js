import React, { useState } from "react";
import style from "./Board.module.css";
import NewTask from "./NewTask";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../../Store/WorkspaceSlice";
const TaskState = (props) => {
  const [addNewTask, setAddNewTask] = useState(false);
  const addTaskHandler = () => {
    setAddNewTask((state) => !state);
  };
  const dispatch = useDispatch();

  const deleteCategoryHandler = () => {
    dispatch(deleteCategory(props.categoryId));
    props.dataReloadingToggler();
  };

  return (
    <div className={style["task-state-card"]}>
      <div className={style["task-header"]}>
        <p className={style["task-title"]}>{props.state}</p>
        <i
          className={`bx bx-trash ${style["delete-icon"]}`}
          onClick={deleteCategoryHandler}
        ></i>
      </div>
      <ol className={style["task-list"]}>{props.children}</ol>
      {addNewTask ? (
        <NewTask
          stateName={props.state}
          stateId={props.categoryId}
          onAddTask={addTaskHandler}
        />
      ) : (
        <button className={style["add-task-btn"]} onClick={addTaskHandler}>
          Add Task
        </button>
      )}
    </div>
  );
};

export default TaskState;

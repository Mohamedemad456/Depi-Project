import React, { useState } from "react";
import style from "./Board.module.css";
import EditModal from "../../UI/Modal/EditModal";
const Task = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  let periority = ""
  switch (props.taskContent.priority){
    case "Low":
      periority = "low";
      break;
    case "Medium":
      periority = "mid";
      break;
    case "High":
      periority = "high";
      break;
    default:
      periority = "mid";
      break;
  }
  return (
    <div className={style.task}>
      <div className={style["control-btns"]}>
        <div className={`${style["periority"]} ${style[periority]}`}></div>
        <i
          className={`bx bx-edit ${style["edit-icon"]}`}
          onClick={openModal}
        ></i>
      </div>
      <p className={style["task-content"]}>{props.taskContent.name}</p>
      <EditModal isOpen={isOpen} onClose={closeModal} task={props.taskContent}></EditModal>
      {/* I need to make the all tasks appear in the work space page to choose from them to open */}
    </div>
  );
};

export default Task;

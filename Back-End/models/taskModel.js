const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    unique: [true, "Name is already taken"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  priority: {
    type: String,
    required: [true, "Priority is Required"],
  },
  startDate: {
    type: Date,
    required: [true, "Start Date is Required"],
  },
  dueDate: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    required: [true, "Status is Required"],
  },
  assignedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User not Found"],
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category not Found"],
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;

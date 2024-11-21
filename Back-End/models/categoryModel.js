const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category is Required"],
  },
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkSpace",
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

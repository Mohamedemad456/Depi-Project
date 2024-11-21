const Category = require("../models/categoryModel");
const WorkSpace = require("../models/WorkSpaceModel");

exports.getWorkSpace = async (req, res) => {
  try {
    const workSpaces = await WorkSpace.find()
      .populate({
        path: "categories", // Path to the categories array
        populate: {
          path: "tasks", // Path to the tasks within each category
          model: "Task", // Model to populate from
        },
      });
      
    if (!workSpaces || workSpaces.length === 0) {
      console.log("No workspaces Found");
      return res.status(404).json({ message: "No workspaces Found" });
    }
    const userWorkspaces = workSpaces.filter(space=>space.userId == req.query.userId)
    return res.status(200).json(userWorkspaces);
  } catch (error) {
    console.log("ERROR HEREEEEE");
    return res.status(500).json({ message: error.message });
  }
};

exports.getWorkSpaceById = async (req, res) => {
  try {
    const workSpaceId = req.params.id;
    const workspace = WorkSpace.findById(workSpaceId);
    if (!workspace) {
      return res.status(404).json({ message: "No workspace Found" });
    }
    return res.status(200).json(workspace);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createWorkspace = async (req, res) => {
  try {
    const { name, userId, categories } = req.body;

    const createdAt = Date.now();
    const workspace = new WorkSpace({ name, createdAt, categories, userId });

    const newWorkSpace = await workspace.save();
    return res.status(200).json(newWorkSpace);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteWorkSpace = async (req, res) => {
  try {
    const workSpaceId = req.params.id;
    console.log(workSpaceId);
    const workspace = await WorkSpace.findById(workSpaceId);
    if (!workspace) {
      return res.status(404).json({ message: "No workspace Found" });
    }

    if (workspace.categories.length !== 0) {
      workspace.categories.map(async (categoryId) => {
        await Category.findByIdAndDelete(categoryId);
      });
    }
    await WorkSpace.findByIdAndDelete(workSpaceId);
    return res.status(200).json({ message: "WorkSpace Deleted Succesfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

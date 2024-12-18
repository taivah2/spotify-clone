import User from "../model/authModel.js";

///get User

export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json({ message: "Failed to fetch users", error: err.message });
      }
    };


///put user 

export const putUser = async( req, res, next) =>{
   

  try {
    const { userName, email, isAdmin } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { userName, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Failed to update user", error: err.message });
  }
};

//delete user

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUsers = await User.findByIdAndDelete(req.params.id);
        if (!deletedUsers) return res.status(404).json({ message: "User not found" });
    
        res.status(200).json({ message: "User deleted successfully" });
      } catch (err) {
        res.status(500).json({ message: "Failed to delete user", error: err.message });
      }
    }
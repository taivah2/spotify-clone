import User from "../model/authModel.js";

///get User

export const getAllUser = async (req, res, next) => {
    try {
      const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
      const pageSize = req.query.pageSize ? req.query.pageSize : 5;

      const totalItems = await User.countDocuments( {isAdmin : false});
      const totalPages = Math.ceil(totalItems / pageSize);

      const skip = (pageNumber - 1) * pageSize;
        const users = await User.find({isAdmin : false}).select("-password")
        .skip(skip)
        .limit(pageSize);
        res.send({
          success: true,
          totalItems,
          totalPages,
          currentPage: pageNumber,
          pageSize,
          items: users
      })
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

// Post 

export const postUser = async(req,res) =>{
  try{
    const {userName , email , password} = req.body;
    const exitEmail = await User.findOne({email})
    if (exitEmail)  throw new Error ('Email already exists!');

    const newCustomer = await User.create({userName , email , password});
    res.status(201).send({
        message: 'User created successfully!',
        data: newCustomer,
        success: true
    });
} catch (error) {
    res.status(400).send({
        message: error.message,
        data: null,
        success: false
    });
}
};
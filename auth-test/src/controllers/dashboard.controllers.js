import User from "../models/user.model.js";

export const getDashboard = async(req,res,next) =>{
    const user = await User.findById(req.userId).select("-password");
    return res.status(200).json({
        success : true,
        data : {
            user
        }
    })
}
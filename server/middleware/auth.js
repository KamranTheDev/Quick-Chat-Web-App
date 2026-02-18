import jwt from 'jsonwebtoken';
import User from '../models/User.js';


//middleware to check if the user is authenticated or protected routes
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user_Id).select("-password");
        if (!user) {
            return res.json({success: false, message:"user not found"});
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        return res.json({success: false, message: error.message});
    }
}
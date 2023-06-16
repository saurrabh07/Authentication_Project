import authModel from "../models/authModel.js";
import jwt from "jsonwebtoken"

const checkIsUserAuthenticated = async (req , res , next) =>{
    let token ;
    const {authorization} = req.headers ;
    if(authorization && authorization.startsWith("Bearer")) {
        try{
            token = authorization.split(" ")[1] ;

            // Verify token
            const {userID} = jwt.verify(token , "100rabh07");
            // console.log(userID);

            //GEt user from token 
            req.user = await authModel.findById(userID).select("--password");
            next();
        }
        catch(error){
            res.status(401).json({
                success: false,
                message: 'user Authorization',
              });
        }
    }
    else{
        res.status(401).json({
            success: false,
            message: 'user Authorization',
          });
    }
}
 
export default checkIsUserAuthenticated ;
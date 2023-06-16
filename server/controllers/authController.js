import authModel from "../models/authModel.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


class authController {
    static userRegister = async (req , res)=>{
        const {name , email , password} = req.body ;

        try{
            if(name && email && password)
            {
                const isUser = await authModel.findOne({email : email});

                if(!isUser)
                {
                    const genSalt = await bcryptjs.genSalt(10);
                    const hashedPassword = await bcryptjs.hash(password , genSalt);
                    const newUser = new authModel({
                        name: name ,
                        email : email , 
                        password : hashedPassword ,
                    })
                    const isSaved = await newUser.save();
                    if(isSaved)
                    {
                        res.status(201).send({
                            success:true , 
                            message:"User Register SuccessFully",
                            newUser

                        })
                    }
                }
                else{
                    res.status(404).send({
                        success:false , 
                        message:"User is already registered"
                    })
                }
            }
            else{
                res.status(404).send({
                    success:false , 
                    message:"All Fields Are Required"
                })
            }
        }
        catch(error){
            res.status(404).send({
                success:false , 
                message:"Error Occur while user Register"
            })
        }
        
    }

    static userLogin = async (req, res) => {
        const { email, password } = req.body;
      
        try {
          if (!email || !password) {
            return res.status(400).json({
              success: false,
              message: 'Email and password are required fields.',
            });
          }
      
          const user = await authModel.findOne({ email });
      
          if (!user) {
            return res.status(404).json({
              success: false,
              message: 'User not registered. Please register first.',
            });
          }
      
          const isPasswordMatch = await bcryptjs.compare(password, user.password);
      
          if (!isPasswordMatch) {
            return res.status(401).json({
              success: false,
              message: 'Invalid credentials.',
            });
          }
      
          const token = jwt.sign({ userID: user._id }, '100rabh07', {
            expiresIn: '2d',
          });
      
          res.status(200).json({
            success: true,
            message: 'User login successful.',
            token,
            name : user.name ,
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            message: 'Error occurred while user login.',
          });
        }
      };

      static changePassword = async (req , res)=>{
         const {newpassword , confirmpassword} = req.body ;
         try{
            if(newpassword === confirmpassword){
                const genSalt = await bcryptjs.genSalt(10)
                const hashedPassword = await bcryptjs.hash(newpassword , genSalt);
                await authModel.findByIdAndUpdate(req.user._id , {
                    password : hashedPassword
                });

                return res
                    .status(200)
                    .json({message : "Password Changed Successfully"}); 
            }
         }
         catch (error) {
            res.status(500).json({
              success: false,
              message: 'Error occurred while user change-password',
            });
          }

      };



}

export default authController ;
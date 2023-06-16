import mongoose from "mongoose";

const connectDb = async ()=>{
    const res = await mongoose.connect('mongodb://127.0.0.1:27017/Auth-project');
    if(res)
    {
        console.log("Connected Successfully");
    }
}

export default connectDb ;
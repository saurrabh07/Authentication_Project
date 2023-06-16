import express from "express";
// import { connect } from "mongoose";
import connectDb from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'


connectDb();
const app = express();

app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 9000 ;

app.get("/" , (req , res)=>{
    res.send("api is working");
})

// Routes
app.use('/api/auth' , authRoutes)

app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`);
})
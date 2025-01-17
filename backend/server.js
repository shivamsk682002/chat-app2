import express from "express"
import dotenv from "dotenv"
import connectToMongoDB from "./db/connectToMongodb.js";
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.route.js"
import userRoutes from "./routes/user.routes.js"
import cookieParser from 'cookie-parser'
import { app,server } from "./socket/socket.js";
import path from "path";

// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;
const __dirname =path.resolve();
dotenv.config();
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/vite-project/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","vite-project","dist","index.html"))
})


server.listen(PORT,()=> 
    {
        connectToMongoDB();
    console.log(`server is running on port ${PORT}`)})
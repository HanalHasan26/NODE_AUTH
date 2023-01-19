const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require('./Routes/userRouter')
const app =express();

app.use(express.json()) ;

dotenv.config();
connectDB()

app.use('/api/user',userRouter);



// app.use(notFound) 
// app.use(errorHandler)

app.get("/", (req, res) => {
    res.send("API is running..");
  });


const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`server start ${PORT}`)); 

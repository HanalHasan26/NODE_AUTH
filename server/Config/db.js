const mongoose = require("mongoose")

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect("mongodb+srv://hanal:shahab99bB@cluster0.cuzg1a6.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
 
        console.log("Database connected");
    } catch (error){
        console.log(`Error :${error}`);
        process.exit();
    }



}

module.exports = connectDB; 
const asyncHandler = require("express-async-handler");
const User = require("../../Models/userModel");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')



const registerUser = asyncHandler (async (req,res) =>{
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please Enter All The Feilds")

    }
     if(password.length<=7){
        res.status(400)
        throw new Error("The password should have minimum length of 8 characters")
    }

    console.log(password.length);


    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400).json({
        message: "User already Exists",
        isError:true,
    });
        throw new Error("User already Exists")
    }



    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if(user){ 
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            message: "Signup success",
            isError:false,

        })
    }else{
        res.status(400).json({
            message: "Signup failed",
            isError:true,
        });  
        throw new Error("Failed to create the user") 
    } 
});

const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body

    const user = await User.findOne({ email });
    

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user._id,
            name:user.name,
            email: user.email,
            token: generateToken(user._id),
            message: "Login success",
            isError:false,
        
    })
}else{
    res.status(400).json({
        message: "Login failed",
        isError:true,
    }); 
    throw new Error("Failed to login")  
}

})

const getMe = asyncHandler(async(req,res)=>{
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id:_id,
        name,
        email,
    })

})


const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{  
        expiresIn:'30d',
    })
}

module.exports = {registerUser, loginUser, getMe}; 
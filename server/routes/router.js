require('dotenv').config();
const express=require('express');
const router=express.Router();
const userRegister=require('../models/user-model');
const authMiddleware=require('../controllers/authMiddleware');


// It is a registration route
router.route('/signup').post(async (req,res)=>{
    const {fname,lname,username,email,password,isAdmin}=req.body; 
    const userExist=await userRegister.findOne({email:email});
    

    if(userExist){
       return res.status(409).json({message:"User already exist"});
    }
    
        const userCreate=await userRegister.create({fname,lname,username,email,password,isAdmin});
        // after the user successfully registered the token generated would be sent in the respons to the user
      
        return res.status(200).json(
            {
                message:"User registerd successfully",
                token:await userCreate.generateToken()

        });   
});


// Login route
router.route('/login').post( async (req,res)=>{

    try{
        const {email,password}=req.body;
        const userEx=await userRegister.findOne({email:email});
        if(!userEx)
        {
            return res.status(400).json({msg:"Invalid credentials"});
        }
        // const compass=await bcrypt.compare(password,userEx.password);
        const compass=await userEx.comparePass(password);

        if(compass){
            // after the user successfully logged in the token generated would be sent in the respons to the user
            return res.status(200).json({msg:"user logged in successfully",
            token:await userEx.generateToken(),
            // userId:userEx._id.toString()
        });
        }

        else{
            return res.status(401).json({msg:"invalid email or password"});
        }
    }
    catch(err){
        console.log(err);
    }

})


//current user logic

router.route('/user').get(authMiddleware, async (req,res)=>{

    try {
        const userData=await req.user;
        console.log({userData});
        return res.status(200).json({userData});
      
    } catch (error) {
        
        console.log(`error from server ${error}`);

    }
});

 

module.exports=router;
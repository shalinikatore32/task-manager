const express=require('express');
const fetchRoute=express.Router();
const Task=require('../models/create-task-model');
const authMiddleware=require('../controllers/authMiddleware');

fetchRoute.route('/fetch/user/task/:id').get(authMiddleware,async (req,res)=>{

    try {
        const id=req.params.id;
        const data=await Task.find({});
        
        if(data){
            return res.status(200).json(data);
        }
        return res.status(403).json({message:"No task created"});
        
       } catch (error) {
        console.log(error);
       }

})

module.exports=fetchRoute;
const {z}=require('zod');
//zod validation 

const validateLoginSchema=z.object({
    email:z.string({required_error:"email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(6,{message:"email must be of at least 3 characters"})
    .max(255,{message:"you can enter an username of 255 chars at most"}),

    password:z.string({required_error:"password is required"})
    .trim()
    .min(8,{message:"password must be of at least 8 characters"})
    .max(24,{message:"you can enter an username of 20 chars at most"}),


})

const validateSignupSchema=z.object({
    fname:z.string({required_error:"First name is required"})
    .trim()
    .min(3,{message:"First name must be of 3 character"})
    .max(16,{message:"You can enter a first name of at most 16 character"}),

    lname:z.string({required_error:"Last name is required"})
    .trim()
    .min(3,{message:"Last name must be of 3 character"})
    .max(16,{message:"You can enter a last name of at most 16 character"}),

    username:z.string({required_error:"Username is required"})
    .trim()
    .min(3,{message:"username must be of at least 3 characters"})
    .max(20,{message:"you can enter an username of 20 chars at most"}),

    email:z.string({required_error:"email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(6,{message:"email must be of at least 3 characters"})
    .max(255,{message:"you can enter an username of 255 chars at most"}),

    password:z.string({required_error:"password is required"})
    .trim()
    .min(8,{message:"password must be of at least 8 characters"})
    .max(24,{message:"you can enter an username of 20 chars at most"}),


    

});

module.exports={validateSignupSchema,validateLoginSchema};
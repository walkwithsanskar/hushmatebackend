const Secrets = require("../models/Secrets");
const User = require("../models/User")
const {fileUpload} = require("../utlis/fileUploader");
const {secretTemplate}=require("../templates/todaysSecret");
const { sendMail } = require("../utlis/mailSender");

exports.createSecret = async(req,res)=>{

    try{
        const {secret} = req.body;
        console.log(req.files);
        const image = req.files?req.files.image:null;
        const {user_id} = req.user;
        if(!secret){
            return res.status(400).json({
                success:false,
                message:"enter secret please"
            })
        }

        const userSecrets = await Secrets.find({user_id:user_id}).sort({createdAt:-1});
        
        if (userSecrets.length > 0) {
            const lastSecretDate = new Date(userSecrets[0].createdAt);
            const currentDate = new Date();
        
            // Set both dates to the start of the day to compare only the dates, ignoring the time component
            lastSecretDate.setHours(0, 0, 0, 0);
            currentDate.setHours(0, 0, 0, 0);
        
            if (lastSecretDate.getTime() === currentDate.getTime()) {
                return res.status(400).json({
                    success: false,
                    message: "Secret creation limit reached for the day"
                });
            }
        }

        
        if(image){ 
            const url = await fileUpload(image,"secrets",null,50);
            const createdSecret = await Secrets.create({user_id,secret,image:url});
            
            const updateUser = await User.findByIdAndUpdate({_id:user_id},{
                $push:{secrets:createdSecret._id}
            },{new:true});
            
            await sendMail("Hush Mate",req.user.email,"heres your today secret",secretTemplate(url,secret));

            return res.status(200).json({
                success:true,
                message:"created secret",
                updateUser,
                createdSecret
            })
        }else{

            const createdSecret = await Secrets.create({user_id,secret});
            
            const updateUser = await User.findByIdAndUpdate({_id:user_id},{
                $push:{secrets:createdSecret._id}
            },{new:true});
            
            await sendMail("Nigga Hood",req.user.email,"heres your today secret",secretTemplate(null,secret));
            
            return res.status(200).json({
                success:true,
                message:"created secret",
                updateUser,
                createdSecret
            })
        }

    }catch(error){
        console.log(error);
        return res.status(200).json({
            success:false,
            message:"can not create secret"
        })
    }
}

exports.getAllSecrets = async(req,res)=>{
    try{
        console.log("inside getAll secrets")
        const allSecrets = await Secrets.find({}).populate("user_id");

        return res.status(200).json({
            success:true,
            message:true,
            allSecrets
        })

    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message: "cannot fetch all secrets"
        })
    }
}

exports.deleteSecret=async(req,res)=>{
    try{

        const {id} = req.body;
        const userid = req.user.user_id;
        const remove = await Secrets.findByIdAndDelete({_id:id});
        const allSecrets = await Secrets.find({user_id:userid});
        // console.log(allSecrets);
        return res.status(200).json({
            success:true,
            message:"secret deleted",
            allSecrets
        })

    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"cannot delete secret"
        })
    }
}

exports.getUserSecret=async(req,res)=>{
    try{
        const id = req.user.user_id;
        const userSecrets = await Secrets.find({user_id:id});

        return res.status(200).json({
            success:true,
            secrets:userSecrets,
            message:"fetchedUserSecrets"
        })

        
    }catch(error){
        res.status(403).json({
            success:false,
            message:"could not fecth secrets"
        })
        console.log(error);

    }
}  
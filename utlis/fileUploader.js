const cloudinary = require("cloudinary").v2;


exports.fileUpload=async(file,folder,height,quality)=>{
    try{

        console.log("inside upload");
        let options = {folder};
        if(height){
            options.height=height
        }
        if(quality){
            options.quality=quality
        }
        options.resource_type="auto";

        const url = await cloudinary.uploader.upload(file.tempFilePath,options);
        console.log("printing url",url)
        return url.secure_url;

    }catch(error){
        console.log(error);
    }
}
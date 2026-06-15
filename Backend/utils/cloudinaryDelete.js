import cloudinary from "../config/cloudinary.js"


const DeleteFromCloudinary = async(publicId) => {
    return await cloudinary.uploader.destroy(publicId);
}

export default DeleteFromCloudinary;
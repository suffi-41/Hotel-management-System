import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFileInCloudinary = async (file) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(file);
        return uploadResult.secure_url;
    } catch (error) {
        console.log(error);
    }
};

export default uploadFileInCloudinary;
 
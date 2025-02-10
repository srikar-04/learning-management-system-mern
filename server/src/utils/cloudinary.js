import { v2 as cloudinary } from "cloudinary";

// config with env data
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadMediaToCloudinary = async (filePath) => {
    try {

        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto'
        })

        return result
        
    } catch (error) {
        console.log(error, 'error in cloudinary upload');
        throw new Error('error while uploading to cloudinary')
    }
}

const deleteMediaFromCloudinary = async(publicId) => {

    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {    
        console.log(error, 'error in cloudinary delete');
        throw new Error('error while deleting from cloudinary')
    }

}

export {uploadMediaToCloudinary, deleteMediaFromCloudinary}
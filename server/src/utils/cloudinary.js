import { v2 as cloudinary } from "cloudinary";


// checking the connection of cloudinary
async function testCloudinaryConnection() {
    try {
        // Ping Cloudinary to verify connection
        await cloudinary.api.ping();
        console.log('Cloudinary configuration is valid and connection successful');
        return true;
    } catch (error) {
        console.error('Cloudinary configuration test failed:', error);
        throw new Error('Unable to connect to Cloudinary');
    }
}

// checking if the configuration is done or not
const validateCloudinaryConfig = () => {
    const requiredEnvVars = [
        'CLOUDINARY_CLOUD_NAME',
        'CLOUDINARY_API_KEY',
        'CLOUDINARY_API_SECRET'
    ];

    const missingVars = requiredEnvVars.filter(varName => 
        !process.env[varName] || process.env[varName].trim() === ''
    );


    if (missingVars.length > 0) {
        throw new Error(`Missing Cloudinary configuration: ${missingVars.join(', ')}`);
    }

    // configuring cloudinary
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })

    return testCloudinaryConnection();
}

const uploadMediaToCloudinary = async (filePath) => {

    await validateCloudinaryConfig()
    
    try {
       
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
        })

        return result
        
    } catch (error) {
        // console.log(process.env.CLOUDINARY_API_KEY, 'api key of cloudinary');
        console.log(error, 'error in cloudinary upload', error);
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
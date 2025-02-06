import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/LMS`)
        console.log('\n mongo DB connected!! DB Host ', connectionInstance.connection.host);
    } catch (error) {
        console.log('error while connection to mongoDB', error);
        process.exit(1)
    }
}
export {connectDB}
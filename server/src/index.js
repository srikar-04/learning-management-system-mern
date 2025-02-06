import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import { connectDB } from './DB/index.js';

dotenv.config()

const app = express();

// MIDDLEWARES
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json());

//routes configuration


// DB Connection
const PORT = process.env.PORT || 5000

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log('app is listening on port : ', PORT);
    })
})
.catch( (error) => {
    console.log('Failed to connect mongo DB!!!', error);
})
import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import { connectDB } from './DB/index.js';
import authRoutes from './routes/auth.routes.js'

dotenv.config()

const app = express();

// MIDDLEWARES
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//     methods: ['GET', 'POST', 'DELETE', 'PUT'],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "16kb"})) // for accepting form data
app.use(express.static("public")) // for storing static files like images

//routes configuration
app.use('/auth', authRoutes)

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
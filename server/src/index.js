import dotenv from 'dotenv';
dotenv.config()
import express from 'express'
import cors from 'cors'
import { connectDB } from './DB/index.js';
import authRoutes from './routes/auth.routes.js'
import mediaRoutes from './routes/media.routes.js'
import courseRoutes from './routes/course.routes.js'



const app = express();

// MIDDLEWARES
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//     methods: ['GET', 'POST', 'DELETE', 'PUT'],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }))
app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    })
  );
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "16kb"})) // for accepting form data
app.use(express.static("public")) // for storing static files like images

//routes configuration
app.use('/auth', authRoutes)
app.use('/media', mediaRoutes)
app.use('/course', courseRoutes)

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
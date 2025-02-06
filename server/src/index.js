import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'

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




const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('app is listening on port : ', PORT);
})
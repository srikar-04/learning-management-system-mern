import multer from 'multer'
import { uploadMediaToCloudinary, deleteMediaFromCloudinary } from '../utils/cloudinary.js'
import {Router} from 'express'

const router = Router();

const upload = multer({dest: 'uploads/'})

router.post('/upload', upload.single('file'), async(req, res) => {
    try {
        const result = await uploadMediaToCloudinary(req.file.path)
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log('error while uploading, in media.routes file', error);
        res.status(500).json({
            success: false,
            msg: 'Error uploading file'
        })
    }
})

router.delete('/delete/:id',async(req, res) => {
    try {

        const {id} = req.params;
        if(!id) {
            console.log('id missing, in media.routes file');
            res.status(500).json({
                success: false,
                msg: 'id missing'
            })
        }
        await deleteMediaFromCloudinary(id);
        res.status(200).json({
            success: true,
            msg: 'successfully deleted asset from cloudinary'
        })
        
    } catch (error) {
        console.log('error while deleting, in media.routes file');
        res.status(500).json({
            success: false,
            msg: 'Error deleting file'
        })
    }
})

router.route('/bulk-upload').post(upload.array('files', 10), async (req, res) => {

    try {

        let uploadPromises = req.files.map( fileItem => uploadMediaToCloudinary(fileItem.path))

        const results = await Promise.all(uploadPromises)

        res.status(200).json({
            success: true,
            data: results
        })
        
    } catch (error) {
        console.log('error while doing bulk-upload, in media.routes : ', error);
        res.status(500).json({
            success: false,
            msg: 'Error bulk uploading file'
        })
    }

})

export default router
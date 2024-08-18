import { Router, Express } from "express";
import multer from "multer";
import path from "path";
import { FirebaseMediaProxy } from "../proxies/imp/FirebaseMediaProxy";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadRouter = Router();

uploadRouter.post('/upload', upload.array('image', 10), async (req, res) => {
    const firebase = new FirebaseMediaProxy();
    try {
        console.log('files => ', req.files[0])
        let uploadedFiles = []
        
        for (const file of req.files as Express.Multer.File[]) {
            const fileType = file.mimetype.split("/")[1];
            const filePath = `${req.body.id}/${Date.now()}.${fileType}`;
            const url = await firebase.saveImage(file.buffer, filePath);
            uploadedFiles.push(url)
        }
        res.send(uploadedFiles);
    } catch (err) {
        res.status(400).send(err);
    }
});

export { uploadRouter };
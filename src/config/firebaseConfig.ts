import * as admin from "firebase-admin/app";
import serviceAccount from "./saude-social-upload-config.json";
import { getStorage } from "firebase-admin/storage";

admin.initializeApp({
    credential: admin.cert(serviceAccount as admin.ServiceAccount),
});

// getting modules
const bucket = getStorage(admin.getApp()).bucket(
    "saude-social-upload-nodejs.appspot.com",
);

export { bucket };

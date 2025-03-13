// import * as admin from "firebase-admin/app";
import * as admin from "firebase-admin";
// import serviceAccount from "./saude-social-upload-config.json";
import serviceAccount from "./saudesocialdb-firebase.json";
import { getStorage } from "firebase-admin/storage";



admin.initializeApp({
    // credential: admin.cert(serviceAccount as admin.ServiceAccount),
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: 'saudesocialdb.firebasestorage.app'
});

// getting modules
// const bucket = getStorage(admin.app).bucket(
//     "saude-social-upload-nodejs.appspot.com",
// );

// const bucket = getStorage().bucket('my-custom-bucket');

const bucket = admin.storage().bucket();

export { bucket };

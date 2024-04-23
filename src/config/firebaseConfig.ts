import * as admin from "firebase-admin/app";
import serviceAccount from "./serviceAccount.json";
import { getStorage } from "firebase-admin/storage";

admin.initializeApp({
    credential: admin.cert(serviceAccount as admin.ServiceAccount),
});

// getting modules
const bucket = getStorage(admin.getApp()).bucket(
    "saude-social-10729.appspot.com",
);

export { bucket };

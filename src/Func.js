import { collection, getDocs, query, where } from "@firebase/firestore/lite";
import { firestoreService } from "./Firebase"
const db = firestoreService;
export const getUserInfo = async(uid) => {
    const q = query(collection(db,"User"),where("uid","==",uid));
    const querySnapshot = await (await getDocs(q)).docs;
    const user = {
        ...querySnapshot[0].data(),
        id:querySnapshot[0].id
    }
    return user;
}
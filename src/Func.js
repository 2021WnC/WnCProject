import { collection, getDocs, query, where } from "@firebase/firestore/lite";
import { firestoreService } from "./Firebase";
const db = firestoreService;
export const getUserInfo = async (uid) => {
  const q = query(collection(db, "User"), where("uid", "==", uid));
  const querySnapshot = await (await getDocs(q)).docs;
  const user = {
    ...querySnapshot[0].data(),
    id: querySnapshot[0].id,
  };
  return user;
};
export const isAdminFunction = async (uid) => {
  const q = query(
    collection(db, "User"),
    where("uid", "==", uid),
    where("role", "==", "관리자")
  );
  const querySnapshot = await (await getDocs(q)).docs;
  if (querySnapshot.length > 0) {
    return true;
  } else {
    return false;
  }
};

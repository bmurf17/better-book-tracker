import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { SiteUser } from "../types/bookType";

export default function loadUser(
  uid: string,
  setTheUser: React.Dispatch<React.SetStateAction<SiteUser | undefined>>
) {
  const unsub = onSnapshot(collection(db, "books"), async () => {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const theUser = await getDocs(q);

    theUser.docs.map((doc) => {
      const siteUser: SiteUser = {
        id: doc.id,
        friends: doc.data().friends,
        name: doc.data().name,
        profileImg: doc.data().profileImg,
        uid: doc.data().uid,
      };
      setTheUser(siteUser);
      return siteUser;
    });
  });
  return unsub;
}

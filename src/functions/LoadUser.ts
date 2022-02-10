import { User } from "firebase/auth";
import {
  addDoc,
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
  const unsub = onSnapshot(collection(db, "users"), async () => {
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

export function loadPotentialFriends(
  theUser: SiteUser,
  setPossibleFriends: React.Dispatch<React.SetStateAction<SiteUser[]>>
) {
  const unsub = onSnapshot(collection(db, "users"), async () => {
    const q = query(collection(db, "users"), where("uid", "!=", theUser?.uid));

    const querySnapshot = await getDocs(q);
    const friendList = querySnapshot.docs.map((doc) => {
      //might be able to remove setting it as an empty object. Just fear of it not being undefined
      let theFriend: SiteUser = {
        id: "",
        friends: [],
        name: "",
        profileImg: "",
        uid: "",
      };
      if (!theUser?.friends.includes(doc.data().uid)) {
        theFriend = {
          id: doc.data().id,
          friends: doc.data().friends,
          name: doc.data().name,
          profileImg: doc.data().profileImg,
          uid: doc.data().uid,
        };
      }
      return theFriend;
    });
    setPossibleFriends(friendList);
  });

  return unsub;
}

export function loadFriends(
  theUser: SiteUser,
  setFriends: React.Dispatch<React.SetStateAction<SiteUser[]>>
) {
  const unsub = onSnapshot(collection(db, "users"), async () => {
    const q = query(collection(db, "users"), where("uid", "==", theUser?.uid));

    //get the current user
    const querySnapshot = await getDocs(q);

    const arrayOfFriendUids: string[] = querySnapshot.docs[0].data().friends;

    if (querySnapshot.docs[0]) {
      const friendList = await Promise.all(
        arrayOfFriendUids.map(async (uid) => {
          const q2 = query(collection(db, "users"), where("uid", "==", uid));
          const querySnapshot2 = await getDocs(q2);
          const data = querySnapshot2.docs[0].data();
          const theFriend: SiteUser = {
            name: data.name,
            profileImg: data.profileImg,
            friends: data.friends,
            uid: data.uid,
          };
          return theFriend;
        })
      );
      setFriends(friendList);
    }
  });

  return unsub;
}

export function addUserToDB(user: User | null) {
  const unsub = onSnapshot(collection(db, "users"), async () => {
    const usersCollectionRef = collection(db, "users");

    const q = query(usersCollectionRef, where("uid", "==", user?.uid));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      const theUser: SiteUser = {
        uid: user?.uid || "",
        name: user?.displayName || "",
        profileImg: user?.photoURL || "",
        friends: [],
        dateCreated: new Date(),
      };

      await addDoc(usersCollectionRef, theUser);
    }
  });
  return unsub;
}

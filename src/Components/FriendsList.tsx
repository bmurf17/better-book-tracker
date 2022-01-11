import { User } from "firebase/auth";
import {
  query,
  collection,
  where,
  getDocs,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { SiteUser } from "../types/bookType";

interface Props {
  user: User | null;
}

export function FriendsList(props: Props) {
  const user = props.user;
  const [friends, setFriends] = useState<SiteUser[]>([]);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (user) {
        const usersCollectionRef = collection(db, "users");

        const q = query(usersCollectionRef, where("uid", "==", user?.uid));

        const querySnapshot = await getDocs(q);

        const temp = querySnapshot.docs.map(async (doc) => {
          const q2 = query(
            usersCollectionRef,
            where("uid", "==", doc.data().friends[0])
          );
          const theFriendData = await getDocs(q2);

          const friendList = theFriendData.docs.map((doc) => {
            const theFriend: SiteUser = {
              friends: doc.data().friends,
              name: doc.data().name,
              profileImg: doc.data().profileImg,
              uid: doc.data().uid,
            };
            console.log(theFriend);
            return theFriend;
          });

          setFriends(friendList);
        });
      }
    };

    getCurrentUser();
  }, [user]);

  return (
    <>
      {friends.map((friend) => {
        return (
          <>
            <p>{friend.name}</p>
            <p>Date Joined{friend.dateCreated}</p>
          </>
        );
      })}
    </>
  );
}
import { Grid, Box, Typography } from "@mui/material";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import BookType, { SiteUser } from "../types/bookType";
import { FriendBookCard } from "./FriendBookCard";
import "./MyBooks.css";

export function FriendBookList() {
  const params = useParams();
  const uid = params.id;
  const [books, setBooks] = useState<BookType[]>([]);
  const [theUser, setTheUser] = useState<SiteUser>();

  useEffect(() => {
    const loadBooks = async () => {
      if (uid) {
        const q = query(
          collection(db, "books"),
          where("uid", "==", uid),
          orderBy("dateRead")
        );

        onSnapshot(collection(db, "books"), async () => {
          const theBooks = await getDocs(q);
          const temp: BookType[] = theBooks.docs.map((doc) => {
            const book: BookType = {
              id: doc.id,
              img: doc.data().img,
              title: doc.data().title,
              author: doc.data().author,
              pageCount: doc.data().pageCount,
              genre: doc.data().genre,
              uid: doc.data().uid,
              dateRead: doc.data().dateRead,
              rating: doc.data().rating,
            };
            return book;
          });
          setBooks(temp);
        });
      }

      if (uid === null) {
        setBooks([]);
      }
    };
    const loadUser = async () => {
      //get the user based on UID from firebase auth
      const usersCollectionRef = collection(db, "users");
      const q = query(usersCollectionRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.docs.map((doc) => {
        const siteUser: SiteUser = {
          id: doc.id,
          friends: doc.data().friends,
          name: doc.data().name,
          profileImg: doc.data().profileImg,
          uid: doc.data().uid,
        };
        return setTheUser(siteUser);
      });
    };

    loadBooks();
    loadUser();
  }, [uid, books.length]);

  return (
    <div className="App-background">
      <div className="App-welcome">
        <Typography variant="h5">{theUser?.name}'s Books </Typography>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {books.map((book) => {
            return <FriendBookCard key={book.id} book={book} />;
          })}
        </Grid>
      </Box>
    </div>
  );
}

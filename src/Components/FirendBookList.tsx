import { Grid, Box } from "@mui/material";
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
import BookType from "../types/bookType";
import { FriendBookCard } from "./FriendBookCard";
import "./MyBooks.css";

export function FriendBookList() {
  const params = useParams();
  const uid = params.id;
  const [books, setBooks] = useState<BookType[]>([]);

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
    loadBooks();
  }, [uid, books.length]);

  return (
    <div className="App-background">
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

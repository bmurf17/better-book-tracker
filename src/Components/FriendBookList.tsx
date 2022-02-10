import { Grid, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loadBooks from "../functions/loadBooksDB";
import loadUser from "../functions/LoadUser";
import BookType, { SiteUser } from "../types/bookType";
import { FriendBookCard } from "./FriendBookCard";
import "./MyBooks.css";

export function FriendBookList() {
  const params = useParams();
  const uid = params.id;
  const [books, setBooks] = useState<BookType[]>([]);
  const [theUser, setTheUser] = useState<SiteUser>();

  useEffect(() => {
    const unsubscribeBooks = loadBooks(uid || "", setBooks);
    const unsubscribeUser = loadUser(uid || "", setTheUser);

    return () => {
      unsubscribeBooks();
      unsubscribeUser();
    };
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

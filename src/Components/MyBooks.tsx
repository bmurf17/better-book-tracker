import { AddBookCard } from "./AddBookCard";
import { BookCard } from "./BookCard";
import BookType from "../types/bookType";
import "./MyBooks.css";
import { Grid, Box, Typography } from "@mui/material";
import { User } from "firebase/auth";

interface Props {
  books: BookType[];
  user: User | null;
}

export function MyBooks(props: Props) {
  const { user } = props;
  return (
    <div className="App-background">
      {user ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <AddBookCard user={user} />
            {props.books.map((book) => {
              return <BookCard key={book.id} book={book} />;
            })}
          </Grid>
        </Box>
      ) : (
        <div className="App-header">
          <Typography variant="h5">Sign in to create your book list</Typography>
        </div>
      )}
    </div>
  );
}

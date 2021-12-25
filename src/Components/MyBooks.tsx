import { Grid, Box } from "@mui/material";
import { User } from "firebase/auth";
import BookType from "../types/bookType";
import { AddBookCard } from "./AddBookCard";
import { BookCard } from "./BookCard";
import "./MyBooks.css";

interface Props {
  books: BookType[];
  user: User | null;
}

export function MyBooks(props: Props) {
  return (
    <div className="App-background">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <AddBookCard user={props.user} />
          {props.books.map((book) => {
            return <BookCard key={book.id} book={book} />;
          })}
        </Grid>
      </Box>
    </div>
  );
}

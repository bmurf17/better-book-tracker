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
          <Grid item xs={12} sm={6} md={4}>
            <AddBookCard user={props.user} />
            {props.books.map((book) => {
              return <BookCard key={book.id} book={book} />;
            })}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

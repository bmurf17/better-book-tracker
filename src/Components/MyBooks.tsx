import { Grid, Box } from "@mui/material";
import BookType from "../types/bookType";
import { AddBookCard } from "./AddBookCard";
import { BookCard } from "./BookCard";
import "./MyBooks.css";

interface Props {
  books: BookType[];
}

export function MyBooks(props: Props) {
  return (
    <div className="App-background">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <AddBookCard />
          {props.books.map((book) => {
            return <BookCard key={book.id} book={book} />;
          })}
        </Grid>
      </Box>
    </div>
  );
}

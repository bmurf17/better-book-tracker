import { Grid, Box } from "@mui/material";
import BookType from "../types/bookType";
import { BookCard } from "./BookCard";
import "./Home.css";

interface Props {
  books: BookType[];
}

export function Home(props: Props) {
  return (
    <div className="App-background">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {props.books.map((book) => {
            return <BookCard book={book} />;
          })}
        </Grid>
      </Box>
    </div>
  );
}

import { AddBookCard } from "./AddBookCard";
import { BookCard } from "./BookCard";
import BookType from "../types/bookType";
import "./MyBooks.css";
import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import { User } from "firebase/auth";

interface Props {
  books: BookType[];
  user: User | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

export function MyBooks(props: Props) {
  const { user, loading, setLoading } = props;
  return (
    //might be able to move this div out to app.tsx
    <div className="App-background">
      {user ? (
        <Box sx={{ flexGrow: 1 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              <AddBookCard user={user} setLoading={setLoading} />
              {props.books.map((book) => {
                return (
                  <BookCard key={book.id} book={book} setLoading={setLoading} />
                );
              })}
            </Grid>
          )}
        </Box>
      ) : (
        <div className="App-header">
          <Typography variant="h5">Sign in to create your book list</Typography>
        </div>
      )}
    </div>
  );
}

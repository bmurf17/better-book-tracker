import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import BookType from "../types/bookType";
import { BookDialog } from "./BookDialog";
import "./MyBooks.css";

interface Props {
  book: BookType;
}

export function BookCard(props: Props) {
  const [open, setOpen] = useState(false);

  const img = props.book.img;
  const title = props.book.title;
  const author = props.book.author;
  const pageCount = props.book.pageCount;
  const genre = props.book.genre;

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid item xs={12} sm={4} md={4}>
        <div className="App-book">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={onOpen}>
              <CardMedia
                component="img"
                height="140"
                image={img}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Book Title: {title}
                </Typography>
                <Typography gutterBottom variant="body1">
                  Book Author: {author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Page Count: {pageCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Genre: {genre}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Grid>

      <BookDialog open={open} onClose={onClose} book={props.book} />
    </>
  );
}

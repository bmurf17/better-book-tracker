import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import Rating from "@material-ui/lab/Rating";
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
  const rating = props.book.rating;

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
                  {title}
                </Typography>
                <Typography gutterBottom variant="body1">
                  By: {author}
                </Typography>
                <Rating value={rating} readOnly precision={0.5} />
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Grid>

      <BookDialog open={open} onClose={onClose} book={props.book} />
    </>
  );
}

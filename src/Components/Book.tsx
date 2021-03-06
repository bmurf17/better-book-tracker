import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import BookType from "../types/bookType";
import "./Home.css";

interface Props {
  book: BookType;
}

export function Book(props: Props) {
  const img = props.book.img;
  const title = props.book.title;
  const author = props.book.author;
  const pageCount = props.book.pageCount;
  const genre = props.book.genre;
  return (
    <>
      <Grid item xs={2} sm={4} md={4}>
        <div className="App-book">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
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
    </>
  );
}

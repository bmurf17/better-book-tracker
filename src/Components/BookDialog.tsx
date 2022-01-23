import { useState } from "react";
import BookType from "../types/bookType";
import { db } from "../firebase.config";
import "./MyBooks.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Typography,
  Button,
  Box,
  Grid,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Delete } from "@mui/icons-material";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import Rating from "@material-ui/lab/Rating";

interface Props {
  open: boolean;
  onClose: () => void;
  book: BookType;
}

export function BookDialog(props: Props) {
  const { open, onClose, book } = props;

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [pageCount, setPageCount] = useState(book.pageCount);
  const [genre, setGenre] = useState(book.genre);
  const [rating, setRating] = useState(book.rating);

  const handleDelete = async () => {
    const userDoc = doc(db, "books", book.id);
    await deleteDoc(userDoc);
    onClose();
  };

  const updateBook = async () => {
    //TODO: Figure out how to upload an image to change it (not just the URL)
    const newFields = {
      title: title,
      author: author,
      pageCount: Number(pageCount),
      genre: genre,
    };
    const userDoc = doc(db, "books", book.id);

    await updateDoc(userDoc, newFields);

    onClose();
  };

  const changeRating = async (newValue: number) => {
    const userDoc = doc(db, "books", book.id);

    await updateDoc(userDoc, {
      rating: newValue,
    });

    setRating(newValue);
  };

  return (
    <Dialog open={open} maxWidth={"md"}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
        {book.title}
      </DialogTitle>
      <DialogContent dividers>
        <Grid
          style={{ paddingTop: 6, paddingBottom: 6 }}
          key={book.title}
          container
        >
          <Grid item>
            <img
              className="App-image"
              src={book.img}
              alt={book.title}
              width="250"
              height="350"
            />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Box
                display="flex"
                style={{ paddingTop: 9, paddingBottom: 6 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "background.paper",
                }}
              >
                <Typography
                  style={{
                    paddingLeft: 20,
                    paddingRight: 4,
                  }}
                  color="primary"
                  variant="h5"
                >
                  {"Title: "}
                </Typography>
                <TextField
                  defaultValue={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Box>
              <Box
                display="flex"
                style={{ paddingTop: 9, paddingBottom: 6 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "background.paper",
                }}
              >
                <Typography
                  style={{
                    paddingLeft: 16,
                    paddingRight: 4,
                  }}
                  color="primary"
                  variant="h5"
                >
                  {"Author: "}
                </Typography>
                <TextField
                  defaultValue={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                />
              </Box>
              <Box
                display="flex"
                style={{ paddingTop: 9, paddingBottom: 6 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "background.paper",
                }}
              >
                <Typography
                  style={{
                    paddingLeft: 16,
                    paddingRight: 4,
                  }}
                  color="primary"
                  variant="h5"
                >
                  {" Page Count: "}
                </Typography>
                <TextField
                  defaultValue={pageCount}
                  onChange={(e) => {
                    setPageCount(Number(e.target.value));
                  }}
                />
              </Box>
              <Box
                display="flex"
                style={{ paddingTop: 9, paddingBottom: 6 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "background.paper",
                }}
              >
                <Typography
                  style={{
                    paddingLeft: 16,
                    paddingRight: 4,
                  }}
                  color="primary"
                  variant="h5"
                >
                  {" Genre: "}
                </Typography>
                <TextField
                  style={{ paddingRight: 80 }}
                  defaultValue={genre}
                  onChange={(e) => {
                    setGenre(e.target.value);
                  }}
                />
              </Box>
              <Box
                display="flex"
                style={{
                  paddingTop: 6,
                  paddingBottom: 6,
                  paddingLeft: 12,
                }}
              >
                <Rating
                  value={rating}
                  name={"Rating"}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      changeRating(newValue);
                    }
                  }}
                />
              </Box>
              <Box
                display="flex"
                style={{
                  paddingTop: 6,
                  paddingBottom: 6,
                  paddingLeft: 12,
                }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<Delete />}
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            updateBook();
          }}
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

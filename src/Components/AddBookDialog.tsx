import React, { useState } from "react";
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
import "./MyBooks.css";
import { db } from "../firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { getBook } from "../functions/googleBook";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { User } from "firebase/auth";

interface Props {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

export function AddBookDialog(props: Props) {
  const { open, onClose } = props;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [genre, setGenre] = useState("");
  const img = "https://m.media-amazon.com/images/I/618Duj4AwNL._SL1500_.jpg";
  const booksCollectionRef = collection(db, "books");

  const createBook = async () => {
    await addDoc(booksCollectionRef, {
      img: img,
      title: title,
      author: author,
      pageCount: pageCount,
      genre: genre,
      uid: props.user?.uid,
    });
    onClose();
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
        Add A New Book
      </DialogTitle>
      <DialogContent dividers>
        <Grid style={{ paddingTop: 6, paddingBottom: 6 }} container>
          <Grid item>
            <img
              className="App-image"
              src={img}
              alt="Add a new book"
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
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    color: "#3f51b5",
                    borderColor: "#3f51b5",
                  }}
                  startIcon={<SyncAltIcon />}
                  onClick={async () => {
                    await getBook(title, author, props.user);
                    onClose();
                  }}
                >
                  Fill Info
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
            createBook();
          }}
        >
          Add Book
        </Button>
      </DialogActions>
    </Dialog>
  );
}

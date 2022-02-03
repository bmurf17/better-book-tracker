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
import { storage } from "../firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

interface Props {
  open: boolean;
  onClose: () => void;
  user: User | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddBookDialog(props: Props) {
  const { open, onClose, user, setLoading } = props;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [genre, setGenre] = useState("");
  const [img, setImg] = useState(
    "https://m.media-amazon.com/images/I/618Duj4AwNL._SL1500_.jpg"
  );
  const [editable, setEditable] = useState(true);

  const handleChange = async (e: any) => {
    if (e.target.files) {
      const sotrageRef = ref(storage, `files/${e.target.files[0].name}`);
      const uploadTask = uploadBytesResumable(sotrageRef, e.target.files[0]);

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {},
        (error: any) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImg(downloadURL);
          });
        }
      );
    }
  };

  const createBook = async () => {
    setLoading(true);
    const booksCollectionRef = collection(db, "books");
    await addDoc(booksCollectionRef, {
      img: img,
      title: title,
      author: author,
      pageCount: pageCount,
      genre: genre,
      uid: user?.uid,
      dateRead: new Date(),
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
            <Box display="flex">
              <img
                className="App-image"
                src={img}
                alt="Add a new book"
                width="250"
                height="350"
              />
            </Box>
            <Box display="flex" sx={{ paddingTop: 4, paddingBottom: 4 }}>
              <Button
                onChange={handleChange}
                component="label"
                variant="contained"
              >
                Upload An Image
                <input type="file" hidden />
              </Button>
            </Box>
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
                {editable ? (
                  <Typography>{author}</Typography>
                ) : (
                  <TextField
                    defaultValue={author}
                    onChange={(e) => {
                      setAuthor(e.target.value);
                    }}
                  />
                )}
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
                {editable ? (
                  <Typography>{pageCount}</Typography>
                ) : (
                  <TextField
                    defaultValue={pageCount}
                    onChange={(e) => {
                      setAuthor(e.target.value);
                    }}
                  />
                )}
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
                {editable ? (
                  <Typography>{genre}</Typography>
                ) : (
                  <TextField
                    defaultValue={genre}
                    onChange={(e) => {
                      setAuthor(e.target.value);
                    }}
                  />
                )}
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
                    const returnBook = await getBook(title, author, user);
                    setTitle(returnBook.title);
                    setPageCount(+returnBook.pageCount);
                    setAuthor(returnBook.author);
                    setGenre(returnBook.genre);
                    setImg(returnBook.img);
                    setEditable(false);
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

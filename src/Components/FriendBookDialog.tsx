import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BookType from "../types/bookType";
import "./MyBooks.css";
import Rating from "@material-ui/lab/Rating";

interface Props {
  open: boolean;
  onClose: () => void;
  book: BookType;
}

export function FriendBookDialog(props: Props) {
  const { open, onClose, book } = props;
  const title = book.title;
  const author = book.author;
  const pageCount = book.pageCount;
  const genre = book.genre;
  const rating = book.rating;

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
                <Typography variant="h5" style={{ paddingLeft: 2 }}>
                  {title}
                </Typography>
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
                <Typography variant="h5" style={{ paddingLeft: 2 }}>
                  {author}
                </Typography>
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
                <Typography variant="h5" style={{ paddingLeft: 2 }}>
                  {pageCount}
                </Typography>
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
                <Typography variant="h5" style={{ paddingLeft: 2 }}>
                  {genre}
                </Typography>
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
                  readOnly
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

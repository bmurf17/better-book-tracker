import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { User } from "firebase/auth";
import { useState } from "react";
import { AddBookDialog } from "./AddBookDialog";

interface Props {
  user: User | null;
}

export function AddBookCard(props: Props) {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="App-book">
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea onClick={onOpen}>
            <CardMedia
              component="img"
              height="140"
              image="https://secure.img1-fg.wfcdn.com/im/73052174/resize-h445%5Ecompr-r85/5678/56786400/Vintage+Book+ColorPak.jpg"
              alt="Add Book photo"
            />
            <CardContent className="App-addItem">
              <Box
                display="flex"
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  Add A Book
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>

      <AddBookDialog open={open} onClose={onClose} user={props.user} />
    </>
  );
}

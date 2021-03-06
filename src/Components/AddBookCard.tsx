import { useState } from "react";
import { AddBookDialog } from "./AddBookDialog";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { User } from "firebase/auth";

interface Props {
  user: User | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddBookCard(props: Props) {
  const { user, setLoading } = props;

  const [open, setOpen] = useState(false);

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
      </Grid>

      <AddBookDialog
        open={open}
        onClose={onClose}
        user={user}
        setLoading={setLoading}
      />
    </>
  );
}

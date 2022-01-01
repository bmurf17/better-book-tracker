import { Typography } from "@mui/material";
import { User } from "firebase/auth";
import { Link } from "react-router-dom";
import "./MyBooks.css";

interface Props {
  user: User | null;
}

export function Home(props: Props) {
  const user = props.user;

  const userName = user?.displayName;

  return (
    <div className="App-header">
      {userName ? (
        <p>Welcome {userName}</p>
      ) : (
        <Link
          to={"/login"}
          style={{
            textDecoration: "none",
            color: "blue",
            padding: 12,
          }}
        >
          <Typography variant="h5">Please Sign In</Typography>
        </Link>
      )}
    </div>
  );
}

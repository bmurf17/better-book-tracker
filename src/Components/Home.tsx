import { User } from "firebase/auth";
import "./MyBooks.css";

interface Props {
  user: User | null;
}

export function Home(props: Props) {
  const user = props.user;

  const userName = user?.displayName;

  return (
    <div className="App-header">
      {userName ? <p>Welcome {userName}</p> : <p>Please log in</p>}
    </div>
  );
}

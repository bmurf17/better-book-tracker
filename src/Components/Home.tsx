import { User } from "firebase/auth";

interface Props {
  user: User | null;
}

export function Home(props: Props) {
  const user = props.user;

  const userName = user?.displayName;

  return <>{userName ? <p>Welcome {userName}</p> : <p>Please log in</p>}</>;
}

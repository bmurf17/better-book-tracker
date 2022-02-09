import BookType from "../types/bookType";
import "./MyBooks.css";
import { User } from "firebase/auth";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import moment from "moment";

interface Props {
  user: User | null;
  books: BookType[];
}

export function Home(props: Props) {
  const { user, books } = props;

  const userName = user?.displayName;

  var count = 0;
  var bookCountArray: any[] = [];
  var labels: any[] = [];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Your Total Page Count",
      },
    },
  };

  books.forEach((book) => {
    if (count === 0) {
      bookCountArray[count] = book.pageCount;
    } else {
      bookCountArray[count] = bookCountArray[count - 1] + book.pageCount;
    }

    labels[count] = moment(book.dateRead.toDate()).calendar();
    count++;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Page Count",
        data: bookCountArray,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  //TODO: Add reading goals/ Add some more data (might move data to different page)/ Feed friends Reading
  return (
    <div className="App-background">
      {userName ? (
        <>
          <div className="App-welcome">
            <Typography variant="h5">Welcome {userName}</Typography>
          </div>
          {books.length > 0 ? <Line options={options} data={data} /> : null}
        </>
      ) : (
        <div className="App-header">
          <Link
            to={"/login"}
            style={{
              textDecoration: "none",
              color: "blue",
              padding: 12,
            }}
          >
            <Typography variant="h3">Please Sign In</Typography>
          </Link>
        </div>
      )}
    </div>
  );
}

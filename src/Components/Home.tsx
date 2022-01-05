import { Container, Typography } from "@mui/material";
import { User } from "firebase/auth";
import { Link } from "react-router-dom";
import "./MyBooks.css";
import BookType from "../types/bookType";
import { Line } from "react-chartjs-2";
import moment from "moment";

interface Props {
  user: User | null;
  books: BookType[];
}

export function Home(props: Props) {
  const user = props.user;
  const books = props.books;

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
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="App-header">
      {userName ? (
        <>
          <Typography variant="h5">Welcome {userName}</Typography>
          <Container maxWidth="lg">
            {books.length > 0 ? <Line options={options} data={data} /> : null}
          </Container>
        </>
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

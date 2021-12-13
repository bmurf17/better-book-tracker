import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.config";
const request = require("superagent");

export async function getBook(title: string, author: string) {
  const booksCollectionRef = collection(db, "books");
  const returnBook = {
    img: "",
    title: "",
    author: "",
    pageCount: "",
    genre: "",
  };
  await request
    .get("https://www.googleapis.com/books/v1/volumes")
    .query({
      q: title,
      fields:
        "items(volumeInfo/description,volumeInfo/title, volumeInfo/authors, volumeInfo/pageCount, volumeInfo/imageLinks/thumbnail, volumeInfo/categories)",
      inauthor: author,
    })
    .then((data: any) => {
      console.log("Here: " + data.body.items[0].volumeInfo.pageCount);
      returnBook.img = data.body.items[0].volumeInfo.imageLinks.thumbnail;
      returnBook.title = data.body.items[0].volumeInfo.title;
      returnBook.author = data.body.items[0]?.volumeInfo.authors[0];
      returnBook.pageCount = data.body.items[0].volumeInfo.pageCount;
      returnBook.genre = data.body.items[0].volumeInfo.categories[0];
    });

  console.log(returnBook);

  await addDoc(booksCollectionRef, {
    img: returnBook.img,
    title: returnBook.title,
    author: returnBook.author,
    pageCount: returnBook.pageCount,
    genre: returnBook.genre,
    uid: "3yfG8kNSVjNtAyz3wrLhMNTnwNp2",
  });

  return returnBook;
}

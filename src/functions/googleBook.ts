import { User } from "firebase/auth";
const request = require("superagent");

export async function getBook(
  title: string,
  author: string,
  user: User | null
) {
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
      returnBook.img = data.body.items[0].volumeInfo.imageLinks.thumbnail;
      returnBook.title = data.body.items[0].volumeInfo.title;
      returnBook.author = data.body.items[0]?.volumeInfo.authors[0];
      if (data.body.items[0].volumeInfo.pageCount) {
        returnBook.pageCount = data.body.items[0].volumeInfo.pageCount;
      } else {
        returnBook.pageCount = "0";
      }
      if (data.body.items[0]?.volumeInfo?.categories) {
        returnBook.genre = data.body.items[0]?.volumeInfo?.categories[0];
      } else {
        returnBook.genre = "Undefined";
      }
    });

  return returnBook;
}

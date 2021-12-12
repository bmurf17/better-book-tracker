const request = require("superagent");

export function getBook(title: string, author: string) {
  const returnBook = {
    img: "",
    title: "",
    author: "",
    pageCount: "",
    genre: ",",
  };
  request
    .get("https://www.googleapis.com/books/v1/volumes")
    .query({
      q: title,
      fields:
        "items(volumeInfo/description,volumeInfo/title, volumeInfo/authors, volumeInfo/pageCount, volumeInfo/imageLinks/thumbnail)",
      inauthor: author,
    })
    .then((data: any) => {
      console.log(data.body.items[0]);
      returnBook.img = data.body.items[0];
      returnBook.title = data.body.items[0].title;
      returnBook.author = data.body.items[0]?.authors;
      returnBook.pageCount = data.body.items[0].pageCount;
    });

  console.log(returnBook);

  return returnBook;
}

export default interface BookType {
  img: string;
  title: string;
  author: string;
  pageCount: number;
  genre: string;
}

export const sampleBook: BookType = {
  img: "",
  title: "The Sirens of Titan",
  author: "Kurt Vonnegut",
  pageCount: 324,
  genre: "Sci-Fi",
};

export const sampleBook2: BookType = {
  img: "",
  title: "The Slow Regard of Silent Things",
  author: "Patrick Rothfuss",
  pageCount: 324,
  genre: "Sci-Fi",
};

export const sampleBook3: BookType = {
  img: "",
  title: "The Book of Basketball",
  author: "Bill Simmons",
  pageCount: 324,
  genre: "Sci-Fi",
};

export const sampleBook4: BookType = {
  img: "",
  title: "It",
  author: "Bill Simmons",
  pageCount: 324,
  genre: "Sci-Fi",
};

export const sampleListOfBooks: BookType[] = [
  sampleBook,
  sampleBook2,
  sampleBook,
  sampleBook3,
  sampleBook,
  sampleBook2,
  sampleBook,
  sampleBook2,
  sampleBook4,
];

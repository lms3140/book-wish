export type Book = {
  id: string;
  bookTitle: string;
  author: string;
  publisher: string;
  genre: string;
  ISBN?: string;
};

export type BookDetail = Book & {
  createdAt: string;
  updatedAt?: string;
};

export type BookResponse = {
  message: string;
  data: {
    id: string;
    userId: string;
    bookTitle: string;
    author: string;
    publisher: string;
    genre: string;
    ISBN?: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

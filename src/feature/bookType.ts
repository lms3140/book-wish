export type Book = {
  id: string;
  bookTitle: string;
  author: string;
  publisher: string;
  genre: string;
  ISBN?: string;
};

export type BookDetail = Book & {
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type BookResponse = {
  message: string;
  data: BookDetail[];
};

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

export type ReadingStatus =
  | "OWNED" // 소장 중, 아직 안읽음
  | "READING" // 읽는중
  | "COMPLETED" // 완독
  | "ABANDONED" // 읽기 전에 포기
  | "ABANDONED_READING"; // 읽다가 포기

export type OwnedBook = {
  id: string;
  userId: string;
  bookId?: string;
  bookTitle: string;
  author: string;
  publisher: string;
  genre: string;
  isbn?: string;
  readingStatus: ReadingStatus;
  purchasedAt: string;
};

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBookStore } from "@/store/bookStore";
import dayjs from "dayjs";

export function BookDetail() {
  const book = useBookStore((state) => state.book);

  if (!book) {
    return (
      <Card>
        <CardContent>
          <p className="text-muted-foreground">No book selected.</p>
        </CardContent>
      </Card>
    );
  }

  const dayFormat = "YY년 MM월 DD일 HH시 m분";

  const bookDetails = [
    { label: "ID", value: book.id },
    { label: "제목", value: book.bookTitle },
    { label: "저자", value: book.author },
    { label: "출판사", value: book.publisher },
    { label: "장르", value: book.genre },
    { label: "ISBN", value: book.ISBN || "-" },
    {
      label: "생성일",
      value: dayjs(book.createdAt).format(dayFormat),
    },
    {
      label: "수정일",
      value: dayjs(book.updatedAt).format(dayFormat) || "-",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.bookTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-3">
          {bookDetails.map((detail) => (
            <div key={detail.label} className="grid gap-1">
              <dt className="text-muted-foreground">{detail.label}</dt>
              <dd className="wrap-break-word font-medium">{detail.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

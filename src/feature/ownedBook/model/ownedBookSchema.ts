import z from "zod";

export const ownedBookSchema = z.object({
  bookTitle: z.string().min(1, "필수 값입니다."),
  author: z.string().min(1, "필수 값입니다."),
  genre: z.string().min(1, "필수 값입니다."),
  publisher: z.string().min(1, "필수 값입니다."),
  isbn: z
    .string()
    .regex(/^\d+$/, "숫자만 입력할 수 있습니다.")
    .optional()
    .or(z.literal("")),
  readingStatus: z.enum([
    "OWNED",
    "READING",
    "COMPLETED",
    "ABANDONED",
    "ABANDONED_READING",
  ]),
  purchasedAt: z.string().min(1, "필수 값입니다."),
});

export type OwnedBookFormValues = z.infer<typeof ownedBookSchema>;
export type ReadingStatus = OwnedBookFormValues["readingStatus"];

export const READING_STATUS_LABEL_MAP: Record<ReadingStatus, string> = {
  OWNED: "소장 중",
  READING: "읽는 중",
  COMPLETED: "완독",
  ABANDONED: "읽기 보류됨",
  ABANDONED_READING: "읽던 중 중단",
} as const;

import { db } from "~/server/db";
import { books } from "./schema";
import { eq, ilike, or } from "drizzle-orm";

export type BookRecord = {
    id: string;
    title: string;
    author: string | null;
    publishedYear: string | null;
    coverUrl: string | null;
};

export async function searchBooksInDb(query: string, limit = 5) {
    return await db
        .select()
        .from(books)
        .where(ilike(books.title, `%${query}%`))
        .limit(limit);
}

export async function upsertBooks(newBooks: BookRecord[]) {
    if (newBooks.length === 0) return;

    await db
        .insert(books)
        .values(newBooks)
        .onConflictDoNothing({ target: books.id });
}

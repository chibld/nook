import { db } from "~/server/db";
import { books } from "./schema";
import { eq, ilike, or, sql, SQL } from "drizzle-orm";

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
        .onConflictDoUpdate({
            target: books.id,
            set: {
                title: sql`COALESCE(EXCLUDED.title, ${books.title})`,
                author: sql`COALESCE(EXCLUDED.author, ${books.author})`,
                publishedYear: sql`COALESCE(EXCLUDED.published_year, ${books.publishedYear})`,
                coverUrl: sql`COALESCE(EXCLUDED.cover_url, ${books.coverUrl})`,
            },
        });
}

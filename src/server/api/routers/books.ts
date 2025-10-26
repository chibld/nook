import { z } from "zod";
import type { id } from "zod/v4/locales";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { searchBooksInDb, upsertBooks } from "~/server/db/books";

export const booksRouter = createTRPCRouter({
    search: publicProcedure
        .input(z.object({ query: z.string().min(1) }))
        .query(async ({ input }) => {
            const query = input.query.trim();
            const cached = await searchBooksInDb(query);

            if (cached.length >= 5) return cached;

            const res = await fetch(
                `https://openlibrary.org/search.json?q=${encodeURIComponent(input.query)}&limit=5`,
            );
            const data = await res.json();

            const newBooks = data.docs.map((book: any) => ({
                id: book.key,
                title: book.title,
                author: book.author_name?.[0] ?? null,
                publishedYear: book.first_publish_year
                    ? String(book.first_publish_year)
                    : null,
                coverUrl: book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : null,
            }));

            await upsertBooks(newBooks);

            const combined = [
                ...cached,
                ...newBooks.filter((b) => !cached.some((c) => c.id === b.id)),
            ].slice(0, 5);

            return combined;
        }),
});

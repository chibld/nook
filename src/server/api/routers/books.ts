import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const booksRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ input }) => {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(input.query)}&limit=5`,
      );
      const data = await res.json();

      return data.docs.map((book: any) => ({
        key: book.key,
        title: book.title,
        author: book.author_name?.[0],
        year: book.first_publish_year,
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : null,
      }));
    }),
});

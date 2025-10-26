import {
    pgTable,
    serial,
    integer,
    text,
    varchar,
    timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name"),
    email: varchar("email", { length: 256 }).notNull().unique(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const books = pgTable("books", {
    id: varchar("id", { length: 50 }).primaryKey(),
    title: text("title").notNull(),
    author: text("author"),
    publishedYear: varchar("published_year", { length: 10 }),
    coverUrl: text("cover_url"),
});

export const reviews = pgTable("reviews", {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    bookId: varchar("book_id", { length: 50 })
        .notNull()
        .references(() => books.id, { onDelete: "cascade" }),
    rating: integer("rating"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow(),
});

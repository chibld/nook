"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const search = api.books.search.useQuery({ query }, { enabled: !!query });

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-full max-w-2xl">
                <input
                    type="text"
                    className="focus:ring-foreground w-full rounded-xl bg-white p-3 text-black focus:ring-3 focus:outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="absolute">
                    {search.isLoading && <p>Loading...</p>}
                    {search.data && (
                        <ul className="space-y-2 pt-2">
                            {search.data.map((book) => (
                                <li
                                    key={book.key}
                                    className="bg-foreground flex items-center gap-4 rounded-xl p-3"
                                >
                                    {book.coverUrl && (
                                        <img
                                            src={book.coverUrl}
                                            alt={book.title}
                                            className="h-16 w-12 rounded object-cover"
                                        />
                                    )}
                                    <div>
                                        <h2 className="font-semibold text-white">{book.title}</h2>
                                        <p className="text-sm text-white">{book.author}</p>
                                        <p className="text-sm text-white">{book.year}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

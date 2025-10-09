"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const search = api.books.search.useQuery({ query }, { enabled: !!query });

  return (
    <div className="p-6">
      <input
        type="text"
        className="fixed top-6 left-1/2 mb-4 w-2/3 -translate-x-1/2 transform rounded-lg bg-white p-3 text-black"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {search.isLoading && <p>Loading...</p>}
      {search.data && (
        <ul className="space-y-2">
          {search.data.map((book) => (
            <li
              key={book.key}
              className="flex items-center gap-4 rounded border p-2"
            >
              {book.cover && (
                <img
                  src={book.cover}
                  alt={book.title}
                  className="h-16 w-12 rounded object-cover"
                />
              )}
              <div>
                <h2 className="font-semibold">{book.title}</h2>
                <p className="text-sm text-gray-600">{book.author}</p>
                <p className="text-sm text-gray-500">{book.year}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

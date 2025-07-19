'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  // Keep input in sync with prop if it changes (e.g., on navigation)
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${query.trim()}`);
    } else {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">Search</button>
    </form>
  );
}
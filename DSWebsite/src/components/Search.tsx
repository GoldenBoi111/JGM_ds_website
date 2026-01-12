import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { blogPosts } from '../components/posts';
import { Link } from 'react-router-dom';

interface SearchResult {
  title: string;
  description: string;
  url: string;
  type: 'blog' | 'page';
}

const Search: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Function to perform search
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    // Search in blog posts
    const blogResults = blogPosts
      .filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(post => ({
        title: post.title,
        description: post.description,
        url: `/blog/${post.slug}`,
        type: 'blog' as const
      }));

    // Add other pages to search results (for now just blog posts)
    setResults(blogResults);
  };

  useEffect(() => {
    performSearch(query);
  }, [query]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setQuery('');
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <button
        onClick={toggleSearch}
        className="p-2 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors"
        aria-label="Open search"
      >
        <FiSearch className="text-xl" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-zinc-700 flex items-center">
            <FiSearch className="text-zinc-400 mr-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-white placeholder-zinc-400 focus:outline-none"
              autoFocus
              aria-label="Search input"
            />
            <button
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
              className="ml-2 text-zinc-400 hover:text-white"
              aria-label="Close search"
            >
              <FiX />
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              <ul>
                {results.map((result, index) => (
                  <li key={index} className="border-b border-zinc-700 last:border-b-0">
                    <Link
                      to={result.url}
                      className="block p-3 hover:bg-zinc-700 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="font-medium text-white">{result.title}</div>
                      <div className="text-sm text-zinc-400 truncate">{result.description}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : query ? (
              <div className="p-4 text-center text-zinc-400">
                No results found for "{query}"
              </div>
            ) : (
              <div className="p-4 text-center text-zinc-400">
                Start typing to search...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
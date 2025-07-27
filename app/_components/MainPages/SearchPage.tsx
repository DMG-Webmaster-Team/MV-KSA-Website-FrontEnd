// app/search/page.tsx or pages/search.tsx (based on your routing style)
"use client";

import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const locale = useLocale();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs?filters[$or][0][Title][$contains]=${query}&filters[$or][1][blogs_type][fields][Name][$contains]=${query}&locale=${locale}&fields=Title,slug,publishedAt&populate[blogs_type][fields]=Name&populate[WidgetImage][fields]=url,alternativeText`
        );
        const data = await res.json();
        setResults(data.data); // Strapi returns in `data`
      } catch (err) {
        console.error("Search error", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Search Results for: "{query}"</h1>

      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((item: any) => (
            <li key={item.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{item.attributes.title}</h2>
              <p>{item.attributes.description?.slice(0, 100)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

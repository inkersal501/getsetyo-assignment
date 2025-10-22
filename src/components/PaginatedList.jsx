import React, { useState, useEffect } from "react";

const PAGE_SIZE = 5;

const PaginatedList = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [showTopBtn, setShowTopBtn] = useState(false);

    const fetchData = async (pageNumber) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts?_limit=${PAGE_SIZE}&_page=${pageNumber}`
            );

            if (!response.ok) throw new Error("Failed to fetch data");

            const data = await response.json();

            if (data.length === 0) {
                setHasMore(false);
            } else {
                setItems((prev) => [...prev, ...data]);
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    // Show/hide back-to-top button
    useEffect(() => {
        const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const loadMore = () => setPage((prev) => prev + 1);

    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: "smooth",
        });
    };

    return (
    <div className="max-w-xl mx-auto p-4 relative">
      <h2 className="text-2xl font-bold mb-4">Paginated Post List</h2>

      {items.map((post) => (
        <div
          key={post.id}
          className="border rounded-lg p-3 mb-3 shadow-sm hover:shadow-md transition"
        >
          <h3 className="font-semibold">{post.title}</h3>
          <p className="text-gray-600 text-sm">{post.body}</p>
        </div>
      ))}

      {loading && (
        <div className="flex justify-center my-4">
          <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-center mt-2">
           {error}{" "}
          <button
            onClick={() => fetchData(page)}
            className="text-blue-600 underline ml-2"
          >
            Retry
          </button>
        </p>
      )}

      {!loading && hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}

      {!hasMore && !loading && (
        <p className="text-center text-gray-500 mt-4">No more posts to load.</p>
      )}

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          title="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default PaginatedList;

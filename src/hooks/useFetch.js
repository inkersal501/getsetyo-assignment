import React, { useState, useEffect } from "react";

const cache = new Map();

export const useFetch = (url) => {
  const [data, setData] = useState(cache.get(url) || null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!cache.has(url));

  const fetchData = async () => {
    if (!url) return;
    if (cache.has(url)) {
      setData(cache.get(url));
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network Error");
      const json = await res.json();
      cache.set(url, json.data);
      setData(json.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const retry = () => fetchData();

  return { data, error, loading, retry };
};
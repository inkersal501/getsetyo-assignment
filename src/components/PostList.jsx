import { useFetch } from "../hooks/useFetch";

export const PostList = ({search}) => {
  const { data, loading, error, retry } = useFetch(`https://httpbin.org/delay/2?query=${search}`);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Post List</h2>
      {loading && <p>Loading...</p>}
      {error && (
        <p className="text-red-500">
          Error: {error.message} <button onClick={retry}>Retry</button>
        </p>
      )}
      {data && (
        <pre className="bg-gray-100 p-2 rounded text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

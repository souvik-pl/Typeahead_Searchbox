import { useEffect, useState } from "react";

function useDebounce(query: string, delay: number = 400) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query]);

  return debouncedQuery;
}

export default useDebounce;

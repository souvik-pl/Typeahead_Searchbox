import { useState } from "react";

function useDebounce(callbackFn: (query: string) => void, delay: number) {
  const [timerId, setTimerId] = useState<number | null>(null);

  function debounce(query: string) {
    if (timerId) clearTimeout(timerId);
    let id = setTimeout(() => {
      callbackFn(query);
    }, delay);
    setTimerId(id);
  }

  return { debounce };
}

export default useDebounce;

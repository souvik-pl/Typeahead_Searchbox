import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import { cancelablePromise, PromiseCancel } from "./common/cancelable-promise";
import { fetchSearchResults } from "./rest-client/search";
import { Item } from "./common/common.type";
import useDebounce from "./common/useDebounce";
import ResultHighlight from "./components/ResultHighlight";
import "./common/cache";

function App() {
  const [searchInputData, setSearchInputData] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const cancelPreviousSearch = useRef<() => void>();

  const debouncedSearchInputData = useDebounce(searchInputData);

  useEffect(() => {
    if (!debouncedSearchInputData) return;
    if (checkCache(debouncedSearchInputData)) return;
    searchItems(debouncedSearchInputData);
  }, [debouncedSearchInputData]);

  function searchItems(searchQuery: string) {
    const resultObj: PromiseCancel<Item[]> = cancelablePromise(fetchSearchResults(searchQuery));
    cancelPreviousSearch.current = resultObj.cancel;
    resultObj.promise.then((result) => {
      console.log(result);
      setSearchResults(result);
      window.resultCache.set(searchQuery, result);
    });
  }

  function keyupHandler(event: React.ChangeEvent<HTMLInputElement>) {
    cancelPreviousSearch.current?.();
    const searchQuery: string = event.currentTarget.value.trim();
    setSearchInputData(searchQuery);
  }

  function checkCache(searchQuery: string) {
    if (window.resultCache.has(searchQuery)) {
      setSearchResults(window.resultCache.get(searchQuery)!);
      return true;
    }

    return false;
  }

  function selectItem(itemName: string) {
    setSearchInputData(itemName);
    setSearchResults([]);
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="Search items"
        onChange={keyupHandler}
        value={searchInputData}
      />
      <ul className={styles.listContainer}>
        {searchInputData &&
          searchResults.map((result) => (
            <li
              className={styles.listItem}
              key={result.id}
              onClick={() => {
                selectItem(result.name);
              }}
            >
              <ResultHighlight searchQuery={searchInputData} resultItem={result.name} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;

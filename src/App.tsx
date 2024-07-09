import { useRef, useState } from "react";
import styles from "./App.module.css";
import { cancelablePromise, PromiseCancel } from "./common/cancelable-promise";
import { fetchSearchResults } from "./rest-client/search";
import { Item } from "./common/common.type";
import useDebounce from "./common/useDebounce";

function App() {
  const [searchInputData, setSearchInputData] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const cancelPreviousSearch = useRef<() => void>();

  const { debounce: debounceSearch } = useDebounce(searchItems, 300);

  function searchItems(searchQuery: string) {
    const resultObj: PromiseCancel<Item[]> = cancelablePromise(fetchSearchResults(searchQuery));
    cancelPreviousSearch.current = resultObj.cancel;
    resultObj.promise.then((result) => {
      console.log(result);

      setSearchResults(result);
    });
  }

  function keyupHandler(event: React.ChangeEvent<HTMLInputElement>) {
    cancelPreviousSearch.current?.();
    const searchQuery: string = event.currentTarget.value;
    setSearchInputData(searchQuery);
    if (searchQuery.trim() === "") return;
    debounceSearch(searchQuery);
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
              {result.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;

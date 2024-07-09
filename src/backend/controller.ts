import { Item } from "../common/common.type";
import { ITEMS } from "./db";

export async function getSearchResults(query: string): Promise<Item[]> {
  return new Promise((resolve) => {
    const queryLowerCased = query.toLowerCase();
    const results: Item[] = ITEMS.filter((item) =>
      item.name.toLowerCase().includes(queryLowerCased)
    );
    setTimeout(() => {
      resolve(results);
    }, 700);
  });
}

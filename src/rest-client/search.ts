import { getSearchResults } from "../backend/controller";
import { Item } from "../common/common.type";

export async function fetchSearchResults(query: string): Promise<Item[]> {
  return getSearchResults(query);
}

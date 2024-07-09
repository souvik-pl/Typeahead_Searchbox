import { Item } from "./common.type";

// Extend the Window interface to include the custom global variable
declare global {
  interface Window {
    resultCache: Map<string, Item[]>;
  }
}

window.resultCache = new Map();

import { get, post, put, del } from "./api.js";

export function getAllItems() {
  return get();
}
export function createItem(text) {
  return post({ text });
}
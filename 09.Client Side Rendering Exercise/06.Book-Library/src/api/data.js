import { get, post, put, del } from "./api.js";
const booksUrl = "/jsonstore/collections/books"

export function getAllBooks() {
  return get(booksUrl);
}
export function createBook(author, title) {
  return post(booksUrl, { author, title });
}
export function getBookById(id) {
  const bookUrl = `${booksUrl}/${id}`;
  console.log(bookUrl)
  return get(bookUrl);
}
export function updateBook(id, author, title) {
  const bookUrl = `${booksUrl}/${id}`;
  return put(bookUrl, { author, title });
}
export function deleteBookById(id) {
  const ideaUrl = `${booksUrl}/${id}`;
  return del(ideaUrl);
}

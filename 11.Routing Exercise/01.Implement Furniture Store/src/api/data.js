import { get, post, put, del } from "./api.js";

const endpoints = {
  dashboard: "/data/catalog",
  create: "/data/catalog",
  getItem: "/data/catalog/",
  updateItem: "/data/catalog/",
  deleteItem: "/data/catalog/",
  myFurniture: "/data/catalog?where=_ownerId%3D%22"
};

export function getAllItems() {
  return get(endpoints.dashboard);
}
export function createItem(data) {
  return post(endpoints.create, data);
}
export function getItemById(id) {
  const itemUrl = `${endpoints.getItem}${id}`;
  return get(itemUrl);
}
export function updateItem(id, data) {
  const itemUrl = `${endpoints.updateItem}${id}`;
  return put(itemUrl, data);
}
export function deleteItemById(id) {
  const itemUrl = `${endpoints.deleteItem}${id}`;
  return del(itemUrl);
}
export function getMyItems(userId) {
  const url = `${endpoints.myFurniture}${userId}%22`
  return get(url);
}
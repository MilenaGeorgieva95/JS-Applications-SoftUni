import { get, post, put, del } from "./api.js";

const endpoints = {
  allItems: "/data/fruits?sortBy=_createdOn%20desc",
  itemById: "/data/fruits/",
  delteItem: '/data/fruits/',
  createItem: '/data/fruits',
  editTeamById: '/data/fruits/'
};

export function getAllItems() {
  return get(endpoints.allItems);
}
export function getItemById(id) {
  return get(`${endpoints.itemById}${id}`);
}
export function createItem(data) {
  return post(endpoints.createItem, data);
}
export function editItem(id, data) {
  return put(`${endpoints.editTeamById}${id}`, data);
}
export function deleteItemById(id) {
  return del(`${endpoints.delteItem}${id}`);
}
export function searchItemsByQuery(query) {
  return get(`/data/fruits?where=name%20LIKE%20%22${query}%22`);
}


import { get, post, put, del } from "./api.js";

const endpoints = {
  dashboard: "/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc",
  create: "/data/ideas",
  getIdea: "/data/ideas/",
  deleteIdea: "/data/ideas/",
};

export function getAllIdeas() {
  return get(endpoints.dashboard);
}
export function createIdea(title, description, img) {
  return post(endpoints.create, { title, description, img });
}
export function getIdeaById(id) {
  const ideaUrl = `${endpoints.getIdea}${id}`;
  return get(ideaUrl);
}
export function deleteIdeaById(id) {
  const ideaUrl = `${endpoints.deleteIdea}${id}`;
  return del(ideaUrl);
}

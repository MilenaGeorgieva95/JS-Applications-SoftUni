import { get, post, put, del } from "./api.js";

const endpoints = {
  allOffers: "/data/offers?sortBy=_createdOn%20desc",
  offerById: "/data/offers/",
  createOffer: '/data/offers',
  editOffer: '/data/offers/',
  deleteOffer: '/data/offers/',
  addApplication: '/data/applications'
};

export function getAllOffers() {
  return get(endpoints.allOffers);
}
export function getOfferById(id) {
  return get(`${endpoints.offerById}${id}`);
}
export function createOffer(data) {
  return post(endpoints.createOffer, data);
}
export function editOffer(id, data) {
  return put(`${endpoints.editOffer}${id}`, data);
}
export function delteOffer(id) {
  return del(`${endpoints.deleteOffer}${id}`);
}
export function addApplication(offerId) {
  return post(endpoints.addApplication, { offerId });
}
export function getAllApplications(offerId) {
  return get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`);
}
export function getAllApplicationsByUser(userId, offerId) {
  return get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}


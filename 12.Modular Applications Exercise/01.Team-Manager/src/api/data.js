import { get, post, put, del } from "./api.js";

const endpoints = {
  allTeams: "/data/teams",
  allMembers: "/data/members?where=status%3D%22member%22",
  createTeam: '/data/teams',
  getTeamById: '/data/teams/',
  editTeamById: '/data/teams/'
};

export function getAllTeams() {
  return get(endpoints.allTeams);
}
export function createTeam(data) {
  return post(endpoints.createTeam, data);
}
export function getAllMembers() {
  return get(endpoints.allMembers);
}
export function getAllMembersInTeam(teamId) {
  return get(`/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`)
}
export function getTeamById(id) {
  return get(`${endpoints.getTeamById}${id}`
  )
}
export function editTeamById(teamId, data) {
  return put(`${endpoints.editTeamById}${teamId}`, data)
}
export function getMemberById(id) {
  return get(`/data/members/${id}`)
}
export function getAllJoinedTeams(userId) {
  return get(`/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`)
}
export function joinTeam(teamId) {
  return post('/data/members', { teamId })
}
export function cancelRemoveMember(memberId) {
  return del(`/data/members/${memberId}`)
}
export function approveMember(memberId) {
  return put(`/data/members/${memberId}`, { status: 'member' })
}

export function removeMember(memberId) {
  return del(`/data/members/${memberId}`)
}

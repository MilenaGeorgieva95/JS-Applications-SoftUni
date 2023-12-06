import { browseTemplate } from '../../templates/browse.js'
import { getAllMembers, getAllTeams } from '../api/data.js'
import { getUserData } from './utils.js'

export async function browsePage(ctx) {
    const user = getUserData()
    const allTeamsPr = getAllTeams();
    const allMembersPr = getAllMembers();
    const [allTeams, allMembers] = await Promise.all([allTeamsPr, allMembersPr])

    let memCountByTeamId = {}
    for (let member of allMembers) {
        if (!memCountByTeamId.hasOwnProperty(member.teamId)) {
            memCountByTeamId[member.teamId] = 1
        } else {
            memCountByTeamId[member.teamId]++
        }
    }
    for (let team of allTeams) {
        if (memCountByTeamId[team._id]) {
            team.membersCount = memCountByTeamId[team._id]
        } else {
            team.membersCount = 1
        }

    }
    ctx.render(browseTemplate(user, allTeams))
}
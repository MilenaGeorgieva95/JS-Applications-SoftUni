import { getAllMembersInTeam, getTeamById } from "../api/data.js";
import { getUserData } from "./utils.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

const detailsTemplate = (team, user, ownerDetails, members, pending, status, membershipId) => html`
<section id="team-home">
                <article class="layout">
                    <img src=${team.logoUrl} class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${team.name}</h2>
                        <p>${team.description}</p>
                        <span class="details">${ownerDetails.members} Members</span>
                        <div>
                            ${user.isOwner ? html`<a href="/browse/${team._id}/edit" class="action">Edit team</a>` : ''}
                            ${!status && !user.isOwner ? html`<a href="/browse/${team._id}/join" class="action">Join team</a>` : ''}
                            ${status == 'member' ? html`<a href="/browse/${team._id}/leave/${membershipId}" class="action invert">Leave team</a>` : ''}
                            ${status == 'pending' ? html`Membership pending. <a href="/browse/${team._id}/cancel/${membershipId}">Cancel request</a>` : ''}
                        </div>
                    </div>
                    <div class="pad-large">
                        <h3>Members</h3>
                        <ul class="tm-members">
                            <li>${ownerDetails.user.username}</li>
                            ${members.map((el) => createMemLi(el, team, user))}
                        </ul>
                    </div>
                    ${user.isOwner ? html`
                    <div class="pad-large">
                        <h3>Membership Requests</h3>
                        <ul class="tm-members">
                            ${pending.map((member) => createMemRequestsLi(member, team))}
                        </ul>
                    </div>`: ''}
                </article>
            </section>`

export async function detailsPage(ctx) {
    const userData = getUserData();
    const user = userData ? userData : {}

    const teamId = ctx.params.id;
    const team = await getTeamById(teamId);
    const teamOwnerId = team._ownerId;

    const allMembers = await getAllMembersInTeam(teamId);
    const ownerDetails = allMembers.shift()


    const members = allMembers.filter(member => member.status == 'member');
    const pending = allMembers.filter(member => member.status == 'pending')
    ownerDetails.members = members.length + 1


    if (user._id == teamOwnerId) {
        user.isOwner = true;
    }
    let status = ''
    let membershipId = ''
    if (user._id && user._id !== teamOwnerId) {
        const memberData = allMembers.filter(member => member.user._id == user._id)
        if (memberData) {
            status = memberData[0] ? memberData[0].status : ''
            membershipId = memberData[0] ? memberData[0]._id : ''
        }
    }
    ctx.render(detailsTemplate(team, user, ownerDetails, members, pending, status, membershipId))


}

function createMemLi(member, team, user) {
    return html`<li>${member.user.username}
${user && user.isOwner ? html`<a href="/browse/${team._id}/remove/${member._id}" class="tm-control action">Remove from team</a>` : ''}</li>`


}
function createMemRequestsLi(member, team) {
    return html`
<li>${member.user.username}
 <a href="/browse/${team._id}/approve/${member._id}" class="tm-control action">Approve</a>
 <a href="/browse/${team._id}/decline/${member._id}" class="tm-control action">Decline</a>
</li>`
}
import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAllJoinedTeams, getAllMembersInTeam } from '../api/data.js';
import { getUserData } from './utils.js';

const myTeamsTemplate = (isMember, allMyTeams) => html`
<section id="my-teams">

<article class="pad-med">
    <h1>My Teams</h1>
</article>

<article class="layout narrow">
<div class="pad-med">
${!isMember ? html`
        <p>You are not a member of any team yet.</p>
        <p><a href="/browse">Browse all teams</a> to join one, or use the button bellow to cerate your own
            team.</p>`: ''}
</div>
    <div class=""><a href="/create" class="action cta">Create Team</a></div>
</article>
${isMember ? allMyTeams.map(createTeamCard) : ''}
</section>`

function createTeamCard(team) {
    return html`
    <article class="layout">
        <img src=${team.logoUrl} class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">${team.members} Members</span>
            <div><a href="/browse/${team.teamId}" class="action">See details</a></div>
        </div>
    </article>`
}

export async function myTeamsPage(ctx) {
    let isMember = false;
    const user = getUserData();
    const userId = user._id
    const allMyTeams = await getAllJoinedTeams(userId);
    if (allMyTeams.length > 0) {
        isMember = true
    }
    for (let team of allMyTeams) {
        const members = await getAllMembersInTeam(team.teamId);
        team.members = members.length
    }
    ctx.render(myTeamsTemplate(isMember, allMyTeams))
}


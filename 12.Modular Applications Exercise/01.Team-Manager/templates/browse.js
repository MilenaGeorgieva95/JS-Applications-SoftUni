import { html } from '../node_modules/lit-html/lit-html.js'

export const browseTemplate = (user, allTeams) => html`
<section id="browse">

<article class="pad-med">
    <h1>Team Browser</h1>
</article>
${user ? html`
<article class="layout narrow">
    <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
</article>`: ''}
${allTeams.map(cardTemplate)}

</section>`

const cardTemplate = (team) => html`
<article class="layout">
    <img src=${team.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${team.membersCount} Members</span>
        <div><a href="/browse/${team._id}" class="action">See details</a></div>
    </div>
</article>`
import { html } from '../../node_modules/lit-html/lit-html.js'
import { editTeamById, getTeamById } from '../api/data.js';
import { createSubmitHandler } from './utils.js';

const editTemplate = (team, onSave, error) => html`
<section id="edit">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Edit Team</h1>
                    </header>
                    <form @submit=${onSave} id="edit-form" class="main-form pad-large">
                        ${error ? html`<div class="error">${error}</div>` : ''}
                        <label>Team name: <input type="text" name="name" .value=${team.name}></label>
                        <label>Logo URL: <input type="text" name="logoUrl" .value=${team.logoUrl}></label>
                        <label>Description: <textarea name="description" .value=${team.description}></textarea></label>
                        <input class="action cta" type="submit" value="Save Changes">
                    </form>
                </article>
            </section>`

export async function editPage(ctx) {
    const teamId = ctx.params.teamId;
    const team = await getTeamById(teamId);
    ctx.render(editTemplate(team, createSubmitHandler(onSave)))

    async function onSave({ name, logoUrl, description }, form) {
        let error = ''
        if (name.length < 4 || !logoUrl || description.length < 10) {
            error = 'Invalid fields!';
            let newTeam = { name, logoUrl, description }
            ctx.render(editTemplate(newTeam, createSubmitHandler(onSave), error))
        } else {
            form.reset();
            const teamEdit = await editTeamById(teamId, { name, logoUrl, description });
            ctx.page.redirect(`/browse/${teamId}`)
        }
    }
}
import { html } from '../node_modules/lit-html/lit-html.js'

export const createTemplate = (onSubmit, error) => html`
           <section id="create">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>New Team</h1>
                    </header>
                    <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
                        ${error ? html`<div class="error">${error}</div>` : ''}
                        <label>Team name: <input type="text" name="name"></label>
                        <label>Logo URL: <input type="text" name="logoUrl"></label>
                        <label>Description: <textarea name="description"></textarea></label>
                        <input class="action cta" type="submit" value="Create Team">
                    </form>
                </article>
            </section>`
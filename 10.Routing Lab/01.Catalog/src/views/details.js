import { html } from '../../node_modules/lit-html/lit-html.js'

const detailsTemplate = (id) => html`
<h1>Details Page</h1>
<p>Product details: ${id}</p>`

export function detailsPage(ctx) {
    const id = ctx.params.id;
    ctx.render(detailsTemplate(id))
}
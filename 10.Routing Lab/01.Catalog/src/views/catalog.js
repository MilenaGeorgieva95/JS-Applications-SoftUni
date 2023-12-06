import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAllIdeas } from '../api/data.js'

const catalogTemplate = (list) => html`
<h1>Catalog Page</h1>
<ul>${list.map(productTemplate)}</ul>`

const productTemplate = (idea) => html`
<li><a href="/catalog/${idea._id}">${idea.title}</a></li>`

export async function catalogPage(ctx) {
  const request = await getAllIdeas()
  ctx.render(catalogTemplate(request))
}

import { html } from '../../node_modules/lit-html/lit-html.js'

const aboutTemplate = () => html`
<h1>About Page</h1>
<p>Contact: +1-555-7551</p>`

export function aboutPage(ctx) {
  ctx.render(aboutTemplate())
}


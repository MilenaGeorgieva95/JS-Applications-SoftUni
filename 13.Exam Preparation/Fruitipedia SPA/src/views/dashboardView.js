import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAllItems } from '../api/data.js'

const dashboardTemplate = (data) => html`
        <h2>Fruits</h2>
        <section id="dashboard">
            ${data.length === 0 ?
        html`<h2>No fruit info yet.</h2>`
        : data.map(fruitCard)}
          
        </section>`

const fruitCard = (data) => html`
</div><div class="fruit">
            <img src=${data.imageUrl} alt="example1" />
            <h3 class="title">${data.name}</h3>
            <p class="description">${data.description}</p>
            <a class="details-btn" href="/dashboard/${data._id}">More Info</a>
          </div>`

export async function dashboardPage(ctx) {
    const fruits = await getAllItems()

    ctx.render(dashboardTemplate(fruits))
}
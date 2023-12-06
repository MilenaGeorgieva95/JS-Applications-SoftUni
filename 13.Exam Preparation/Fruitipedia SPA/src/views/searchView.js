import { createSubmitHandler, getUserData } from './utils.js'
import { html } from '../../node_modules/lit-html/lit-html.js'
import { searchItemsByQuery } from '../api/data.js'

const searchTemplate = (onSubmit, data) => html`
<section id="search">

    <div class="form">
        <h2>Search</h2>
        <form @submit=${onSubmit} class="search-form">
          <input type="text" name="search" id="search-input"/>
          <button class="button-list">Search</button>
        </form>
    </div>

    <h4>Results:</h4>
    ${data && data.length === 0 ? html`<p class="no-result">No result.</p>`
        : ''}
    <div class="search-result">
       ${data && data.length > 0 ? data.map(fruitTemplate) : ''}
    </div>
    
</section>`

const fruitTemplate = (data) => html`
        <div class="fruit">
          <img src=${data.imageUrl} alt="example1" />
          <h3 class="title">${data.name}</h3>
          <p class="description">${data.description}</p>
          <a class="details-btn" href="/dashboard/${data._id}">More Info</a>
        <div>`

export async function searchPage(ctx) {
    const user = getUserData()
    ctx.render(searchTemplate(createSubmitHandler(onSearch)))

    async function onSearch({ search }, form) {
        if (!search) {
            return alert('Search field must be filled!')
        }
        const matches = await searchItemsByQuery(search);
        ctx.render(searchTemplate(createSubmitHandler(onSearch), matches));
        form.reset()
    }
}
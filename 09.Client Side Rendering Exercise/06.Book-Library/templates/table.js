import { html, render } from '../node_modules/lit-html/lit-html.js'

export const createTable = (ctx) => html`
<button id="loadBooks" @click=${ctx.loadBooks}>LOAD ALL BOOKS</button>
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
<div id="form-section"></div>`




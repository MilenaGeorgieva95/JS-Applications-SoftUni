import { html } from '../node_modules/lit-html/lit-html.js'

export function createBookTr(book, ctx) {
    return html`
<tr>
    <td>${book[1].title}</td>
    <td>${book[1].author}</td>
    <td>
        <button @click=${ctx.onEdit.bind(null, book[0])}>Edit</button>
        <button @click=${ctx.onDelete.bind(null, book[0])}>Delete</button>
    </td>
</tr>`
}
import { html } from '../node_modules/lit-html/lit-html.js'

export const editForm = (data, callbackSubmit) => html`
<form id="edit-form" @submit=${callbackSubmit}>
<input type="hidden" name="id">
<h3>Edit book</h3>
<label>TITLE</label>
<input type="text" name="title" .value=${data.title} placeholder="Title...">
<label>AUTHOR</label>
<input type="text" name="author" .value=${data.author} placeholder="Author...">
<input type="submit" value="Save">
</form>`
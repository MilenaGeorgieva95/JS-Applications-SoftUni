import { html } from '../../node_modules/lit-html/lit-html.js'

export const createOption = (data) => html`
<option value=${data._id}>${data.text}</option>`
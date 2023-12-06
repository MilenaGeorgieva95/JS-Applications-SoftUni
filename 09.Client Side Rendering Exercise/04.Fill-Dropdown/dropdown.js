import { createItem, getAllItems } from "./src/api/data.js";
import { createOption } from "./src/templates/options.js";
import { render, html } from './node_modules/lit-html/lit-html.js'

onLoad()

async function onLoad() {
    const select = document.querySelector('#menu')
    const items = await getAllItems();
    const selectHtml = Object.values(items).map(createOption);
    render(selectHtml, select)
}

const form = document.querySelector('form')
form.addEventListener('submit', addItem)

async function addItem(e) {
    e.preventDefault();
    const text = form.querySelector('#itemText').value;
    if (!text) {
        alert('Empty field!')
        return
    }
    e.target.reset()
    const newI = await createItem(text);
    onLoad()
}
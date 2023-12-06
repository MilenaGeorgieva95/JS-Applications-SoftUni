import { createSubmitHandler } from './utils.js'
import { html } from '../../node_modules/lit-html/lit-html.js'
import { editItem, getItemById } from '../api/data.js'

const editTemplate = (onSubmit, data) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Fruit</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="name" id="name" .value=${data.name} placeholder="Fruit Name"/>
            <input type="text" name="imageUrl" id="Fruit-image" .value=${data.imageUrl} placeholder="Fruit Image URL"/>
            <textarea id="fruit-description" name="description" .value=${data.description} placeholder="Description" rows="10" cols="50"></textarea>
            <textarea id="fruit-nutrition" name="nutrition" .value=${data.nutrition} placeholder="Nutrition" rows="10" cols="50"></textarea>
            <button type="submit">post</button>
        </form>
    </div>
</section>`

export async function editPage(ctx) {
    const productId = ctx.params.id
    const productData = await getItemById(productId);
    ctx.render(editTemplate(createSubmitHandler(onEdit), productData))

    async function onEdit({ name, imageUrl, description, nutrition }) {
        if (!name || !imageUrl || !description || !nutrition) {
            return alert('All fields must be filled!')
        }
        await editItem(productId, { name, imageUrl, description, nutrition })
        ctx.page.redirect(`/dashboard/${productId}`)
    }
}
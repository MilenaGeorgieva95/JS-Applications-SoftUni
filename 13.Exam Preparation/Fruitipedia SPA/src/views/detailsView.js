import { getUserData } from './utils.js'
import { html } from '../../node_modules/lit-html/lit-html.js'
import { deleteItemById, getItemById } from '../api/data.js'

const detailsTemplate = (data, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${data.imageUrl} alt="example1" />
        <p id="details-title">${data.name}</p>

        <div id="info-wrapper">
            <div id="details-description">
                <p>${data.description}</p>
                <p id="nutrition">Nutrition</p>
                <p id = "details-nutrition">${data.nutrition}</p>
            </div>
               <!--Edit and Delete are only for creator-->
          ${data.owner ? html`
          <div id="action-buttons">
            <a href="/dashboard/${data._id}/edit" id="edit-btn">Edit</a>
            <a @click=${(e) => onDelete(e, data._id)} href="javascript:void(0)" id="delete-btn">Delete</a>
          </div>`: ''}
        </div>

    </div>
</section>`

export async function detailsPage(ctx) {
    const fruitId = ctx.params.id
    const fruitData = await getItemById(fruitId);
    const ownerId = fruitData._ownerId;
    const user = getUserData()
    if (user && user._id === ownerId) {
        fruitData.owner = true;
    }
    ctx.render(detailsTemplate(fruitData, onDelete))

    async function onDelete(e, productId) {
        e.preventDefault();
        const choice = confirm('Are you sure you want to delte this fruit?');
        if (choice) {
            await deleteItemById(productId);
            ctx.page.redirect('/dashboard')
        }
    }
}
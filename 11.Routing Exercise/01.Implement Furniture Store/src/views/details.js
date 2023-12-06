import { html } from '../../node_modules/lit-html/lit-html.js'
import { deleteItemById, getItemById } from '../api/data.js'
import { getUserData } from './utils.js'

const detailsTemplate = (item, isOwner, onDelete) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src=${item.img}/>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${item.make}</span></p>
                <p>Model: <span>${item.model}</span></p>
                <p>Year: <span>${item.year}</span></p>
                <p>Description: <span>${item.description}</span></p>
                <p>Price: <span>${item.price}</span></p>
                <p>Material: <span>${item.material}</span></p>
                ${isOwner ? html`<div>
                    <a href=${'/dashboard/' + item._id + '/edit'} class="btn btn-info">Edit</a>
                    <a @click=${onDelete} href=”javascript:void(0)” class="btn btn-red">Delete</a>
                </div>`: null}
                
            </div>
        </div>`
let context;
export async function detailsPage(ctx) {
    context = ctx;
    const id = ctx.params.id
    const item = await getItemById(id);
    const ownerId = item._ownerId
    const user = getUserData();
    const userId = user._id;
    let isOwner = false;
    if (userId != null && userId == ownerId) {
        isOwner = true;
    }
    console.log(item.img)
    ctx.render(detailsTemplate(item, isOwner, (e) => { onDelete(e, id) }))
}

async function onDelete(e, id) {
    e.preventDefault()
    confirm('Are you shure you want to delete this item?');
    if (confirm) {
        await deleteItemById(id);
        context.page.redirect('/dashboard')
    }
} 
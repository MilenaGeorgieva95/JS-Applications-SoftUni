import { html } from '../../node_modules/lit-html/lit-html.js'
import { getMyItems } from '../api/data.js';
import { getUserData } from './utils.js';

const myFurnitureTemplate = (data) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
        </div>
        ${data.map(createCard)}
        
 </div>`

export async function furniturePage(ctx) {
    const id = ctx.params.id;
    const user = getUserData();
    console.log(user)
    const userId = user._id
    console.log(userId)
    const data = await getMyItems(userId);
    console.log(data)
    if (data.length > 0) {
        ctx.render(myFurnitureTemplate(data))
    } else {
        ctx.render(null)
    }

}

function createCard(el) {
    return html`
    <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src=${el.img} />
                            <p>${el.description}</p>
                            <footer>
                                <p>Price: <span>${el.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/dashboard/${el._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>
        </div>`
}
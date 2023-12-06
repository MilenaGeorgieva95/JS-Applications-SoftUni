import { html } from '../../node_modules/lit-html/lit-html.js'
import { createItem } from '../api/data.js';
import { createSubmitHandler } from './utils.js'

const createTemplate = (onSubmit, data) => {
    return html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class=${!data || data.make.length >= 4 ? `form-control valid is-valid` : `form-control valid is-invalid`} id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class=${!data || data.model.length >= 4 ? `form-control valid is-valid` : `form-control valid is-invalid`} id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class=${!data || (Number(data.year) > 1950 && Number(data.year) < 2050) ? `form-control valid is-valid` : `form-control valid is-invalid`} id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class=${!data || data.description.length >= 10 ? `form-control is-valid` : `form-control is-invalid`} id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class=${!data || Number(data.price) > 0 ? `form-control is-valid` : `form-control is-invalid`} id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class=${!data || data.img != '' ? `form-control is-valid` : `form-control is-invalid`} id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>`}
let context;
export function createPage(ctx) {
    context = ctx
    ctx.render(createTemplate(createSubmitHandler(onCreate)))
}

async function onCreate(data, form) {
    if (data.make.length < 4 || data.model.length < 4 || Number(data.year) < 1950 || Number(data.year) > 2050 || data.description.length < 10 || Number(data.price) <= 0 || data.img == '') {
        context.render(createTemplate(createSubmitHandler(onCreate), data))
    } else {
        await createItem(data);
        context.page.redirect('/')
    }


}


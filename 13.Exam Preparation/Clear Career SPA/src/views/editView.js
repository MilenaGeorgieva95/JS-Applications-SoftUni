import { html } from '../../node_modules/lit-html/lit-html.js'
import { editOffer, getOfferById } from '../api/data.js';
import { createSubmitHandler } from './utils.js';

const editTemplate = (onSubmit, data) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="title" id="job-title" .value=${data.title} placeholder="Title"/>
            <input type="text" name="imageUrl" id="job-logo" .value=${data.imageUrl} placeholder="Company logo url"/>
            <input type="text" name="category" id="job-category" .value=${data.category} placeholder="Category"/>
            <textarea id="job-description" name="description" .value=${data.description} placeholder="Description" rows="4" cols="50"></textarea>
            <textarea id="job-requirements" name="requirements" .value=${data.requirements} placeholder="Requirements" rows="4" cols="50"></textarea>
            <input type="text" name="salary" id="job-salary" .value=${data.salary} placeholder="Salary"/>
            <button type="submit">post</button>
        </form>
    </div>
</section>`

export async function editPage(ctx) {
    const offerId = ctx.params.id;
    const offerData = await getOfferById(offerId)
    ctx.render(editTemplate(createSubmitHandler(onEdit), offerData));

    async function onEdit({ title, imageUrl, category, description, requirements, salary }) {
        if (!title || !imageUrl || !category || !description || !requirements || !salary) {
            return alert('Missing fields!');
        }
        const newOffer = await editOffer(offerId, { title, imageUrl, category, description, requirements, salary });
        ctx.page.redirect('/dashboard')
    }
}
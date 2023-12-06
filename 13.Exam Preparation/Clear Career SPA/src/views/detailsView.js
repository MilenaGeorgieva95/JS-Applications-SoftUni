import { html } from '../../node_modules/lit-html/lit-html.js'
import { delteOffer, getAllApplications, getAllApplicationsByUser, getOfferById } from '../api/data.js';
import { getUserData } from './utils.js'
import { addApplication } from "../api/data.js"

const detailsTemplate = (data, onDelete, onApply) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${data.imageUrl} alt="example1" />
        <p id="details-title">${data.title}</p>
        <p id="details-category">Category: <span id="categories">IT, Developer, WEB</span></p>
        <p id="details-salary">Salary: <span id="salary-number">${data.salary}</span></p>
        <div id="info-wrapper">
            <div id="details-description">
            <h4>Description</h4>
            <span>${data.description}</span>
        </div>
        <div id="details-requirements">
            <h4>Requirements</h4>
            <span>${data.requirements}</span>
        </div>
        </div>
        <p>Applications: <strong id="applications">${data.totalApplications}</strong></p>

            <div id="action-buttons">
              ${data.controls === 'owner' ? html`
              <a href="/dashboard/${data._id}/edit" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" @click=${() => onDelete(data._id)} id="delete-btn">Delete</a>` : ''}
              ${data.controls === 'user' && !data.hasApplied ? html`<a href="javascript:void(0)" @click=${() => onApply(data._id)} id="apply-btn">Apply</a>` : ''}
        </div>
    </div>
</section>`

export async function detailsPage(ctx) {
    const user = getUserData();
    const offerId = ctx.params.id
    const promises = []
    promises.push(getOfferById(offerId))
    promises.push(getAllApplications(offerId));
    if (user) {
        promises.push(getAllApplicationsByUser(user._id, offerId))
    }

    const [offerData, totalApplications, hasApplied] = await Promise.all(promises)
    const offerOwner = offerData._ownerId
    offerData.totalApplications = totalApplications;

    offerData.controls = ''

    if (user && user._id === offerOwner) {
        offerData.controls = 'owner'
    }
    if (user && user._id !== offerOwner) {
        offerData.hasApplied = hasApplied;
        offerData.controls = 'user'
    }
    ctx.render(detailsTemplate(offerData, onDelete, onApply))

    async function onDelete(offerId) {
        await delteOffer(offerId);
        ctx.page.redirect('/dashboard')

    }
    async function onApply(offerId) {
        await addApplication(offerId);
        offerData.hasApplied = true;
        offerData.totalApplications++;
        ctx.render(detailsTemplate(offerData, onDelete))
    }
}


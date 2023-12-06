import { html, render } from "../node_modules/lit-html/lit-html.js";
import { contacts } from "./contacts.js";

const contactTemplate = (user) => html` <div class="contact card">
  <div>
    <i class="far fa-user-circle gravatar"></i>
  </div>
  <div class="info">
    <h2>Name: ${user.name}</h2>
    <button
      class="detailsBtn"
      @click=${() => {
        user.showDetails = !user.showDetails;
        update();
      }}
    >
      Details
    </button>
    ${user.showDetails
      ? html`<div class="details" id=${user.id}>
          <p>Phone number: ${user.phoneNumber}</p>
          <p>Email: ${user.email}</p>
        </div>`
      : null}
  </div>
</div>`;

const root = document.querySelector("#contacts");
function update() {
  // render(contacts.map(contactTemplate),root)
  render(
    repeat(contacts, (c) => c.id, contactTemplate),
    root
  );
}

update();

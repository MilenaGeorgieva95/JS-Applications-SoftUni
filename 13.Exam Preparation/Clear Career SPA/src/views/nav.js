import { html } from '../../node_modules/lit-html/lit-html.js'
import { logoutUser } from '../api/auth.js'
import page from '../../node_modules/page/page.mjs'

export const navTemplate = (isUser) => html`
<header>
  <a id="logo" href="/"><img id="logo-img" src="./images/logo.jpg" alt=""/></a>
  <nav>
      <div>
        <a href="/dashboard">Dashboard</a>
      </div>
      ${isUser ? userNav : guestNav}

  </nav>
</header>

<main>
</main>`

const userNav = html`
<div class="user">
      <a href="/create">Create Offer</a>
      <a @click=${logoutSubmit} href="javascript:void(0)">Logout</a>
</div>`

const guestNav = html`
<div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
</div>`

function logoutSubmit(e) {
  e.preventDefault();
  logoutUser();
  page.redirect('/dashboard')
}

import { html } from '../node_modules/lit-html/lit-html.js'
import { logoutUser } from '../src/api/auth.js'
import page from '../node_modules/page/page.mjs'

export const navTemplate = (isUser) => html`
        <header id="titlebar" class="layout">
            <a href="/" class="site-logo">Team Manager</a>
            <nav>
                <a href="/browse" class="action">Browse Teams</a>
                ${isUser ? userNav : guestNav}
            </nav>
        </header>
        <main>
        </main>
        <footer id="footer">
            SoftUni &copy; 2014-2021
        </footer>`

const userNav = html`
<a href="/my-teams" class="action">My Teams</a>
<a @click=${logoutSubmit} href=javascript:void(0) class="action">Logout</a>`

const guestNav = html`
<a href="/login" class="action">Login</a>
<a href="/register" class="action">Register</a>`

function logoutSubmit(e) {
    e.preventDefault();
    logoutUser();
    page.redirect('/')
}

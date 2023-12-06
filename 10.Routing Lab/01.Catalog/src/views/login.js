import { loginUser } from "../api/auth.js";
import { html } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from "./utils.js";

const loginTemplate = (onSubmit) => html`
<h1>Login Page</h1>
<form @submit=${onSubmit}>
  <label>Email: <input type="text" name="email"></input></label>
  <label>Password: <input type="password" name="password"></input></label>
  <button>Sign In</button>
</form>
<p>Don't have an account?<a href="/register">SIgn up now!</a></p>`

export function loginPage(ctx) {
  ctx.render(loginTemplate(createSubmitHandler(onLogin)))

  async function onLogin({ email, password }) {
    await loginUser(email, password);
    ctx.updateNav()
    ctx.page.redirect('/');
  }
}

import { registerUser } from "../api/auth.js";
import { html } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from "./utils.js";

const registerTemplate = (onSubmit) => html`
<h1>Register Page</h1>
<form @submit=${onSubmit}>
  <label>Email: <input type="text" name="email"></input></label>
  <label>Password: <input type="password" name="password"></input></label>
  <label>Repeat: <input type="password" name="repass"></input></label>
  <button>Register</button>
</form>
<p>Already have an account?<a href="/login">Sign in now!</a></p>`

export function registerPage(ctx) {
  ctx.render(registerTemplate(createSubmitHandler(onRegister)))

  async function onRegister({ email, password, repass }) {
    if (!email || !password) {
      return alert('All fields are required!');
    }
    if (password != repass) {
      return alert("Passwords don't match!")
    }
    await registerUser(email, password, repass);
    ctx.updateNav()
    ctx.page.redirect('/');
  }
}

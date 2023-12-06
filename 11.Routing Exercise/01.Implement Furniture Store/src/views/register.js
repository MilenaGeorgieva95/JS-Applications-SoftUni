import { registerUser } from "../api/auth.js";
import { html } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from "./utils.js";

const registerTemplate = (onSubmit) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>`

export function registerPage(ctx) {
  ctx.render(registerTemplate(createSubmitHandler(onRegister)))

  async function onRegister({ email, password, rePass }) {
    if (!email || !password) {
      return alert('All fields are required!');
    }
    if (password != rePass) {
      return alert("Passwords don't match!")
    }
    await registerUser(email, password, rePass);
    ctx.updateNav()
    ctx.page.redirect('/');
  }
}

import { loginUser } from "../api/auth.js";
import { html } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from "./utils.js";

const loginTemplate = (onSubmit) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
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
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>`

export function loginPage(ctx) {
  ctx.render(loginTemplate(createSubmitHandler(onLogin)))

  async function onLogin({ email, password }) {
    await loginUser(email, password);
    ctx.updateNav()
    ctx.page.redirect('/');
  }
}

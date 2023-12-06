import { registerUser } from "../api/auth.js";
import { createSubmitHandler } from "./utils.js";
import { registerTemplate } from "../../templates/register.js";

export function registerPage(ctx) {
  ctx.render(registerTemplate(createSubmitHandler(onRegister)))

  async function onRegister({ email, username, password, repass }) {
    let error = ''
    if (!email || !username || !password) {
      error = 'All fields are required!';
    }
    if (password != repass) {
      error = "Passwords don't match!"
    }
    if (error) {
      ctx.render(registerTemplate(createSubmitHandler(onRegister), error));
      return
    }
    await registerUser(email, username, password, repass);
    ctx.page.redirect('/');
  }
}

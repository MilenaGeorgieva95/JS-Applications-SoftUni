import { loginUser } from "../api/auth.js";
import { createSubmitHandler } from "./utils.js";
import { loginTemplate } from "../../templates/login.js";

export function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)))

    async function onLogin({ email, password }) {
        let error = ''
        if (!email || !password) {
            error = 'All fields are required!';
        }
        if (error) {
            ctx.render(loginTemplate(createSubmitHandler(onLogin), error));
            return
        }
        await loginUser(email, password);
        ctx.page.redirect('/');
    }
}

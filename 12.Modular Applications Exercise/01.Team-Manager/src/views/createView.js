import { createTemplate } from "../../templates/create.js"
import { join } from "../api/actions.js";
import { createTeam, joinTeam } from "../api/data.js";
import { createSubmitHandler } from "./utils.js"

export function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(onCreate)))

    async function onCreate({ name, logoUrl, description }, form) {
        let error = false;
        if (name.length < 4 || !logoUrl || description.length < 10) {
            error = true;
            ctx.render(createTemplate(createSubmitHandler(onCreate), error))
        } else {
            form.reset();
            const newTeam = await createTeam({ name, logoUrl, description });
            const teamId = newTeam._id
            const joinedNewteam = await joinTeam(teamId)
            ctx.page.redirect(`/browse/${teamId}`)
        }
    }
}
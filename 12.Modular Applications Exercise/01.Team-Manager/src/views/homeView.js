
import { homeTemplate } from '../../templates/home.js'
import { getUserData } from './utils.js'


export async function homePage(ctx) {
    const user = getUserData()
    ctx.render(homeTemplate(user))
}
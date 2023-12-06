import { render } from '../../node_modules/lit-html/lit-html.js'
const main = document.querySelector('main')

export function addRenderer(ctx, next) {
    ctx.show = (html) => main.innerHTML = html
    ctx.render = renderView;
    ctx.main = main
    next()
}

function renderView(content) {
    render(content, main)
}
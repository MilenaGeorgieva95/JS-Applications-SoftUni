import { render } from '../../node_modules/lit-html/lit-html.js'
const container = document.querySelector('div.container')

export function addRenderer(ctx, next) {
    ctx.show = (html) => container.innerHTML = html
    ctx.render = renderView;
    ctx.container = container
    next()
}

function renderView(content) {
    render(content, container)
}
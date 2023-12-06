const homeSec = document.querySelector("#home");

export function showHome(ctx) {
  ctx.render(homeSec);
  ctx.updateNav();
}

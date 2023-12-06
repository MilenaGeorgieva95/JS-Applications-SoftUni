import { getAllIdeas, getIdeaById } from "../api/data.js";

const dashboardSec = document.querySelector("#dashboard-holder");
dashboardSec.addEventListener('click',onDetails)

let context=null;

export async function showDash(ctx) {
  context=ctx;
  context.render(dashboardSec);
  context.updateNav();

  try {
    const ideas = await getAllIdeas();
    if (ideas.length === 0) {
      dashboardSec.innerHTML = "<h1>No ideas yet! Be the first one :)</h1>";
      return;
    }
    const ideasArr = Array.from(ideas);
    let htmlIdeas = "";
    for (let idea of ideasArr) {
      const template = `
      <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
        <div class="card-body">
          <p class="card-text">${idea.title}</p>
        </div>
        <img class="card-image" src="${idea.img}" alt="Card image cap">
        <a class="btn" href="/${idea._id}" display="none">Details</a>
      </div>
      `;
      htmlIdeas += template;
    }
    dashboardSec.innerHTML = htmlIdeas;
  } catch (error) {}
}

async function onDetails(e){
  e.preventDefault()
  if(e.target.tagName!=='A'){
    return
  }

const ideaUrl=new URL(e.target.href).pathname;
context.updateNav()
context.goTo('/details',ideaUrl)

}
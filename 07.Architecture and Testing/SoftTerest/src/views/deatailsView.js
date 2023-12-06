import { deleteIdeaById, getIdeaById } from "../api/data.js";
const detailsSec = document.querySelector("#details");

let context=null;

export async function showDetails(ctx, ideaUrl) {
  context=ctx;
  context.render(detailsSec);
  context.updateNav();

  try {
  const  details=await getIdeaById(ideaUrl);
    let isOwner=false;
    const userId=localStorage.getItem('userId')
    if(details._ownerId==userId&&userId!=null){
      isOwner=true;
    }
  const template=`
  <img class="det-img" src="${details.img}" />
  <div class="desc">
      <h2 class="display-5">${details.title}</h2>
      <p class="infoType">Description:</p>
      <p class="idea-description">${details.description}</p>
  </div>
  <div class="text-center">
  ${isOwner?`<a class="btn detb" href="${details._id}">Delete</a>`:''}
  </div>`
  detailsSec.innerHTML=template
  if(isOwner){
    const button=detailsSec.querySelector('a');
    button.addEventListener('click', (e)=>{
      e.preventDefault();
      onDelete(details._id)})
  }
  } catch (error) {
    console.log(error);
    return
  }
}

async function onDelete(ideaId){
try {
  await deleteIdeaById(ideaId);
  context.updateNav()
  context.goTo('/dashboard')
} catch (error) {
  console.log(error);
  return
}
 

}

import page from '../../node_modules/page/page.mjs'

import { addRenderer } from '../middlewares/render.js'
import { homePage } from "./home.js"
import { aboutPage } from "./about.js";
import { catalogPage } from "./catalog.js";
import { registerPage } from "./register.js";
import { loginPage } from "./login.js";
import { detailsPage } from './details.js';
import { logoutUser } from "../api/auth.js";
import { getUserData } from './utils.js';


page(addRenderer);
page((ctx, next) => { ctx.updateNav = updateNav; next() })
page('/index.html', '/');
page('/', homePage);
page('/catalog', catalogPage);
page('/about', aboutPage);
page('/catalog/:id', detailsPage);
page('/register', registerPage)
page('/login', loginPage)
page('/logout', async () => {
  logoutUser();
  updateNav()
  page.redirect('/')
})
page('*', '/');
page.start()

function updateNav() {
  const userData = getUserData();
  const guestA = Array.from(document.querySelectorAll('.guest'));
  const userA = Array.from(document.querySelectorAll('.user'));
  if (userData != null) {
    guestA.forEach(el => el.style.display = 'none');
    userA.forEach(el => el.style.display = 'inline')
  } else {
    guestA.forEach(el => el.style.display = 'inline');
    userA.forEach(el => el.style.display = 'none')
  }
}
updateNav()
//----------------------------------------------------
// page('/catalog/:category/:id', category)
// page('/catalog/:productId', productPage)

// function category(ctx) {
//   const categoryName = ctx.params.category
//   const id = ctx.params.id

//   main.innerHTML = `<h1>Catalog</h1>
//   <h2>${categoryName}</h2>
//   <p>Viewing product: ${id}</p>
//   <button>Back to catalog</button>`

//   document.querySelector('button').addEventListener('click', page.redirect('/catalog'))
// }

// function productPage(ctx) {
//   ctx.show('Product page ' + ctx.params.productId)
// }
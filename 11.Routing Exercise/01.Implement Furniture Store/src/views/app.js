import page from '../../node_modules/page/page.mjs'

import { addRenderer } from '../middlewares/render.js'
import { createPage } from './create.js';
import { dashboardPage } from "./dashboard.js";
import { furniturePage } from './furniture.js';
import { detailsPage } from './details.js';
import { registerPage } from "./register.js";
import { loginPage } from "./login.js";
import { logoutUser } from "../api/auth.js";
import { getUserData } from './utils.js';
import { editPage } from './edit.js';


page(addRenderer);
page((ctx, next) => { ctx.updateNav = updateNav; next() })
page('/index.html', '/');
page('/', '/dashboard');
page('/dashboard', dashboardPage);
page('/dashboard/:id', detailsPage);
page('/dashboard/:id/edit', editPage)
page('/create', createPage);
page('/furniture', furniturePage);
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
  const guest = document.querySelector('#guest');
  const user = document.querySelector('#user');
  if (userData != null) {
    guest.style.display = 'none'
    user.style.display = 'inline-block'
  } else {
    guest.style.display = 'inline-block'
    user.style.display = 'none'
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
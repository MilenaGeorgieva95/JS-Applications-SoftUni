import page from './node_modules/page/page.mjs'
import { html, render } from './node_modules/lit-html/lit-html.js'

import { addRenderer } from './src/middlewares/render.js'
import { homePage } from "./src/views/homeView.js";
import { registerPage } from "./src/views/registerView.js";
import { loginPage } from "./src/views/loginView.js";
import { createPage } from './src/views/createView.js';
import { editPage } from './src/views/editView.js';
import { browsePage } from './src/views/browseView.js';
import { myTeamsPage } from './src/views/myTeamsView.js';
import { detailsPage } from './src/views/detailsView.js';
import { join, leaveCancel, approve, remove } from './src/api/actions.js';

page(addRenderer);
page('/index.html', '/');
page('/', homePage);
page('/browse', browsePage);
page('/browse/:id', detailsPage)
page('/browse/:teamId/edit', editPage)
page('/browse/:teamId/join', join)
page('/browse/:teamId/leave/:memberId', leaveCancel)
page('/browse/:teamId/cancel/:memberId', leaveCancel)
page('/browse/:teamId/approve/:memberId', approve)
page('/browse/:teamId/remove/:memberId', remove)
page('/my-teams', myTeamsPage)
page('/register', registerPage)
page('/create', createPage)
page('/login', loginPage)
page('*', '/');
page.start()
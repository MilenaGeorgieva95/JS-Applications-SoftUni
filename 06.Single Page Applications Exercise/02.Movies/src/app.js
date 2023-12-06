import { showHomeView } from "./home.js";
import { navView } from "./nav.js";

const homeBtn = document.querySelector('a[class="navbar-brand text-light"]');
homeBtn.addEventListener("click", clickMoviesBtn);

function clickMoviesBtn(event) {
  event.preventDefault();
  showHomeView();
}

navView();

showHomeView();

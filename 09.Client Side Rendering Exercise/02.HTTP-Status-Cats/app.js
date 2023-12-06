import { html, render } from "./node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

const catGenerator = (cat) => {
  const temp = html` <li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap"/>
    <div class="info">
      <button class="showBtn" @click=${onClick}>Show status code
      </button>
      <div class="status" style="display: none" id="100">
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
          </div>
    </div>
  </li>`;
  return temp;
};

const catsTemplate = (data) => html` <ul>
  ${data.map(catGenerator)}
</ul>`;

const renderCats = (data) => {
  const allCatsSec = document.querySelector("#allCats");
  render(catsTemplate(data), allCatsSec);
};

renderCats(cats);

function onClick(e) {
  e.preventDefault()
  const oneCatSec = e.target.parentElement
  const detailsSec = oneCatSec.querySelector('.status').style.display;

  if (detailsSec === 'block') {
    oneCatSec.querySelector('.showBtn').textContent = 'Show status code'
    oneCatSec.querySelector('.status').style.display = 'none'
  } else {
    oneCatSec.querySelector('.showBtn').textContent = 'Hide status code'
    oneCatSec.querySelector('.status').style.display = 'block'
  }

}

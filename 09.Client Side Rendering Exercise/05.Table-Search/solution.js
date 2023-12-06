import { html, render } from "../node_modules/lit-html/lit-html.js";

const contentTemplate = (data, matchText) => html`
<table class="container">
   <thead>
      <tr>
         <th>Student name</th>
         <th>Student email</th>
         <th>Student course</th>
      </tr>
   </thead>
   <tbody>
      ${data.map(employee => html`

      <tr class = ${matchText && Object.values(employee).some(x => x.toLowerCase().includes(matchText.toLowerCase())) ? 'select' : ''}>
         <td>${employee.firstName} ${employee.lastName}</td>
         <td>${employee.email}</td>
         <td>${employee.course}</td>
      </tr>
      `)}
   </tbody>
   <tfoot>
      <tr>
         <td colspan="3">
            <input type="text" id="searchField" />
            <button type="button" id="searchBtn">Search</button>
         </td>
      </tr>
   </tfoot>
</table>
`;

const main = document.body;
main.addEventListener('click', onSearch);
update();

async function update(matchText = '', dates) {

   const data = await getRequest(dates);
   const result = contentTemplate(data, matchText);

   render(result, main);

}

function onSearch(event) {

   if (event.target.tagName == 'BUTTON') {

      event.preventDefault();

      const matchText = document.getElementById('searchField').value;
      update(matchText);

   }
}

async function getRequest() {

   const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await response.json();
   const values = Object.values(data);

   return values;
}
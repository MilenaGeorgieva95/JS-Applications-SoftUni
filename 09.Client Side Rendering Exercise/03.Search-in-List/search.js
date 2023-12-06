import { render, html } from './node_modules/lit-html/lit-html.js'
import { towns } from './towns.js'

console.log(towns);

const createLi = (town) => html`<li id=${town}>${town}</li>`

const createTown = (data) => html`
<ul>
   ${data.map(createLi)}
</ul>`

const renderTownComponents = (data) => {
   const townsSec = document.querySelector('#towns')
   return render(createTown(data), townsSec)
}

renderTownComponents(towns)

document.querySelector('button').addEventListener('click', search);

const searchTown = (towns, text) => {
   return towns.filter(town => {
      if (town.includes(text)) {
         const match = document.getElementById(`${town}`)
         match.classList.add('active')
         return town
      }
   })
}

function search() {
   const input = document.querySelector('input')
   const text = input.value
   input.value = ''
   const result = searchTown(towns, text)
   const matchesCountSec = document.querySelector('#result');
   matchesCountSec.textContent = `${result.length} matches found`
}



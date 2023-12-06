import {html,render} from '../node_modules/lit-html/lit-html.js'
import {data,products} from './data.js';

const greeting=(name)=>html`<h2>Hello, ${name}!</h2>`;
render(greeting('World'),document.querySelector('section'))


const userBlock=(user)=>html`
<article class="user-block" data-id="12345">
<span style="background-color: red">Username: ${user.name}</span>
<span>Phone: ${user.phone}</span>
</article>`;

let isOwner=true;
const productBlock=(product)=>html`
<li class"product">
<span>Label: ${product.label}</span>
<span>Price: $${product.price}</span>
<input type="number" .value=${product.price}>
<button @click=${()=>buyProduct(product)} ?disabled=${!isOwner}>Buy</button>
</li>`
/*
checkbox ?checked=${boolean}
.value for inputs, otherwise is set as attribute to the html element
@click for event listeners
nested html template:
html`${user.isLoggedIn?html`Welcome ${user.name}`:html`Please log in`}`;
stylesMap, classesMap, repeat, nothing
*/

const section=document.querySelector('section');
const list=document.querySelector('ul');
const header=document.querySelector('header')
const greetBtn=document.querySelector('button')

greetBtn.addEventListener('click',()=>{
    render(greeting('Peter'),header)
})
start();

async function start(){
    //data.map(user=>userBlock(user))=>array
    //render(array,parentElement)
    render(data.map(userBlock), section)
    render(products.map(productBlock),list);
    render(greeting('Guest'),header)

}

function buyProduct(product){
    console.log(`You bought ${product.label} for $${product.price}.`)
}
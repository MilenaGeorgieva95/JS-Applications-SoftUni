import {data,products} from './data.js';
import { getTemplate } from './templating.js';
import { dom } from './dom.js';

start();

async function start(){
    const section=document.querySelector('section');
    const list=document.querySelector('ul');

    for(let user of data){
        // const html=await getTemplate('user-block', user);
        // main.innerHTML+=html
        const element=dom('article',{className:'user-block', onClick:()=>alert(`Messaging ${user.name}`), dataset:{id:'123', ownerId:'321'}},
        dom('span',{style:{'backgroundColor':'red'}},`Username: ${user.name}`),
        dom('span',{style:{'display':'none'}},`Phone: ${user.phone}`))

        section.appendChild(element)
    }

    for(let product of products){
const html=await getTemplate('product-block',product);
list.innerHTML+=html
    }
}
import {data,products} from './data.js';
import { getTemplate } from './templating.js';

start();

async function start(){
    const main=document.querySelector('main');

    for(let user of data){
        const html=await getTemplate('user-block', user);
        main.innerHTML+=html
    }

    for(let product of products){
const html=await getTemplate('product-block',product);
main.innerHTML+=html
    }
}
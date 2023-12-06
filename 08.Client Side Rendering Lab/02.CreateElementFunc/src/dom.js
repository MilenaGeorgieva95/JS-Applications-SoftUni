export function dom(tagName,attributes={}, ...content){
    const element=document.createElement(tagName);
for(let propName in attributes){
    if(propName=='dataset'){
        for(let item in attributes.dataset){
            element.dataset[item]=attributes.dataset[item]
        }
    }else if(propName=='style'){
        for(let item in attributes.style){
            element.style[item]=attributes.style[item]
        }
    }else if(propName.slice(0,2)=='on'){
const eventType=propName.slice(2).toLocaleLowerCase();
element.addEventListener(eventType, attributes[propName])
    }else{
        element[propName]=attributes[propName];
    }
    
}

for(let item of content){
    if(typeof item=='string'||typeof item=='number'){
        item=document.createTextNode(item)
    }
    element.appendChild(item)
}
return element
}


//attributes{'dataset':{'id':'123','ownerId':'321}}
//attributes{style:{'backgroundColor':'red'}}
//attributes{style:{'display':'none'}}
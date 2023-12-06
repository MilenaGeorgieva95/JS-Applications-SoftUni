const templateCache={};
const pattern=/%%([^%]+)%%/g;

export async function getTemplate(name,data){
    if(templateCache[name]==undefined){
        const request=await fetch(`/templates/${name}.html`);
        const result=await request.text();
        templateCache[name]=result
    }

    let template=templateCache[name];
    template=template.replace(pattern,replacer);
    return template

    function replacer(match,propName){
        return data[propName]
    }
}
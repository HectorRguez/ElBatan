//Function either POSTs or GETs from nodeJs backend data
async function InteractBackEnd(method, data, page){
    data = JSON.stringify({parcel: data});
    //Get method dosen't allow body
    if(method == "GET")data = null;
    const url = `http://${window.location.hostname}:8080/${method}?path=${page}`;
    const result =  await fetch(url,
    {
        method:method,
        headers:{
            "Content-Type": "application/json"
        },
        body:data
    });
    if(result.status == 404) window.location.replace("/404");
    return result.json();
}

function IterateThroughChildren(json, html){

    //Opening element tag
    html += `<${json.type}`;

    //Looping through element properties
    for(var keys in json){
        //Avoids properties used elsewhere or that cant be inserted inside html tag
        if(keys != "children" && keys != "type" && keys != "text"){
            html += ` ${keys}="${json[keys]}" `;
        }
    }

    //Closing element tag and adding text
    html += ">";
    if(json.text)html += json.text;

    //If element has children call function wich will append html code inside element
    if(json.children){
        for(var n in json.children){
            var htmlChildren = "";
            htmlChildren += IterateThroughChildren(json.children[n], htmlChildren);
            html += htmlChildren;
        }
    }

    //Close element
    html += `</${json.type}>`;
    
    return html;
}

function JsonToHtml(json){

    //Loop through elements to append
    for(var children in json){
        var html = "";
        console.log(json[children].type)
        if(children != "parent")html +=IterateThroughChildren(json[children], html);
        $(json.parent).append(html);
    }
    
}

const page = location.pathname;
InteractBackEnd("GET", null, page).then((data) => { JsonToHtml(data)});
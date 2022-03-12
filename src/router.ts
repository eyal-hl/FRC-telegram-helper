let no_param:{[name:string]: ()=>{}} = {}
let one_param:{[name:string]: (one:string)=>string} = {"team":team, "match":match}

export function router(text:string):string {
    let texts:string[] = text.split(" ")
    
    switch (texts.length) {
        case 1:
            
            break;
        case 2:
            if (Object.keys(one_param).includes(texts[0])){
                return one_param[texts[0]](texts[1])
            }
            break;
        default:
            
            break;
    }
    return "Unknown command"
}


function team(value:string):string{
    return value+"as"
}

function match(match:string):string{
    return match+"sfafasfsa"
}
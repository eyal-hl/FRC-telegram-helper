import {team, match} from './BL/TBA/teams'
import {eventsYear} from './BL/TBA/events'
const no_param:{[name:string]: ()=>{}} = {}
const one_param:{[name:string]: (one:string)=>Promise<string>} = {"team":team, "match":match, "events": eventsYear}

export const router = async(text:string):Promise<string> => {
    let texts:string[] = text.split(" ");
    texts[0] = texts[0].toLowerCase();
    
    switch (texts.length) {
        case 1:
            
            break;
        case 2:
            if (Object.keys(one_param).includes(texts[0])){
                return await one_param[texts[0]](texts[1])
            }
            break;
        default:
            
            break;
    }
    return "Unknown command"
}
import { time } from 'console';
import {api} from '../../DA/TBA/TbaApi'
import { getEvent } from './events';
const formatAlliance = (alliance:Alliance):string=> `${alliance.team_keys.map(key=>key.slice(3)).join(' ')}`

const addDateBetweenGames = (matches_array:Match[]):(Match|Date)[] => {
    if (matches_array.length==0){
        return []
    }
    let result:(Match|Date)[] = []
    result.push(new Date(matches_array[0].predicted_time));
    result.push(matches_array[0]);
    for (let index = 1; index < matches_array.length; index++) {
        
        if ((new Date(matches_array[index].predicted_time)).toDateString() != (new Date(matches_array[index-1].predicted_time)).toDateString()){
            result.push(new Date(matches_array[index].predicted_time));
        }
        result.push(matches_array[index]);
    }

    return result;
}
const unResolvedMatch = (match:Match):boolean=>{
    return (match.winning_alliance == "" && ((match.alliances.red.score == -1 && match.alliances.blue.score == -1) || (match.alliances.red.score == 0 && match.alliances.blue.score == 0)))
}
async function formatMatchOrDate(matchOrDate:any):Promise<string>{ // the type is match or a Date
    const divider = '\n--------------------------';
    const formatVideos = (videos:Video[]):string => {
        if (videos.length < 1){
            return "No videos on TBA"
        }
        return videos.map(video => {
            switch (video.type) {
                case "youtube":
                    return `https://youtu.be/${video.key}`
                default:
                    console.log(`Unknown video type ${video.type}`);
                    return `Unknown video type ${video.type}`
            }
        }).join("\n")
    }
    const formatMatchName = async(match:Match):Promise<string> => {
        const dict:{[id: string]:string} = {"f":"Final", "qf":"Quarter Final", "sf":"Semi Final", "qm": "Qualification Match"};
        return `${(await getEvent(match.event_key)).name} ${dict[match.comp_level]} ${match.match_number}`;
    }
    const formatTime = (date:Date):string=>`${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;
    if (matchOrDate instanceof Date){
        return "\n" + matchOrDate.toDateString();
    }
    
    const match:Match = matchOrDate;
    if (unResolvedMatch(match)){
        // return `${match.match_number} ${formatTime(new Date(match.predicted_time))} - ${formatAlliance(match.alliances.blue)} vs ${formatAlliance(match.alliances.red)} ${match.favorite_teams!=1?match.favorite_teams:""}${divider}`
        return `${await formatMatchName(match)} ${formatTime(new Date(match.predicted_time))}\n${formatAlliance(match.alliances.blue)} vs ${formatAlliance(match.alliances.red)}${divider}`
    }
    return `${await formatMatchName(match)} ${formatTime(new Date(match.predicted_time))}\n${formatAlliance(match.alliances.blue)} ${match.alliances.blue.score} vs ${match.alliances.red.score} ${formatAlliance(match.alliances.red)}\n${formatVideos(match.videos)}${divider}`
}

const sortedMatches = async(teams:string):Promise<Match[]> => {
    return (await matches(teams, new Date().getFullYear().toString())).sort((a,b) => (new Date(new Date(a.predicted_time).toDateString())).valueOf() - (new Date(new Date(b.predicted_time).toDateString())).valueOf() || a.predicted_time - b.predicted_time);
}


export const futureMatches = async(teams:string):Promise<string> => {
    const yesterDay = new Date()
    yesterDay.setTime(yesterDay.getTime() - 86400000); // 1 day in ms
    const promiseResult:Promise<string>[] = addDateBetweenGames((await sortedMatches(teams)).filter(match=>unResolvedMatch(match)&& match.predicted_time > yesterDay.valueOf())).map(formatMatchOrDate);
    const result = await Promise.all(promiseResult);
    if (result.length==0){
        return "No future games for those teams";
    }
    return result.join('\n');
};

export const allMatches =async (teams:string): Promise<string> => {
    const promiseResult:Promise<string>[] = addDateBetweenGames((await sortedMatches(teams))).map(formatMatchOrDate);
    
    const result = await Promise.all(promiseResult);
    if (result.length==0){
        return "No games for those teams";
    }
    return result.join('\n')
};

export const futureGoodMatches = async(teams:string):Promise<string> => {
    const yesterDay = new Date()
    yesterDay.setTime(yesterDay.getTime() - 86400000); // 1 day in ms
    const promiseResult:Promise<string>[] = addDateBetweenGames((await sortedMatches(teams)).filter(match=>unResolvedMatch(match)&& match.predicted_time > yesterDay.valueOf() && (match.favorite_teams??0)>1)).map(formatMatchOrDate);
    const result = await Promise.all(promiseResult);
    if (result.length==0){
        return "No future games that have atleast 2 of those teams";
    }
    return result.join('\n')
};

export const allGoodMatches =async (teams:string): Promise<string> => {
    const promiseResult:Promise<string>[] = addDateBetweenGames(((await sortedMatches(teams)).filter(match=>(match.favorite_teams??0)>1))).map(formatMatchOrDate);
    const result = await Promise.all(promiseResult);
    if (result.length==0){
        return "No games that have atleast 2 of those teams";
    }
    return result.join('\n')
};

export const matches = async(teams:string, year:string):Promise<Match[]> => {
    let matches:Match[] = [];
    let teamsArray = teams.split(',');
    for (let index = 0; index < teamsArray.length; index++) {
         matches.push(...(await api.getMatchesTeamYear(teamsArray[index], year)));
    }

    matches.forEach((match,index) => {
        matches[index].favorite_teams = matches.filter(a => a.key == match.key).length;
        matches[index].predicted_time = match.predicted_time || match.time;
        matches[index].predicted_time = new Date(new Date(match.predicted_time*1000).toLocaleString("en-US", {timeZone:process.env.TZ})).valueOf(); // The first paremeter doesnt matter because formmating it alone anyway
    });
    
    return matches.filter((match,index,self) => self.findIndex(a => a.key == match.key)==index);
};
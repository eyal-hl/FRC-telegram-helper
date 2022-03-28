import { time } from 'console';
import {api} from '../../DA/TBA/TbaApi'

const formatAlliance = (alliance:Alliance):string=> `${alliance.team_keys.map(key=>key.slice(3)).join(' ')}`

const addDateBetweenGames = (matches_array:Match[]):(Match|Date)[] => {
    let result:(Match|Date)[] = []
    result.push(new Date(matches_array[0].time*1000));
    result.push(matches_array[0]);
    for (let index = 1; index < matches_array.length; index++) {
        
        if ((new Date(matches_array[index].time*1000)).toDateString() != (new Date(matches_array[index-1].time*1000)).toDateString()){
            result.push(new Date(matches_array[index].time*1000));
        }
        result.push(matches_array[index]);
    }

    return result;
}
const formatFutureMatch = (match:Match):string => {
    const formatTime = (date:Date):string=>`${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;
    return `${match.match_number}. ${formatTime(new Date(match.predicted_time*1000))} - ${formatAlliance(match.alliances.blue)} vs ${formatAlliance(match.alliances.red)} ${match.favorite_teams!=1?match.favorite_teams:""}`
}

function formatMatchOrDate(matchOrDate:any):string{ // the type is match or a Date
    const formatTime = (date:Date):string=>`${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;
    if (matchOrDate instanceof Date){
        return matchOrDate.toDateString();
    }
    return `${matchOrDate.match_number} ${formatTime(new Date(matchOrDate.predicted_time*1000))} - ${formatAlliance(matchOrDate.alliances.blue)} vs ${formatAlliance(matchOrDate.alliances.red)} ${matchOrDate.favorite_teams!=1?matchOrDate.favorite_teams:""}`
}

const sortedMatches = async(teams:string):Promise<Match[]> => {
    return (await matches(teams, new Date().getFullYear().toString())).sort((a,b) => (new Date(new Date(a.time*1000).toDateString())).valueOf() - (new Date(new Date(b.time*1000).toDateString())).valueOf() || ((b.favorite_teams??0)-(a.favorite_teams??0)) || a.predicted_time - b.predicted_time);
}


export const futureMatches = async(teams:string):Promise<string> => {
    
    let result:(Match|Date)[] = addDateBetweenGames((await sortedMatches(teams)).filter(match=>match.winning_alliance===""&&match.predicted_time != null))
    return result.map(formatMatchOrDate).join('\n');
};

export const allMatches =async (teams:string) => {
    let result:(Match|Date)[] = addDateBetweenGames((await sortedMatches(teams)));
    return result.map(formatMatchOrDate).join('\n');
};




export const matches = async(teams:string, year:string):Promise<Match[]> => {
    let matches:Match[] = [];
    let teamsArray = teams.split(',');
    for (let index = 0; index < teamsArray.length; index++) {
         matches.push(...(await api.getMatchesTeamYear(teamsArray[index], year)));
    }

    matches.forEach((match,index) => {
        matches[index].favorite_teams = matches.filter(a => a.key == match.key).length;
    });
    
    return matches.filter((match,index,self) => self.findIndex(a => a.key == match.key)==index);
};
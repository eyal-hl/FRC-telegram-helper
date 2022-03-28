import { time } from 'console';
import {api} from '../../DA/TBA/TbaApi'

const formatAlliance = (alliance:Alliance):string=> `${alliance.team_keys.map(key=>key.slice(3)).join(' ')}`
const formatFutureMatch = (match:Match):string => {
    const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const formatTime = (date:Date):string=>`${weekday[date.getDay()]} ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;
    return `${formatTime(new Date(match.predicted_time*1000))} ${match.match_number} - ${formatAlliance(match.alliances.blue)} vs ${formatAlliance(match.alliances.red)} ${match.favorite_teams!=1?match.favorite_teams:""}`
}

const formatMatch = (match:Match):string => {
    const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const formatTime = (date:Date):string=>`${weekday[date.getDay()]} ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;
    return `${formatTime(new Date(match.predicted_time*1000))} ${match.match_number} - ${formatAlliance(match.alliances.blue)} vs ${formatAlliance(match.alliances.red)} ${match.favorite_teams!=1?match.favorite_teams:""}`
}

const sortedMatches = async(teams:string):Promise<Match[]> => {
    return (await matches(teams, new Date().getFullYear().toString())).sort((a,b) => ((b.favorite_teams??0)-(a.favorite_teams??0)) || a.predicted_time - b.predicted_time);
}


export const futureMatches = async(teams:string):Promise<string> => {
    return (await sortedMatches(teams)).filter(match=>match.winning_alliance===""&&match.predicted_time != null).map(formatFutureMatch).join('\n');


};

export const allMatches =async (teams:string) => {
    return (await sortedMatches(teams)).map(formatMatch).join('\n');
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
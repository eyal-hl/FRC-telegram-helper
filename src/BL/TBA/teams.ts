import {api} from '../../DA/TBA/TbaApi'
export const team = async(team:string):Promise<string> => {
    return JSON.stringify(await api.getTeams(team)).split(',').join('\n');
}

export const match = async(match:string):Promise<string> =>{
    return match+"sfafasfsa"
}
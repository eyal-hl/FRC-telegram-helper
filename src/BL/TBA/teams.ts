import {api} from '../../DA/TBA/TbaApi'
export const team = async(team:string):Promise<string> => {
    const frcTeam:TeamSimple = await api.getTeams(team)
    return JSON.stringify(frcTeam).split(',').join('\n');
}
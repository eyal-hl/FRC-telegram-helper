import { api } from "../../DA/TBA/TbaApi";
export const team = async (team: string): Promise<string> => {
  const frcTeam: TeamSimple = await api.getTeams(team);
  return JSON.stringify(frcTeam).split(",").join("\n");
};

const teamsWinRate = async (year: string): Promise<TeamRecord[]> => {
  const events: EventSimple[] = await (
    await api.getEventsSimple(year)
  ).filter((event) => event.event_type <= 5);
  const promiseEventsStatueses: Promise<Map<string, teamStatusInEvent>>[] =
    events.map((event) => api.getEventStatuses(event.key));
  const eventsRankings: Map<string, teamStatusInEvent>[] = (
    await Promise.all(promiseEventsStatueses)
  )
    .filter((eventStatuses) => eventStatuses.size != 0)
    .map((a) => new Map(Object.entries(a)));

  let teamsRanking: Map<string, MatchesRecord> = new Map();

  eventsRankings.forEach((eventStatus: Map<string, teamStatusInEvent>) => {
    eventStatus.forEach((value, key) => {
      if (value && value.qual) {
        const record: MatchesRecord = teamsRanking.get(key) ?? {
          losses: 0,
          ties: 0,
          wins: 0,
        };

        record.losses += value.qual.ranking.record.losses;
        record.wins += value.qual.ranking.record.wins;
        record.ties += value.qual.ranking.record.ties;

        if (value.playoff) {
          record.losses += value.playoff.record.losses;
          record.wins += value.playoff.record.wins;
          record.ties += value.playoff.record.ties;
        }
        teamsRanking.set(key, record);
      }
    });
  });
  const teamRecord: TeamRecord[] = [];
  teamsRanking.forEach((value, key) => {
    teamRecord.push({ record: value, team: key });
  });
  return teamRecord;
};

export const topTeamsWinRate = async (year: string): Promise<string> => {
  const teams: TeamRecord[] = await teamsWinRate(year);
  
  teams.sort((a,b)=>((b.record.wins/(b.record.wins+b.record.losses+b.record.ties)) - (a.record.wins/(a.record.wins+a.record.losses+a.record.ties))||(b.record.wins - a.record.wins))); // winrate
//   teams.sort((a,b)=> b.record.wins - a.record.wins); // wins
//   teams.sort((a,b)=> b.record.losses - a.record.losses); // loses
//   teams.sort((a,b)=> b.record.ties - a.record.ties); // ties


  teams.splice(100);
  return teams.map((team,index) => `${index+1}. ${team.team.slice(3)} - wins:${team.record.wins}, loses:${team.record.losses}, ties:${team.record.ties}`).join("\n");
};

export const topTeamsStats = async (year:string): Promise<string> => {
    const teams: TeamRecord[] = await teamsWinRate(year);
    const winrate = JSON.parse(JSON.stringify(teams.sort((a,b)=>((b.record.wins/(b.record.wins+b.record.losses+b.record.ties)) - (a.record.wins/(a.record.wins+a.record.losses+a.record.ties))||(b.record.wins - a.record.wins))))); // winrate
    const losses = JSON.parse(JSON.stringify(teams.sort((a,b)=> b.record.losses - a.record.losses))); // loses
    const wins = JSON.parse(JSON.stringify(teams.sort((a,b)=> b.record.wins - a.record.wins))); // wins
    const ties = JSON.parse(JSON.stringify(teams.sort((a,b)=> b.record.ties - a.record.ties))); // ties
    winrate.splice(10);
    losses.splice(10);
    wins.splice(10);
    ties.splice(10);
    let result:string = "WinRate:\n" + winrate.map((team:any,index:any) => `${index+1}. ${team.team.slice(3)} - wins:${team.record.wins}, loses:${team.record.losses}, ties:${team.record.ties}`).join("\n") + "\n\n";
    result += "Wins:\n" + wins.map((team:any,index:any) => `${index+1}. ${team.team.slice(3)} - wins:${team.record.wins}, loses:${team.record.losses}, ties:${team.record.ties}`).join("\n") + "\n\n";
    result += "Losses:\n" + losses.map((team:any,index:any) => `${index+1}. ${team.team.slice(3)} - wins:${team.record.wins}, loses:${team.record.losses}, ties:${team.record.ties}`).join("\n") + "\n\n";
    result += "Ties:\n" + ties.map((team:any,index:any) => `${index+1}. ${team.team.slice(3)} - wins:${team.record.wins}, loses:${team.record.losses}, ties:${team.record.ties}`).join("\n");
    return result;
}
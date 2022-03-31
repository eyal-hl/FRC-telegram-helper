import {api} from '../../DA/TBA/TbaApi'

export const eventsYear = async(year:string):Promise<string> => {
    const events:EventSimple[] = await api.getEventsSimple(year)
    return events.map((event,i) => `${i}. ${event.name} - ${event.key}`).join("\n");
};

export const eventRpRank = async(year:string):Promise<string> => {
    const number:number = Number(year);
    if (!Number.isInteger(number)){
        return "Year suppose to be an integer"
    }
    if (number < 2016){
        return "No ranking points before 2016 :("
    }
    const eventsKeys:EventSimple[] = (await api.getEventsSimple(number.toString()));
    let eventRpPromise:Promise<EventRanking>[]
    if (number == 2016){
        eventRpPromise = eventsKeys.map(async (event)=> {
            const rp:EventRanking = await api.getRankingsEvent(event.key);
            if (rp != null && rp.rankings != null && rp.rankings[0] != undefined)
            {   
                rp.rp_score = rp.rankings.reduce((a,b)=>a+(Number(b.extra_stats[0])),0)/rp.rankings.length;
                rp.event_name = event.name;
                return rp
            }
            else{
                return {extra_stats_info:[],rankings:[],event_name:"",rp_score:0}
            }
        });
    }
    else if (number == 2021){
        return "IDK";
    }
    else if (number > new Date().getFullYear()){
        return "Cant see the future yet :("
    }
    else{
        eventRpPromise = eventsKeys.map(async (event)=> {
            const rp:EventRanking = await api.getRankingsEvent(event.key);
            if (rp != null && rp.rankings != null && rp.rankings[0] != undefined)
            {   
                rp.rp_score = rp.rankings.reduce((a,b)=>a+(Number(b.sort_orders[0])),0)/rp.rankings.length;
                rp.event_name = event.name;
                return rp
            }
            else{
                return {extra_stats_info:[],rankings:[],event_name:"",rp_score:0}
            }
        });
    }
    let eventRp:(EventRanking)[] = await Promise.all(eventRpPromise);
    eventRp = eventRp.filter(a=>a.event_name != "")
    return eventRp.sort((a,b) => (b.rp_score||0)-(a.rp_score||0)).map((event,index)=> `${index+1}. ${event.event_name} - ${event.rp_score}`).join('\n');
    
}

export const getEvent = async(eventKey:string):Promise<EventSimple> => {
    return api.getEventSimple(eventKey);
}
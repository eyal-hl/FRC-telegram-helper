import {api} from '../../DA/TBA/TbaApi'

export const eventsYear = async(year:string):Promise<string> => {
    const events:EventSimple[] = await api.getEventsSimple(year)
    return events.map((event,i) => `${i}. ${event.name} - ${event.key}`).join("\n");
};
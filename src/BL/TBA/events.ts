import { api } from "../../DA/TBA/TbaApi";

export const eventsYear = async (year: string): Promise<string> => {
  const events: EventSimple[] = await api.getEventsSimple(year);
  return events
    .map((event, i) => `${i}. ${event.name} - ${event.key}`)
    .join("\n");
};

const getEventsRanking = async (
  events: EventSimple[]
): Promise<EventRanking[]> => {
  const eventRankings: EventRanking[] = [];
  for (let i = 0; i < events.length; i += 100) {
    await new Promise((r) => setTimeout(r, 500));
    const chunk = events.slice(i, i + 100);
    const chunkRankings = await Promise.all(
      chunk.map(async (event) => ({
        ...(await api.getRankingsEvent(event.key)),
        event_name: event.name,
      }))
    );
    eventRankings.push(
      ...(chunkRankings.filter((a) => a != null) as EventRanking[])
    );
  }
  return eventRankings;
};

export const eventRpRank = async (year: string): Promise<string> => {
  const number: number = Number(year);
  if (!Number.isInteger(number)) {
    return "Year suppose to be an integer";
  }
  if (number < 2016) {
    return "No ranking points before 2016 :(";
  }
  const events: EventSimple[] = await api.getEventsSimple(number.toString());

  let eventRp: EventRanking[];
  const eventsRanking = await getEventsRanking(events);
  if (number == 2016) {
    eventRp = eventsRanking.map((rp) => {
      if (rp != null && rp.rankings != null && rp.rankings[0] != undefined) {
        rp.rp_score =
          rp.rankings.reduce((a, b) => a + Number(b.extra_stats[0]), 0) /
          rp.rankings.length;
        return rp;
      } else {
        return {
          extra_stats_info: [],
          rankings: [],
          event_name: "",
          rp_score: 0,
        };
      }
    });
  } else if (number == 2021) {
    return "IDK";
  } else if (number > new Date().getFullYear()) {
    return "Cant see the future yet :(";
  } else {
    eventRp = eventsRanking.map((rp) => {
      if (rp != null && rp.rankings != null && rp.rankings[0] != undefined) {
        rp.rp_score =
          rp.rankings.reduce((a, b) => a + Number(b.sort_orders[0]), 0) /
          rp.rankings.length;
        return rp;
      } else {
        return {
          extra_stats_info: [],
          rankings: [],
          event_name: "",
          rp_score: 0,
        };
      }
    });
  }
  eventRp = eventRp.filter((a) => a.event_name != "");
  return eventRp
    .sort((a, b) => (b.rp_score || 0) - (a.rp_score || 0))
    .map(
      (event, index) => `${index + 1}. ${event.event_name} - ${event.rp_score}`
    )
    .join("\n");
};

export const getEvent = async (eventKey: string): Promise<EventSimple> => {
  return api.getEventSimple(eventKey);
};

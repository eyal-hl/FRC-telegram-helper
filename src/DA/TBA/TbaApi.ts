import { BAD_EVENT_KEYS } from "../../consts";
import { HttpClient } from "../HttpClient";
import { AxiosRequestConfig } from "axios";

class MainApiProtected extends HttpClient {
  public constructor() {
    super(process.env.TBA_API_URL ?? "");
    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    );
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    config.headers = config.headers ?? {};
    config.headers["X-TBA-Auth-Key"] = process.env.TBA_TOKEN || "";

    return config;
  };

  public getTeams = (team: string): Promise<TeamSimple> =>
    this.instance.get(`/team/frc${team}`);
  public getEventsSimple = async (year: string): Promise<EventSimple[]> =>
    (await this.instance.get(`events/${year}/simple`)).filter(
      (event: EventSimple) => !BAD_EVENT_KEYS.includes(event.key)
    );
  public getMatchesTeamYear = (team: string, year: string): Promise<Match[]> =>
    this.instance.get(`team/frc${team}/matches/${year}`);
  public getRankingsEvent = (event: string): Promise<EventRanking> =>
    this.instance.get(`event/${event}/rankings`);
  public getEventSimple = (event: string): Promise<EventSimple> =>
    this.instance.get(`/event/${event}/simple`);
  public getEventStatuses = (
    event: string
  ): Promise<Map<string, teamStatusInEvent>> =>
    this.instance.get(`/event/${event}/teams/statuses`);
}

export const api = new MainApiProtected();

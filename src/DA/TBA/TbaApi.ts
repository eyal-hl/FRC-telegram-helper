import { HttpClient } from '../HttpClient'
import { AxiosRequestConfig } from 'axios';

class MainApiProtected extends HttpClient {
  public constructor() {
    super(process.env.TBA_API_URL ?? "");
    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    config.headers = config.headers ?? {}
    config.headers['X-TBA-Auth-Key'] = process.env.TBA_TOKEN||"";

    return config;
  };

  public getTeams = (team:string) => this.instance.get(`/team/frc${team}`)
  public getEventsSimple = (year:string):Promise<EventSimple[]> => this.instance.get(`events/${year}/simple`)
}

export const api = new MainApiProtected();
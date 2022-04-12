interface EventSimple {
  key: string;
  name: string;
  event_code: string;
  event_type: number;
  district: District;
  city: string;
  state_prov: string;
  country: string;
  start_date: string;
  end_date: string;
  year: number;
}

interface District {
  abbreviation: string;
  display_name: string;
  key: string;
  year: number;
}

interface TeamSimple {
  key: string;
  team_number: number;
  nickname: string;
  name: string;
  school_name: string;
  city: string;
  state_prov: string;
  country: string;
  address: string;
  postal_code: string;
  gmaps_place_id: string;
  gmaps_url: string;
  lat: number;
  lng: number;
  location_name: string;
  website: string;
  rookie_year: number;
  motto: string;
  home_championship: Homechampionship;
}

interface Homechampionship {
}

interface Match {
  event_type?: number;
  actual_time?: number;
  alliances: Alliances;
  comp_level: string;
  event_key: string;
  key: string;
  match_number: number;
  post_result_time?: number;
  predicted_time: number;
  score_breakdown?: Scorebreakdown;
  set_number: number;
  time: number;
  videos: Video[];
  winning_alliance: string;
  favorite_teams?: number;
}

interface Video {
  key:string;
  type:string;
}

interface Scorebreakdown {
  blue: AllianceScore;
  red: AllianceScore;
}

interface AllianceScore {
  rp?: number;
  tba_rpEarned?: number;
  totalPoints: number;
}

interface Alliances {
  blue: Alliance;
  red: Alliance;
}

interface Alliance {
  dq_team_keys: any[];
  score: number;
  surrogate_team_keys: any[];
  team_keys: string[];
}

interface EventRanking {
  extra_stats_info: Extrastatsinfo[];
  rankings: Ranking[];
  rp_score?: number;
  event_name?: string;
}

interface Ranking {
  dq: number;
  extra_stats: number[];
  matches_played: number;
  qual_average?: any;
  rank: number;
  record: MatchesRecord;
  sort_orders: number[];
  team_key: string;
}

interface MatchesRecord {
  losses: number;
  ties: number;
  wins: number;
}

interface Extrastatsinfo {
  name: string;
  precision: number;
}

interface teamStatusInEvent {
  alliance?: PlayoffAllianceInfo;
  alliance_status_str: string;
  last_match_key: string;
  next_match_key?: string;
  overall_status_str: string;
  playoff?: Playoff;
  playoff_status_str: string;
  qual: Qualification;
}

interface PlayoffAllianceInfo {
  backup?: Backup;
  name: string;
  number: number;
  pick: number;
}

interface Backup {
  in: string;
  out: string;
}

interface Qualification {
  num_teams: number;
  ranking: RankingStatus;
  sort_order_info: Sortorderinfo[];
  status: string;
}

interface Sortorderinfo {
  name: string;
  precision: number;
}

interface RankingStatus {
  dq: number;
  matches_played: number;
  qual_average?: any;
  rank: number;
  record: Currentlevelrecord;
  sort_orders: number[];
  team_key: string;
}

interface Playoff {
  current_level_record: Currentlevelrecord;
  level: string;
  playoff_average?: any;
  record: Currentlevelrecord;
  status: string;
}

interface Currentlevelrecord {
  losses: number;
  ties: number;
  wins: number;
}

interface TeamRecord {
  team:string;
  record:Currentlevelrecord;
}
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
    videos: any[];
    winning_alliance: string;
    favorite_teams?: number;
  }
  
  interface Scorebreakdown {
    blue: AllianceScore;
    red: AllianceScore;
  }
  
  interface AllianceScore {
    adjustPoints: number;
    autoCargoLowerBlue: number;
    autoCargoLowerFar: number;
    autoCargoLowerNear: number;
    autoCargoLowerRed: number;
    autoCargoPoints: number;
    autoCargoTotal: number;
    autoCargoUpperBlue: number;
    autoCargoUpperFar: number;
    autoCargoUpperNear: number;
    autoCargoUpperRed: number;
    autoPoints: number;
    autoTaxiPoints: number;
    cargoBonusRankingPoint: boolean;
    endgamePoints: number;
    endgameRobot1: string;
    endgameRobot2: string;
    endgameRobot3: string;
    foulCount: number;
    foulPoints: number;
    hangarBonusRankingPoint: boolean;
    matchCargoTotal: number;
    quintetAchieved: boolean;
    rp: number;
    taxiRobot1: string;
    taxiRobot2: string;
    taxiRobot3: string;
    techFoulCount: number;
    teleopCargoLowerBlue: number;
    teleopCargoLowerFar: number;
    teleopCargoLowerNear: number;
    teleopCargoLowerRed: number;
    teleopCargoPoints: number;
    teleopCargoTotal: number;
    teleopCargoUpperBlue: number;
    teleopCargoUpperFar: number;
    teleopCargoUpperNear: number;
    teleopCargoUpperRed: number;
    teleopPoints: number;
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
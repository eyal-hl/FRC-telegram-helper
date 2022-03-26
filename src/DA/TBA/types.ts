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
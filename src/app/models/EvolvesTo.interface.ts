export interface EnvolvesToChain {
  baby_trigger_item: string;
  chain: Chain;
  id: number;
}

interface Chain {
  evolution_details: [];
  evolves_to: EvolvesTo[];
  is_baby: false;
  species: Species;
}

interface Species {
  name: string;
  url: string;
}

interface EvolutionDetails {
  gender: string;
  held_item: string;
  item: string;
  known_move: string;
  known_move_type: string;
  location: string;
  min_affection: string;
  min_beauty: string;
  min_happiness: string;
  min_level: number;
  needs_overworld_rain: false;
  party_species: string;
  party_type: string;
  relative_physical_stats: string;
  time_of_day: '';
  trade_species: string;
  trigger: {
    name: 'level-up';
    url: 'https://pokeapi.co/api/v2/evolution-trigger/1/';
  };
  turn_upside_down: false;
}

interface EvolvesTo {
  evolution_details: EvolutionDetails[];
  evolves_to: EvolvesTo[];
  is_baby: false;
  species: Species;
}

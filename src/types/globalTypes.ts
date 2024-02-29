export interface ApiSuperhero {
  response: string;
  id: string;
  name: string;
  powerstats: {
    intelligence: string | null;
    strength: string | null;
    speed: string | null;
    durability: string | null;
    power: string | null;
    combat: string | null;
  };
  biography: {
    'full-name': string;
    'alter-egos': string;
    aliases: string[];
    'place-of-birth': string;
    'first-appearance': string;
    publisher: string;
    alignment: string;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    'eye-color': string;
    'hair-color': string;
  };
  work: {
    occupation: string;
    base: string;
  };
  connections: {
    'group-affiliation': string;
    relatives: string;
  };
  image: {
    url: string;
  };
}

export interface FormattedSuperHero {
  name: string;
  hp: number;
  alignment: string;
  powerstats: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
  };
  attacks: {
    mental: number;
    strong: number;
    fast: number;
  }
}

export interface Team {
  heros: FormattedSuperHero[];
  teamAlignment: string;
}

export interface BattleLog {
  turn: number;
  attacker: string;
  defender: string;
  attackType: string;
  damage: number;
  remainingHp: number;
}

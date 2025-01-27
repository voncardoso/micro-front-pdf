export interface IMunicipality {
  id: number;
  name: string;
  population: number;
  codeIbge: number;
  location: Location;
  locations: null;
  state: State;
  block: Block;
  contract: Contract;
}

export interface Block {
  id: number;
  name: BlockName;
  color: Color;
}

export enum Color {
  D96053 = '#D96053',
  F1519B = '#F1519B',
  Fdd736 = '#FDD736',
  The2Db6F5 = '#2DB6F5',
  The8676Ff = '#8676FF',
}

export enum BlockName {
  BlocoA = 'BLOCO A',
  BlocoB = 'BLOCO B',
  BlocoC = 'BLOCO C',
  Casal = 'CASAL',
  Saae = 'SAAE',
}

export interface Contract {
  id: number;
  productionCompany: TionCompany;
  distributionCompany: TionCompany;
  idMunicipality: number;
}

export enum TionCompany {
  Ads = 'ADS',
  Brk = 'BRK',
  Casal = 'CASAL',
  Saae = 'SAAE',
  Verde = 'VERDE',
}

export interface Location {
  lat: string;
  lon: string;
}

export interface State {
  id: number;
  name: StateName;
  population: number;
  abbreviation: Abbreviation;
}

export enum Abbreviation {
  Al = 'AL',
}

export enum StateName {
  Alagoas = 'Alagoas',
}

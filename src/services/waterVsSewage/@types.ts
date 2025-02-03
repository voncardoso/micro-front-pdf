export interface IWaterVsSewage {
  year: number;
  expected: number;
  realized: number;
  line: Line;
}

export interface IWaterVsSewageResponse {
  year: number;
  AGUA?: number;
  ESGOTO?: number;
}
export enum Line {
  Agua = 'AGUA',
  Esgoto = 'ESGOTO',
}

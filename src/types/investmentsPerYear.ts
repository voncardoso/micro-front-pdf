export interface IYearData {
  line: string;
  year: number;
  expected: number;
  realized: number;
}

export interface YearData {
  name: string;
  years: {
    accomplished: number;
    expected: number;
    id: number;
    name: string;
    year: number;
    line?: string;
  }[];
}

export type IGroupYear = {
  AGUA: IYearData[];
  ESGOTO: IYearData[];
  YEARS: number[];
};

export interface IInformationsBlock {
  id: number;
  name: string;
  color: string;
  concessionaire: string;
  dateOfContractSignature: Date;
  firstYearOfContract: number;
  totalOfContractYears: number;
  numberOfMunicipalities: number;
  population: number;
  lastInvestmentDate: Date;
  totalExpectedInvestment: number;
  waterInvestment: IInvestment;
  sewageInvestment: IInvestment;
  totalInvestment: IInvestment;
}

export interface IInvestment {
  expected: number;
  realized: number;
}

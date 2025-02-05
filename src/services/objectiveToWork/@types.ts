export interface ICapexObjectiveToWork {
  expected: number;
  idTopic: number;
  realized: number;
  status: string;
  topic: string;
}

export enum EStatusCapex {
  REALIZED = 'REALIZED',
  NOT_REALIZED = 'NOT_REALIZED',
  NOT_EXPECTED = 'NOT_EXPECTED',
}

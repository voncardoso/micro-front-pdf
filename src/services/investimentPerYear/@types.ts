import { InvestimentoLine } from '../../enums/line';

export interface IRequestParams {
  idBlock: number;
  idMunicipality?: number;
  idTopic?: number;
  line?: InvestimentoLine;
  startYear?: number;
  endYear?: number;
  validateParms?: () => boolean;
}

export interface IGraphics {
  legends: string[];
  categories: string[];
  data: IDatum[];
  ids: number[];
}
export interface IDatum {
  name: string;
  data: number[];
}

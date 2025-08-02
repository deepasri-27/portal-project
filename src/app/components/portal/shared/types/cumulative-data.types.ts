export interface CumulativeDataTile {
  icon: string;
  data: string | number;
  label1: string;  // dark bold
  label2: string;  // subtle color, light small
}

export interface TilesConfig {
  username: string;
  userId: string;
  cumulativeData: CumulativeDataTile[];
  tiles: any[];  // existing tiles data
}

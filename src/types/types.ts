export type IMine = {
  x: number;
  y: number;
}

export type ICell = {
  x: number;
  y: number;
  status: string;
  nearbyMines: number;
  isMine: boolean,
}

export type IStatuses = {
  open: string;
  mineActive: string;
  mark: string;
  question: string;
  mineUnactive: string;
}
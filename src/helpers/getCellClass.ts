import { IStatuses } from "../types/types";

const statuses: IStatuses = {
  open: 'cell__open',
  mineActive: 'cell__mine-active',
  mineUnactive: 'cell__mine-unactive',
  mineDetected: 'cell__mine-detected',
  scared: 'cell__mine-scared',
  mark: 'cell__mark',
  question: 'cell__question',
}

export const getCellClass = (status: string) => {
  const statusChanged = status as keyof IStatuses;
  return statuses[statusChanged];
}

import { IStatuses } from "../types/types";

const statuses: IStatuses = {
  open: 'cell__open',
  mark: 'cell__mark',
  question: 'cell__question',
  mineActive: 'cell__mine-active',
  mineUnactive: 'cell__mine-unactive',
  mineDetected: 'cell__mine-detected',
}

export const getCellClass = (status: string) => {
  const statusChanged = status as keyof IStatuses;
  return statuses[statusChanged];
}

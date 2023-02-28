import { IStatuses } from "../types/types";

const statuses: IStatuses = {
  open: 'cell__open',
  mineActive: 'cell__mine-active',
  mark: 'cell__mark',
  question: 'cell__question',
}

export const getCellClass = (status: keyof IStatuses) => {
  return statuses[status];
}

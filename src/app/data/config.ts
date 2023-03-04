import { IStatuses } from "../../types/types"

export const GAME_CONFIG = {
  fields: 16,
  mines: 40,
}

export const GAME_STATUSES = {
  win: 'win',
  loose: 'loose',
  playing: 'playing',
  scared: 'scared',
}

export const FIELD_STATUSES: IStatuses = {
  open: 'open',
  mark: 'mark',
  question: 'question',
  mineActive: 'mineActive',
  mineUnactive: 'mineUnactive',
  mineDetected: 'mineDetected',
}

import type { Dayjs } from 'dayjs'
import { create } from 'zustand'
import { createEvents } from './utils'

interface ScheduleState {
  startDate: string | null
  events: Event[]
  setStartDate: (newDate: string | null) => void
  generateEvents: (newDate: string) => void
}

interface SelectedModulesState {
  selectedModules: string[]
  setSelectedModules: (newSet: string[]) => void
}

export interface Event {
  id: string
  title: string
  date: Dayjs
  repetitionIndex: number
}

export const useSelectedModules = create<SelectedModulesState>()((set) => ({
  selectedModules: [''],
  setSelectedModules: (newSet: string[]) => set({ selectedModules: newSet }),
}))

export const useSchedule = create<ScheduleState>()((set) => ({
  startDate: null,
  events: [],

  setStartDate: (newDate) => set({ startDate: newDate }),
  generateEvents: (newDate) => set(() => ({
    startDate: newDate,
    events: createEvents(newDate, 'Title')
  }))
}))
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createEvents } from './utils'
import type { BadgeProps } from 'antd'

interface ScheduleState {
  startDate: string | null
  selectedModules: string[] | null
  events: Event[]
  setStartDate: (newDate: string | null) => void
  setSelectedModules: (modules: string[]) => void
  generateEvents: (newDate: string, modules: string[]) => void
  moveEvent: (eventId: string, newDate: string) => void
}

export interface Event {
  id: string
  title: string
  date: string
  repetitionIndex: number
  type: BadgeProps["status"]
}

export const useSchedule = create<ScheduleState>()(
  persist(
    (set) => ({
      startDate: null,
      selectedModules: null,
      events: [],

      setStartDate: (newDate) => set({ startDate: newDate }),
      setSelectedModules: (modules) => set({ selectedModules: modules }),
      generateEvents: (newDate, modules) => set(() => ({
        startDate: newDate,
        selectedModules: modules,
        events: createEvents(newDate, modules)
      })),
      moveEvent: (eventId, newDate) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === eventId ? { ...e, date: newDate } : e
          ),
        })),
    }),
    {
      name: "schedule-storage",
      partialize: (state) => ({
        startDate: state.startDate,
        selectedModules: state.selectedModules,
        events: state.events,
      }),
    }
  )
);
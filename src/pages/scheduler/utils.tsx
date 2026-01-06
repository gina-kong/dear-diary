import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { type Event } from './store'

const MAX_EVENTS_PER_HOME_DAY: number = 4
const NUM_LEARNING_DAYS: number = 4
const NUM_REPETITIONS: number = 5
const MAX_EVENTS_PER_OUT_DAY: number = 2
const OUTDAYS: number[] = [1, 4, 5]

/**
 * NEXT STEPS:
 * Add more rules -> weekday night max 2 sessions
 * 
*/

const getMaxEventsForDay = (date: Dayjs) => {
  const day = date.day();
  if (OUTDAYS.includes(day)) return MAX_EVENTS_PER_OUT_DAY;
  return MAX_EVENTS_PER_HOME_DAY;
};

function addWithCapacity(
  map: Map<string, Event[]>,
  date: Dayjs,
  eventFactory: (finalDate: Dayjs) => Event
) {
  let d = date
  while (true) {
    const key = d.format('YYYY-MM-DD')
    const eventsForDay = map.get(key) ?? []
    const maxEvents = getMaxEventsForDay(d)

    // Rule 1: Max events per day
    if (eventsForDay.length >= maxEvents) {
      d = d.add(1, "day");
      continue;
    }

    // Rule 2: Only one learning session per day
    const newEvent = eventFactory(d)
    if (newEvent.type === "success") {
      const hasSuccessAlready = eventsForDay.some((e) => e.type === "success");
      if (hasSuccessAlready) {
        d = d.add(1, "day"); // move to next day
        continue;
      }
    }

    // All rules passed — add the event
    map.set(key, [...eventsForDay, newEvent]);
    return;
  }
}

export const createEvents = (startingDay: string, modules: string[]): Event[] => {
  const eventsByDate = new Map<string, Event[]>()
  let currentDate: Dayjs = dayjs(startingDay as string)
  for (const title of modules) {
    // Learning Days
    for (let i = 0; i < NUM_LEARNING_DAYS; i++) {
      addWithCapacity(eventsByDate, currentDate, (finalDate) => ({
        id: crypto.randomUUID(),
        title: `${title} ${i + 1}/4`,
        date: finalDate.format('YYYY-MM-DD'),
        repetitionIndex: 0,
        type: 'success',
      }))
      currentDate = currentDate.add(1, 'day')
    }

    // Repetitions
    let currentRepDate: Dayjs = currentDate.subtract(1, 'day')

    for (let i = 1; i <= NUM_REPETITIONS; i++) {
      currentRepDate = currentRepDate.add(i, 'day')

      addWithCapacity(eventsByDate, currentRepDate, (finalDate) => ({
        id: crypto.randomUUID(),
        title: `${title} R${i}`,
        date: finalDate.format('YYYY-MM-DD'),
        repetitionIndex: i,
        type: 'warning',
      }))
    }
  }
  return Array.from(eventsByDate.values()).flat()
}

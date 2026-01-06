import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import type { Event } from "./store"

export const createEvents = (startingDay: string, title: string) => {
    const events: Event[] = []
    let currentTopicDate: Dayjs = dayjs(startingDay as string)
    for (let i = 0; i < 4; i++) {
      events.push({
        id: crypto.randomUUID(),
        title: `${title} ${i + 1}/4`,
        date: currentTopicDate,
        repetitionIndex: 0,
      })
      currentTopicDate = currentTopicDate.add(1, 'day')
    }
    // Repetitions
    let currentRepDate: Dayjs = currentTopicDate.subtract(1, 'day')
    for (let i = 1; i <= 5; i++) {
      currentRepDate = currentRepDate.add(i, 'day')
      events.push({
        id: crypto.randomUUID(),
        title: `${title} R${i}`,
        date: currentRepDate,
        repetitionIndex: i,
      })
    }
    console.log(events)
    return events
  }
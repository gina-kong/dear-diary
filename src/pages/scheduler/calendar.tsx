import { Calendar, type CalendarProps } from 'antd'
import type { Dayjs } from 'dayjs'
import { useSchedule } from './store'
import { DraggableEvent } from './event'
import { DroppableCell } from './cell'

export const SchedulerCalendar = () => {
  const events = useSchedule((state) => state.events)

  const getListData = (value: Dayjs) => {
    const date = value.format('YYYY-MM-DD')
    return events.filter((e) => e.date === date)
  }

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value)
    return (
      <DroppableCell date={value}>
        <ul
          className="events"
          style={{ listStyleType: 'none', padding: 0, margin: 0 }}
        >
          {listData.map((item) => (
            <DraggableEvent item={item} />
          ))}
        </ul>
      </DroppableCell>
    )
  }

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') {
      return dateCellRender(current)
    }
    return info.originNode
  }

  return <Calendar cellRender={cellRender} />
}

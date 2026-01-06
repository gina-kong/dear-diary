import { Badge, Calendar, Tag, type BadgeProps, type CalendarProps } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useSchedule } from './store'

export const SchedulerCalendar = () => {
  const startDate = dayjs(useSchedule((state) => state.startDate)).date()

  const getListData = (value: Dayjs) => {
    let listData: { type: string; content: string }[] = [] // Specify the type of listData
    switch (value.date()) {
      case startDate:
        listData = [{ type: 'success', content: 'START TODAY.' }]
        break
      case 10:
        listData = [
          { type: 'error', content: 'This is error event.' },
          { type: 'warning', content: 'This is warning event.' },
        ]
        break
      default:
    }
    return listData || []
  }

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value)
    return (
      <ul
        className="events"
        style={{ listStyleType: 'none', padding: 0, margin: 0 }}
      >
        {listData.map((item) => (
          <Tag key={item.content}>
            <Badge
              status={item.type as BadgeProps['status']}
              text={item.content}
            />
          </Tag>
        ))}
      </ul>
    )
  }

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode)
  }

  const onSelect = (value: Dayjs) => {
    console.log('Selected value:', value)
  }

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') {
      return dateCellRender(current)
    }
    return info.originNode
  }

  return (
    <Calendar
      onSelect={onSelect}
      onPanelChange={onPanelChange}
      cellRender={cellRender}
    />
  )
}

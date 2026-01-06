import {
  Col,
  DatePicker,
  List,
  Row,
  Select,
  type DatePickerProps,
  type SelectProps,
} from 'antd'
import { useSchedule } from './store'
import dayjs from 'dayjs'

const modules: string[] = [
  'Arrays',
  'Linked List',
  'Queue',
  'Stack',
  'Heap',
  'Dynamic Programming',
]

export const SchedulerSelect = () => {
  const startDate = useSchedule((state) => state.startDate)
  const setStartDate = useSchedule((state) => state.setStartDate)
  const selectedModules = useSchedule((state) => state.selectedModules)
  const setSelectedModules = useSchedule((state) => state.setSelectedModules)
  const generateEvents = useSchedule((state) => state.generateEvents)

  const options: SelectProps['options'] = []
  modules.forEach((e) => {
    options.push({
      value: e.replaceAll(' ', ''),
      label: e,
    })
  })

  const handleSelectChange = (modules: string[]) => {
    if (!startDate) {
      setSelectedModules(modules)
    }
    generateEvents(startDate as string, modules)
  }

  const handleDatePickerChange: DatePickerProps['onChange'] = (
    date,
    dateString
  ) => {
    if (!date) return
    console.log('clicked: ' + dateString)
    setStartDate(dateString as string)
    if (selectedModules) generateEvents(dateString as string, selectedModules)
  }

  return (
    <div>
      <DatePicker onChange={handleDatePickerChange} value={startDate ? dayjs(startDate) : null}/>
      <Row>
        <Col span={12}>
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Select Modules"
            onChange={handleSelectChange}
            value={selectedModules ?? []}
            options={options}
          />
        </Col>
        <Col span={12}>
          <p>Date: {startDate}</p>
          <p>Selected order:</p>
          <List
            size="small"
            dataSource={selectedModules ?? []}
            renderItem={(item, index) => (
              <List.Item>
                {index + 1}. {item}
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  )
}

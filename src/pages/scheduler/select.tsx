import {
  Col,
  DatePicker,
  List,
  Row,
  Select,
  type DatePickerProps,
  type SelectProps,
} from 'antd'
import { useSelectedModules, useSchedule } from './store'

const modules: string[] = [
  'Arrays',
  'Linked List',
  'Queue',
  'Stack',
  'Heap',
  'Dynamic Programming',
]

export const SchedulerSelect = () => {
  const setSelectedModules = useSelectedModules(
    (state) => state.setSelectedModules
  )
  const selectedModules = useSelectedModules((state) => state.selectedModules)
  const startDate = useSchedule((state) => state.startDate)
  const setStartDate = useSchedule((state) => state.setStartDate)
  const generateEvents = useSchedule((state) => state.generateEvents)

  const options: SelectProps['options'] = []
  modules.forEach((e) => {
    options.push({
      value: e.replaceAll(' ', ''),
      label: e,
    })
  })

  const handleSelectChange = (modules: string[]) => {
    setSelectedModules(modules)
  }

  const handleDatePickerChange: DatePickerProps['onChange'] = (
    date,
    dateString
  ) => {
    console.log('clicked: ' + dateString)
    setStartDate(dateString as string)
    generateEvents(dateString as string)
  }

  return (
    <div>
      <DatePicker onChange={handleDatePickerChange} />
      <Row>
        <Col span={12}>
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Select Modules"
            onChange={handleSelectChange}
            options={options}
          />
        </Col>
        <Col span={12}>
          <p>Date: {startDate}</p>
          <p>Selected order:</p>
          <List
            size="small"
            dataSource={selectedModules}
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

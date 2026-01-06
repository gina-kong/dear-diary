import { useDrop } from 'react-dnd'
import { Dayjs } from 'dayjs'
import { useSchedule } from './store' 

export const DroppableCell = ({
  date,
  children,
}: {
  date: Dayjs
  children: React.ReactNode
}) => {
  const moveEvent = useSchedule((state) => state.moveEvent)

  const [{ isOver }, dropRef] = useDrop({
    accept: 'EVENT',
    drop: (draggedItem: { id: string }) => {
      moveEvent(draggedItem.id, date.format('YYYY-MM-DD'))
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  return (
    <div
      ref={(node) => {
        if (node) dropRef(node);
      }}
      style={{
        minHeight: 80,
        padding: 2,
        backgroundColor: isOver ? '#e6f7ff' : undefined,
      }}
    >
      {children}
    </div>
  )
}

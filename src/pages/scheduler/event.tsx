import { Badge, Tag, type BadgeProps } from 'antd'
import { useDrag } from 'react-dnd'
import { type Event } from './store'

export const DraggableEvent = ({ item }: { item: Event }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'EVENT',
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div
      ref={(node) => {
        if (node) dragRef(node);
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        marginBottom: 4,
      }}
    >
      <Tag>
        <Badge status={item.type as BadgeProps['status']} text={item.title} />
      </Tag>
    </div>
  )
}

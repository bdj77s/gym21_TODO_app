const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
}

const priorityLabels = {
  high: '높음',
  medium: '보통',
  low: '낮음',
}

export default function PriorityBadge({ priority }) {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${priorityColors[priority]}`}>
      {priorityLabels[priority]}
    </span>
  )
}

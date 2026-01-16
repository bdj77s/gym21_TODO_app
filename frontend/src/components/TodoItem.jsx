import { useToggleTodo, useDeleteTodo } from '../hooks/useTodos'
import PriorityBadge from './PriorityBadge'

export default function TodoItem({ todo, onEdit }) {
  const toggleTodo = useToggleTodo()
  const deleteTodo = useDeleteTodo()

  const formatDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
  }

  const isOverdue = todo.due_date && new Date(todo.due_date) < new Date() && !todo.completed

  return (
    <div className={`p-4 bg-white rounded-lg shadow mb-3 ${todo.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo.mutate(todo.id)}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {todo.title}
            </h3>
            <PriorityBadge priority={todo.priority} />
            {todo.category && (
              <span
                className="px-2 py-0.5 text-xs rounded"
                style={{ backgroundColor: todo.category.color + '20', color: todo.category.color }}
              >
                {todo.category.name}
              </span>
            )}
          </div>
          {todo.description && (
            <p className="mt-1 text-sm text-gray-500">{todo.description}</p>
          )}
          {todo.due_date && (
            <p className={`mt-1 text-xs ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-400'}`}>
              마감: {formatDate(todo.due_date)} {isOverdue && '(기한 초과)'}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(todo)}
            className="text-gray-400 hover:text-indigo-600"
          >
            수정
          </button>
          <button
            onClick={() => deleteTodo.mutate(todo.id)}
            className="text-gray-400 hover:text-red-600"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}

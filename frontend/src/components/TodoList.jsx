import { useTodos } from '../hooks/useTodos'
import TodoItem from './TodoItem'

export default function TodoList({ filters, onEditTodo }) {
  const { data: todos = [], isLoading, error } = useTodos(filters)

  if (isLoading) {
    return <div className="text-center py-8 text-gray-500">로딩 중...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">오류가 발생했습니다.</div>
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        할 일이 없습니다. 새로운 할 일을 추가해보세요!
      </div>
    )
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onEdit={onEditTodo} />
      ))}
    </div>
  )
}

import { useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import CategoryFilter from './components/CategoryFilter'

export default function App() {
  const [editTodo, setEditTodo] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [sortBy, setSortBy] = useState('created_at')
  const [showCompleted, setShowCompleted] = useState(null)

  const filters = {
    ...(selectedCategory && { category_id: selectedCategory }),
    ...(showCompleted !== null && { completed: showCompleted }),
    sort_by: sortBy,
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">TODO App</h1>

        <TodoForm
          editTodo={editTodo}
          onClose={() => setEditTodo(null)}
        />

        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setShowCompleted(null)}
              className={`px-3 py-1 text-sm rounded ${
                showCompleted === null ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setShowCompleted(false)}
              className={`px-3 py-1 text-sm rounded ${
                showCompleted === false ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              미완료
            </button>
            <button
              onClick={() => setShowCompleted(true)}
              className={`px-3 py-1 text-sm rounded ${
                showCompleted === true ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              완료
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 text-sm border rounded bg-white"
          >
            <option value="created_at">최신순</option>
            <option value="due_date">마감일순</option>
            <option value="priority">우선순위순</option>
          </select>
        </div>

        <TodoList filters={filters} onEditTodo={setEditTodo} />
      </div>
    </div>
  )
}

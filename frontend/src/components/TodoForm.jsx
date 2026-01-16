import { useState, useEffect } from 'react'
import { useCreateTodo, useUpdateTodo, useCategories } from '../hooks/useTodos'

export default function TodoForm({ editTodo, onClose }) {
  const { data: categories = [] } = useCategories()
  const createTodo = useCreateTodo()
  const updateTodo = useUpdateTodo()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    due_date: '',
    category_id: '',
  })

  useEffect(() => {
    if (editTodo) {
      setFormData({
        title: editTodo.title || '',
        description: editTodo.description || '',
        priority: editTodo.priority || 'medium',
        due_date: editTodo.due_date ? editTodo.due_date.slice(0, 16) : '',
        category_id: editTodo.category_id || '',
      })
    }
  }, [editTodo])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    const todoData = {
      ...formData,
      category_id: formData.category_id || null,
      due_date: formData.due_date || null,
    }

    if (editTodo) {
      updateTodo.mutate({ id: editTodo.id, ...todoData })
    } else {
      createTodo.mutate(todoData)
    }

    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      due_date: '',
      category_id: '',
    })
    onClose?.()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">
        {editTodo ? '할 일 수정' : '새 할 일 추가'}
      </h2>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="할 일을 입력하세요"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <textarea
            placeholder="설명 (선택사항)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">우선순위</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="low">낮음</option>
              <option value="medium">보통</option>
              <option value="high">높음</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">마감일</label>
            <input
              type="datetime-local"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">카테고리</label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">선택 안함</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          {editTodo && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              취소
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {editTodo ? '수정' : '추가'}
          </button>
        </div>
      </div>
    </form>
  )
}

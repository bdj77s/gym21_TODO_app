import { useCategories, useCreateCategory, useDeleteCategory } from '../hooks/useTodos'
import { useState } from 'react'

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  const { data: categories = [] } = useCategories()
  const createCategory = useCreateCategory()
  const deleteCategory = useDeleteCategory()
  const [newCategoryName, setNewCategoryName] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const handleAddCategory = (e) => {
    e.preventDefault()
    if (newCategoryName.trim()) {
      createCategory.mutate({ name: newCategoryName.trim() })
      setNewCategoryName('')
      setShowAddForm(false)
    }
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">카테고리</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          {showAddForm ? '취소' : '+ 추가'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddCategory} className="mb-3 flex gap-2">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="새 카테고리"
            className="flex-1 px-3 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            추가
          </button>
        </form>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-3 py-1 text-sm rounded-full ${
            selectedCategory === null
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          전체
        </button>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center">
            <button
              onClick={() => onSelectCategory(category.id)}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={selectedCategory === category.id ? {} : { borderLeft: `3px solid ${category.color}` }}
            >
              {category.name}
            </button>
            <button
              onClick={() => deleteCategory.mutate(category.id)}
              className="ml-1 text-gray-400 hover:text-red-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

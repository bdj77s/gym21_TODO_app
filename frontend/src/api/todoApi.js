import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
})

// Todos API
export const getTodos = async (params = {}) => {
  const { data } = await api.get('/todos', { params })
  return data
}

export const getTodo = async (id) => {
  const { data } = await api.get(`/todos/${id}`)
  return data
}

export const createTodo = async (todo) => {
  const { data } = await api.post('/todos', todo)
  return data
}

export const updateTodo = async ({ id, ...todo }) => {
  const { data } = await api.put(`/todos/${id}`, todo)
  return data
}

export const deleteTodo = async (id) => {
  const { data } = await api.delete(`/todos/${id}`)
  return data
}

export const toggleTodo = async (id) => {
  const { data } = await api.patch(`/todos/${id}/toggle`)
  return data
}

// Categories API
export const getCategories = async () => {
  const { data } = await api.get('/categories')
  return data
}

export const createCategory = async (category) => {
  const { data } = await api.post('/categories', category)
  return data
}

export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/categories/${id}`)
  return data
}

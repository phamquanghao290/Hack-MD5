import { Button, Checkbox, Input } from '@mui/joy'
import React from 'react'
import publicAxios from '../axios/publicAxios'
import privateAxios from '../axios/privateAxios'

interface Todolist1 {
    id: number
    todoName: string
    status: boolean
}

function Todolist() {
    const [input, setInput] = React.useState({
        id: Math.floor(Math.random() * 100),
        todoName: "",
        status: false
    })

    const [listTodo, setListTodo] = React.useState<Todolist1[]>([])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput({...input,[event.target.name]: event.target.value}) 
    }

    const handleGetTodo = async () => {
        const result = await publicAxios.get("/api/v1/todo")
        setListTodo(result.data)
    }

    const handleAdd = async () => {
        const result = await publicAxios.post("/api/v1/todo", input)
        setListTodo([...listTodo, result.data])
    }

    const handleDelete = async (id: number) => {
        const result = await publicAxios.delete(`/api/v1/todo/${id}`)
        setListTodo(listTodo.filter((item: Todolist1) => item.id !== id))
    }

    const handleEdit = async (id: number) => {
        const result = await publicAxios.put(`/api/v1/todo/${id}`, input)
        setListTodo(listTodo.map((item: Todolist1) => item.id === id ? result.data : item))
    }

    React.useEffect(() => {
        handleGetTodo()
    })

  return (
      <div>
          <div className='w-1/3 min-h-64 rounded-xl bg-[#ff6b6b] drop-shadow-lg m-auto mt-28 text-white'>
              <h1 className='ml-6 text-3xl font-bold pt-6'>Todolist</h1>
              <p className='ml-6'>Get thinks done, one item at a time</p><br />
              <hr className='ml-6 mr-6'/>      
              <div>
                  <ul className='m-6'>
                      {listTodo.map((item: Todolist1, index: number) => (
                          <li key={index} className='text-lg font-semibold flex items-center justify-between mt-3'>
                              <div className='flex items-center gap-3'>
                                  <Checkbox label="" variant="soft" defaultChecked />
                                  {item.todoName}
                              </div>
                              <div className='flex gap-3'>
                                  <Button variant="soft" className='w-[70px] h-9 ml-5' onClick={() => handleDelete(item.id)}>Delete</Button>
                                  <Button variant="soft" className='w-[70px] h-9 ml-5' onClick={() => handleEdit(item)}>Edit</Button>
                              </div>
                          </li>
                      ))}
                  </ul>
              </div>
                <div className='flex m-auto justify-evenly items-center mt-6'>
                        <Input placeholder="Type in here…" variant="outlined" color="neutral" className='w-3/4' onChange={handleChange} name="todoName" value={input.todoName} />
                        <Button variant="soft" className='w-[70px] h-9' onClick={handleAdd}>Add</Button>
                </div>
          </div>
      </div>
  )
}

export default Todolist
import { Button, Checkbox, Input } from '@mui/joy'
import React, { useState } from 'react'
import publicAxios from '../axios/publicAxios'
import privateAxios from '../axios/privateAxios'

interface Todolist1 {
    id: number
    todoName: string
    status: number
}

function Todolist() {
    const [newTodo, setNewTodo] = React.useState({
        todoName: '',
        status: 0
    })

    const [data, setData] = React.useState<Todolist1[]>([])
    const [flag, setFlag] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo({
            ...newTodo,
            [e.target.name]: e.target.value
        })
    }

    const handleGetTodo = async () => {
            const res = await publicAxios.get("/api/v1/todo")
            console.log(res.data.data);
            setData(res.data.data)  
    }
    
    React.useEffect(() => {
        handleGetTodo()
    },[flag])

    const handleAdd = async () => {
        const res = await publicAxios.post("/api/v1/todo", newTodo)
        console.log(res.data);
        setNewTodo({
            todoName: '',
            status: 0
        })
        setFlag(!flag)
    }

    const handleDelete = async (todoId: number) => {
        const res = await publicAxios.delete(`/api/v1/todo/${todoId}`)
        console.log(res.data);
        setFlag(!flag)
    }

    const handleChangeStatus = async (e: React.ChangeEvent<HTMLInputElement>, todoId: number) => {
        const status = e.target.checked
        const res = await publicAxios.put(`/api/v1/todo/${todoId}`, {status})
        console.log(res.data);
        setFlag(!flag)
    }

  return (
      <div>
          <div className='w-1/3 min-h-64 rounded-xl bg-[#ff6b6b] drop-shadow-lg m-auto mt-28 text-white'>
              <h1 className='ml-6 text-3xl font-bold pt-6'>Todolist</h1>
              <p className='ml-6'>Get thinks done, one item at a time</p><br />
              <hr className='ml-6 mr-6'/>      
              <div>
                  <ul className='m-6'>
                      {data?.map((item: any, index: number) => (
                          <li key={index} className='text-lg font-semibold flex items-center justify-between mt-3'>
                              <div className='flex items-center gap-3' style={{ textDecoration: item.status == 1 ? "line-through" : "" }}>
                                  {item.todoName}
                              </div>
                              <div className='flex gap-3 items-center'>
                                <input type="checkbox" className='w-4 h-4' checked={item.status} onChange={(e) => handleChangeStatus(e, item.todoId)} />
                                <Button variant="soft" className='w-[70px] h-9 ml-5' onClick={() => handleDelete(item.todoId)}>Delete</Button>           
                              </div>
                          </li>
                      ))}
                  </ul>
              </div>
                <p className='ml-6 text-lg'>Add new todo</p>
                <div className='flex justify-evenly  pb-6'>
                    
                    <Input placeholder="Type in here…" variant="outlined" color="neutral" className='w-3/4' onChange={handleChange} name="todoName" value={newTodo.todoName} />
                    <Button variant="soft" className='w-[70px] h-9' onClick={handleAdd}>Add</Button>
                </div>
          </div>
      </div>
  )
}

export default Todolist